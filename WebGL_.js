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

/**
 * https://glmatrix.net/docs/
 * https://blogs.oregonstate.edu/learnfromscratch/2021/10/05/understanding-various-coordinate-systems-in-opengl/
 * https://learnopengl.com/Getting-started/Transformations
 * https://learnopengl.com/Getting-started/Coordinate-Systems
 * https://webglfundamentals.org/webgl/lessons/webgl-3d-camera.html
 * this: http://www.opengl-tutorial.org/beginners-tutorials/tutorial-3-matrices/#the-model-view-and-projection-matrices
 * https://learnopengl.com/Lighting/Basic-Lighting
 * https://webglfundamentals.org/webgl/lessons/webgl-3d-lighting-directional.html
 * https://webglfundamentals.org/webgl/lessons/webgl-3d-lighting-point.html
 * 
 */

const WebGL = {
    VERSION: "0.10.0",
    CSS: "color: gold",
    CTX: null,
    VERBOSE: true,
    program: null,
    buffer: null,
    texture: null,
    aspect: null,
    zNear: 0.1,
    zFar: 100,
    projectionMatrix: null,
    vertexCount: null,
    setContext(layer) {
        this.CTX = LAYER[layer];
        if (this.VERBOSE) console.log(`%cContext:`, this.CSS, this.CTX);
        if (this.CTX === null) console.error("Unable to initialize WebGL. Your browser or machine may not support it.");
    },
    init(layer, world, textureData, camera, vsSource = SHADER.vShader, fsSource = SHADER.fShader) {
        this.world = world;
        this.setContext(layer);
        const gl = this.CTX;
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        this.initShaderProgram(gl, vsSource, fsSource);
        this.initBuffers(gl, world);
        this.setTexture(gl, textureData);
        this.aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        this.setCamera(camera);

        if (this.VERBOSE) {
            console.log(`%cWorld:`, this.CSS, this.world);
            console.log(`%cProgram:`, this.CSS, this.program);
            console.log(`%cBuffer:`, this.CSS, this.buffer);
            console.log(`%cTexture:`, this.CSS, this.texture);
            console.log(`%cAspect:`, this.CSS, this.aspect);
            console.log(`%cWebGL:`, this.CSS, this);
        }
    },
    setCamera(camera) {
        this.camera = camera;
        const projectionMatrix = glMatrix.mat4.create();
        glMatrix.mat4.perspective(projectionMatrix, this.camera.fov, this.aspect, this.zNear, this.zFar);
        this.projectionMatrix = projectionMatrix;
    },
    setTexture(gl, textureData) {
        this.texture = {};

        for (let T in textureData) {
            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureData[T]);
            gl.generateMipmap(gl.TEXTURE_2D);
            this.texture[T] = texture;
        }

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    },
    initBuffers(gl, world) {
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(world.positions), gl.STATIC_DRAW);

        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(world.indices), gl.STATIC_DRAW);

        const textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(world.textureCoordinates), gl.STATIC_DRAW);

        const normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(world.vertexNormals), gl.STATIC_DRAW);

        this.buffer = {
            position: positionBuffer,
            indices: indexBuffer,
            normal: normalBuffer,
            textureCoord: textureCoordBuffer,
        };
    },
    loadShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    },
    initShaderProgram(gl, vsSource, fsSource) {
        const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
        // Create the shader program
        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            console.error(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
            return null;
        }
        const programInfo = {
            program: shaderProgram,
            attribLocations: {
                vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
                vertexNormal: gl.getAttribLocation(shaderProgram, "aVertexNormal"),
                textureCoord: gl.getAttribLocation(shaderProgram, "aTextureCoord"),
            },
            uniformLocations: {
                projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
                modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
                uSampler: gl.getUniformLocation(shaderProgram, "uSampler"),
                cameraPos: gl.getUniformLocation(shaderProgram, "uCameraPos")
            },
        };
        this.program = programInfo;
    },
    renderScene() {
        const gl = this.CTX;
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0); // Clear everything
        gl.enable(gl.DEPTH_TEST); // Enable depth testing
        gl.depthFunc(gl.LEQUAL); // Near things obscure far things
        gl.enable(gl.CULL_FACE);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        //scene
        const viewMatrix = glMatrix.mat4.create();
        const cameratarget = this.camera.pos.translate(this.camera.dir);
        glMatrix.mat4.lookAt(viewMatrix, this.camera.pos.array, cameratarget.array, [0.0, 1.0, 0.0]);

        // Tell WebGL to use our program when drawing
        gl.useProgram(this.program.program);

        // Set the uniform matrices
        gl.uniformMatrix4fv(this.program.uniformLocations.projectionMatrix, false, this.projectionMatrix);
        gl.uniformMatrix4fv(this.program.uniformLocations.modelViewMatrix, false, viewMatrix);
        gl.uniform3fv(this.program.uniformLocations.cameraPos, this.camera.pos.array);

        this.renderDungeon();
    },
    renderDungeon() {
        const gl = this.CTX;
        //dungeon
        //setPositionAttribute
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.position);
        gl.vertexAttribPointer(this.program.attribLocations.vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.program.attribLocations.vertexPosition);

        //setTextureAttribute
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.textureCoord);
        gl.vertexAttribPointer(this.program.attribLocations.textureCoord, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.program.attribLocations.textureCoord);

        // Tell WebGL which indices to use to index the vertices
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffer.indices);

        //setNormalAttribute
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.normal);
        gl.vertexAttribPointer(this.program.attribLocations.vertexNormal, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.program.attribLocations.vertexNormal);

        // Tell WebGL we want to affect texture unit 0
        // Bind the texture to texture unit 0
        // Tell the shader we bound the texture to texture unit 0
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture.wall);
        gl.uniform1i(this.program.uniformLocations.uSampler, 0);

        //draw
        //gl.drawElements(gl.TRIANGLES, this.vertexCount, gl.UNSIGNED_SHORT, 0);

        //draw separated
        //wall
        gl.drawElements(gl.TRIANGLES, this.world.offset.wall_count, gl.UNSIGNED_SHORT, this.world.offset.wall_start * 2);

        //floor
        gl.bindTexture(gl.TEXTURE_2D, this.texture.floor);
        gl.drawElements(gl.TRIANGLES, this.world.offset.floor_count, gl.UNSIGNED_SHORT, this.world.offset.floor_start * 2);

        //ceil
        gl.bindTexture(gl.TEXTURE_2D, this.texture.ceil);
        gl.drawElements(gl.TRIANGLES, this.world.offset.ceil_count, gl.UNSIGNED_SHORT, this.world.offset.ceil_start * 2);
    }
};

