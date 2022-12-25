/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
"use strict";

///////////////////////////////////////////////
//                                           //
//           WebGL libs and classes          //
//                                           //
///////////////////////////////////////////////

const WebGL = {
    VERSION: "0.03",
    CSS: "color: gold",
    CTX: null,
    VERBOSE: true,
    setContext(layer) {
        this.CTX = LAYER[layer];
        if (this.VERBOSE) console.log(`%cContext:`, this.CSS, this.CTX);
        if (this.CTX === null) console.error("Unable to initialize WebGL. Your browser or machine may not support it.");
    },
    init(layer, world) {
        this.setContext(layer);
        if (this.VERBOSE) console.log(`%cWorld:`, this.CSS, world);
        const gl = this.CTX;
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
};

const WORLD = {
    init() {
        this.positions = [];
        this.indices = [];
        this.textureCoordinates = [];
    },
    addCube(Z, grid) {
        return this.addElement(ELEMENT.CUBE, Z, grid);
    },
    addElement(E, Z, grid) {
        //console.log("addEl", Z, grid);
        let positions = [...E.positions];
        let indices = [...E.indices];
        let textureCoordinates = [...E.textureCoordinates];

        //positions
        for (let p = 0; p < positions.length; p += 3) {
            positions[p] += grid.x;
            positions[p + 1] += grid.y;
            positions[p + 2] += Z;
        }

        //indices
        for (let i = 0; i < indices.length; i++) {
            indices[i] += this.positions.length;
        }

        //console.log(".adding", positions, indices, textureCoordinates);
        this.positions = this.positions.concat(positions);
        this.indices = this.indices.concat(indices);
        this.textureCoordinates = this.textureCoordinates.concat(textureCoordinates);
    },
    build(GA, Z = 0) {
        console.time("WorldBuilding");
        //console.log("GA", GA);
        this.init();

        for (let [index, value] of GA.map.entries()) {
            let grid = GA.indexToGrid(index);
            //console.log(index, "->", value, "grid", grid);
            switch (value) {
                case MAPDICT.EMPTY:
                    //add cube Z-1, Z+1
                    this.addCube(Z - 1, grid);
                    this.addCube(Z + 1, grid);

                    break;
                case MAPDICT.WALL:
                    //add cube Z
                    this.addCube(Z, grid);

                    break;
                default:
                    console.error("world building GA value error", value);
            }
        }

        console.timeEnd("WorldBuilding");
        return new World(this.positions, this.indices, this.textureCoordinates);
    }
};

/** Classes */

class World {
    constructor(positions, indices, textureCoordinates) {
        this.positions = positions;
        this.indices = indices;
        this.textureCoordinates = textureCoordinates;
    }
}

class $3D_player {
    constructor(position, dir, map = null, size = 0.5) {
        this.setPos(position);
        this.setDir(dir);
        this.setMap(map);
        this.GA = this.map.GA;
        this.setR(size / 2.0);
        this.setFov();
        this.rotationResolution = 64;
        this.setSpeed(4.0);
    }
    setSpeed(speed) {
        this.moveSpeed = speed;
    }
    setPos(position) {
        this.pos = position;
    }
    setDir(dir) {
        this.dir = dir;
    }
    setMap(map) {
        this.map = map;
    }
    setR(r) {
        this.r = r;
    }
    setFov(fov = 70) {
        this.fov = Math.radians(fov);
    }
    rotate(rotDirection, lapsedTime) {
        let angle = Math.round(lapsedTime / ENGINE.INI.ANIMATION_INTERVAL) * rotDirection * ((2 * Math.PI) / this.rotationResolution);
        this.dir = Vector3.from_2D_dir(this.dir.rotate2D(angle), this.dir.z);
    }
    bumpEnemy(nextPos) {
        let checkGrids = this.GA.gridsAroundEntity(nextPos, Vector3.to_FP_Vector(this.dir), this.r); //grid check is 2D!
        if (!this.map.enemyIA) return;
        let enemies = this.map.enemyIA.unrollArray(checkGrids);
        if (enemies.size > 0) {
            for (const e of enemies) {
                if (ENEMY_RC.POOL[e - 1].base !== 1) continue;
                let EP_hit = this.circleCollision(ENEMY_RC.POOL[e - 1], nextPos);
                if (EP_hit) {
                    return true;
                }
            }
        }
        return false;
    }
    move(reverse, lapsedTime) {
        let length = (lapsedTime / 1000) * this.moveSpeed;
        let dir = Vector3.to_FP_Vector(this.dir);
        if (reverse) {
            dir = dir.reverse();
        }
        let nextPos3 = this.pos.translate(dir, length); //3D
        let nextPos = Vector3.to_FP_Grid(nextPos3);

        //check if staircase
        let bump = this.usingStaircase(nextPos);
        if (bump !== null) {
            bump.interact();
            return;
        }

        if (this.bumpEnemy(nextPos)) return;

        let check = this.GA.entityNotInWall(nextPos, dir, this.r);
        if (check) {
            this.pos = nextPos3;
        }
    }
    usingStaircase(nextPos, resolution = 4) {
        let currentGrid = Grid.toClass(this.pos);
        if (this.GA.notStair(currentGrid)) return null;

        let checks = [];
        for (let theta = 0; theta < 2 * Math.PI; theta += (2 * Math.PI) / resolution) {
            checks.push(nextPos.translate(this.dir.rotate(theta), this.r));
        }

        for (const point of checks) {
            let futureGrid = Grid.toClass(point);
            if (GRID.same(futureGrid, currentGrid)) {
                continue;
            } else {
                if (this.GA.isWall(futureGrid) && this.GA.isStair(futureGrid)) {
                    let IA = this.map.decalIA;
                    let item = DECAL.POOL[IA.unroll(futureGrid)[0] - 1];
                    return item;
                }
            }
        }

        return null;
    }
    strafe(rotDirection, lapsedTime) {
        let length = (lapsedTime / 1000) * this.moveSpeed;
        let dir = Vector3.to_FP_Vector(this.dir).rotate((rotDirection * Math.PI) / 2);
        let nextPos3 = this.pos.translate(dir, length);
        let nextPos = Vector3.to_FP_Grid(nextPos3);
        //check if staircase
        let bump = this.usingStaircase(nextPos);
        if (bump !== null) {
            bump.interact();
            return;
        }

        if (this.bumpEnemy(nextPos)) return;
        let check = this.GA.entityNotInWall(nextPos, dir, this.r);
        if (check) {
            this.pos = nextPos3;
        }
    }
    circleCollision(entity, nextPos = null) {
        let distance;
        if (nextPos !== null) {
            distance = entity.moveState.pos.EuclidianDistance(nextPos);
        } else {
            distance = entity.moveState.pos.EuclidianDistance(this.pos);
        }

        let touchDistance = entity.r + this.r;
        return distance < touchDistance;
    }
    respond(lapsedTime) {
        var map = ENGINE.GAME.keymap;
        if (map[ENGINE.KEY.map.Q]) {
            this.rotate(-1, lapsedTime);
            return;
        }
        if (map[ENGINE.KEY.map.E]) {
            this.rotate(1, lapsedTime);
            return;
        }
        if (map[ENGINE.KEY.map.W]) {
            this.move(false, lapsedTime);
            return;
        }
        if (map[ENGINE.KEY.map.S]) {
            this.move(true, lapsedTime);
            return;
        }
        if (map[ENGINE.KEY.map.A]) {
            this.strafe(-1, lapsedTime);
            return;
        }
        if (map[ENGINE.KEY.map.D]) {
            this.strafe(1, lapsedTime);
            return;
        }
        if (map[ENGINE.KEY.map.LT] || map[ENGINE.KEY.map.LTC]) {
            this.dir = Vector3.from_2D_dir(Vector3.to_FP_Vector(this.dir).ortoAlign(), this.dir.z);
            return;
        }
    }
}

/** Elements */

const ELEMENT = {
    CUBE: {
        positions: [
            // Front face
            -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
            // Back face
            -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,
            // Top face
            -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,
            // Bottom face
            -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
            // Right face
            1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,
            // Left face
            -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
        ],
        indices: [
            0, 1, 2, 0, 2, 3, // front
            4, 5, 6, 4, 6, 7, // back
            8, 9, 10, 8, 10, 11, // top
            12, 13, 14, 12, 14, 15, // bottom
            16, 17, 18, 16, 18, 19, // right
            20, 21, 22, 20, 22, 23, // left
        ],
        textureCoordinates: [
            // Front
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
            // Back
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
            // Top
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
            // Bottom
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
            // Right
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
            // Left
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        ]
    }
};


/** Shaders */



//END
console.log(`%cWebGL ${WebGL.VERSION} loaded.`, WebGL.CSS);