const WORLD = {
    init() {
        this.positions = [];
        this.indices = [];
        this.textureCoordinates = [];
        this.vertexNormals = [];

        this.totalIndexCount = 0;

        this.wall = {
            positions: [],
            indices: [],
            textureCoordinates: [],
            vertexNormals: [],
        };

        this.floor = {
            positions: [],
            indices: [],
            textureCoordinates: [],
            vertexNormals: [],
        };

        this.ceil = {
            positions: [],
            indices: [],
            textureCoordinates: [],
            vertexNormals: [],
        };
    },
    addCube(Y, grid, type) {
        return this.addElement(ELEMENT.CUBE, Y, grid, type);
    },
    addElement(E, Y, grid, type) {
        let positions = [...E.positions];
        let indices = [...E.indices];
        let textureCoordinates = [...E.textureCoordinates];
        let vertexNormals = [...E.vertexNormals];

        //positions
        for (let p = 0; p < positions.length; p += 3) {
            positions[p] += grid.x;
            positions[p + 1] += Y;
            positions[p + 2] += grid.y;
        }

        //indices
        indices = indices.map(e => e + (this[type].positions.length / 3));

        this[type].positions = this[type].positions.concat(positions);
        this[type].indices = this[type].indices.concat(indices);
        this[type].textureCoordinates = this[type].textureCoordinates.concat(textureCoordinates);
        this[type].vertexNormals = this[type].vertexNormals.concat(vertexNormals);

    },
    build(GA, Y = 0) {
        console.time("WorldBuilding");
        this.init();

        for (let [index, value] of GA.map.entries()) {
            let grid = GA.indexToGrid(index);
            switch (value) {
                case MAPDICT.EMPTY:
                    //add cube Y-1, Y+1
                    this.addCube(Y - 1, grid, "floor");
                    this.addCube(Y + 1, grid, "ceil");

                    break;
                case MAPDICT.WALL:
                    //add cube Y
                    this.addCube(Y, grid, "wall");
                    break;
                default:
                    console.error("world building GA value error", value);
            }
        }

        //update index offsets

        this.floor.indices = this.floor.indices.map(e => e + this.wall.positions.length / 3);
        this.ceil.indices = this.ceil.indices.map(e => e + (this.wall.positions.length + this.floor.positions.length) / 3);

        //
        this.positions = [...this.wall.positions, ...this.floor.positions, ...this.ceil.positions];
        this.indices = [...this.wall.indices, ...this.floor.indices, ...this.ceil.indices];
        this.textureCoordinates = [...this.wall.textureCoordinates, ...this.floor.textureCoordinates, ...this.ceil.textureCoordinates];
        this.vertexNormals = [...this.wall.vertexNormals, ...this.floor.vertexNormals, ...this.ceil.vertexNormals];

        const offset = {
            wall_start: 0,
            wall_count: this.wall.indices.length,
            floor_start: this.wall.indices.length,
            floor_count: this.floor.indices.length,
            ceil_start: this.wall.indices.length + this.floor.indices.length,
            ceil_count: this.ceil.indices.length,
        };

        console.timeEnd("WorldBuilding");
        return new World(this.positions, this.indices, this.textureCoordinates, this.vertexNormals, offset);
    },
};

/** Classes */

class World {
    constructor(positions, indices, textureCoordinates, vertexNormals, offset) {
        this.positions = positions;
        this.indices = indices;
        this.textureCoordinates = textureCoordinates;
        this.vertexNormals = vertexNormals;
        this.offset = offset;
    }
}

class $3D_player {
    constructor(position, dir, map = null, size = 0.5, H = 0.5) {
        this.setPos(position);
        this.setDir(dir);
        this.setMap(map);
        this.GA = this.map.GA;
        this.setR(size / 2.0);
        this.setFov();
        this.rotationResolution = 64;
        this.setSpeed(4.0);
        this.H = H;
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
        this.dir = Vector3.from_2D_dir(this.dir.rotate2D(angle), this.dir.y);
        //this.log();
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
        let dir = this.dir;

        if (reverse) {
            dir = dir.reverse2D();
        }

        let nextPos3 = this.pos.translate(dir, length); //3D
        let nextPos = Vector3.to_FP_Grid(nextPos3);

        //check if staircase
        //let bump = this.usingStaircase(nextPos);
        let bump = null;
        if (bump !== null) {
            bump.interact();
            return;
        }

        if (this.bumpEnemy(nextPos)) return;

        let check = this.GA.entityNotInWall(nextPos, Vector3.to_FP_Vector(dir), this.r);

        if (check) {
            this.pos = nextPos3;
        }
        //this.log();
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
        let dir = Vector3.from_2D_dir(this.dir.rotate2D((rotDirection * Math.PI) / 2), this.dir.y);
        let nextPos3 = this.pos.translate(dir, length);
        let nextPos = Vector3.to_FP_Grid(nextPos3);
        //check if staircase
        //let bump = this.usingStaircase(nextPos);
        let bump = null;
        if (bump !== null) {
            bump.interact();
            return;
        }

        if (this.bumpEnemy(nextPos)) return;
        let check = this.GA.entityNotInWall(nextPos, Vector3.to_FP_Vector(dir), this.r);
        if (check) {
            this.pos = nextPos3;
        }
        //this.log();
    }
    log() {
        console.log("pos:", this.pos, "dir", this.dir);
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
            this.dir = Vector3.from_2D_dir(Vector3.to_FP_Vector(this.dir).ortoAlign(), this.dir.y);
            return;
        }
    }
}

/** Elements */

const ELEMENT = {
    CUBE: {
        positions: [
            // Front face
            0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0,
            // Back face
            0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
            // Top face
            0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0,
            // Bottom face
            0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0,
            // Right face
            1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0,
            // Left face
            0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0,
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
            0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0,
            // Top
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
            // Bottom
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
            // Right
            0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0,
            // Left
            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        ],
        vertexNormals: [
            // Front
            0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
            // Back
            0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,
            // Top
            0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
            // Bottom
            0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
            // Right
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
            // Left
            -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
        ]
    }
};

//ELEMENT.CUBE.setColors();

//END
console.log(`%cWebGL ${WebGL.VERSION} loaded.`, WebGL.CSS);