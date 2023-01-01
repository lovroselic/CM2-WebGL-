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
 */

const WebGL = {
    VERSION: "0.04",
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
    init(layer, world, texture, camera, vsSource = SHADER.vShader, fsSource = SHADER.fShader) {
        this.setContext(layer);
        if (this.VERBOSE) console.log(`%cWorld:`, this.CSS, world);
        const gl = this.CTX;
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        this.initShaderProgram(gl, vsSource, fsSource);
        console.log(`%cProgram:`, this.CSS, this.program);
        this.initBuffers(gl, world);
        console.log(`%cBuffer:`, this.CSS, this.buffer);
        this.setTexture(gl, texture);
        console.log(`%cTexture:`, this.CSS, this.texture);
        this.aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        console.log(`%cAspect:`, this.CSS, this.aspect);
        this.setCamera(camera);
        this.vertexCount = world.indices.length;
        console.log(`%cWebGL:`, this.CSS, this);
    },
    setCamera(camera) {
        this.camera = camera;
        const projectionMatrix = glMatrix.mat4.create();
        glMatrix.mat4.perspective(projectionMatrix, this.camera.fov, this.aspect, this.zNear, this.zFar);
        this.projectionMatrix = projectionMatrix;
    },
    setTexture(gl, img) {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.generateMipmap(gl.TEXTURE_2D);
        this.texture = texture;
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

        /*
        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(world.colors), gl.STATIC_DRAW);
        */

        //
        this.buffer = {
            position: positionBuffer,
            indices: indexBuffer,
            normal: normalBuffer,
            textureCoord: textureCoordBuffer,
            //colors: colorBuffer
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
                //vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
            },
            uniformLocations: {
                projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
                modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
                normalMatrix: gl.getUniformLocation(shaderProgram, "uNormalMatrix"),
                uSampler: gl.getUniformLocation(shaderProgram, "uSampler"),
            },
        };
        this.program = programInfo;
    },
    renderScene() {
        const gl = this.CTX;
        gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
        gl.clearDepth(1.0); // Clear everything
        gl.enable(gl.DEPTH_TEST); // Enable depth testing
        gl.depthFunc(gl.LEQUAL); // Near things obscure far things
        // Cull triangles which normal is not towards the camera
        gl.enable(gl.CULL_FACE);
        // Clear the canvas before we start drawing on it.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Set the drawing position to the "identity" point, which is
        // the center of the scene.
        // Now move the drawing position where we want to start drawing 

        const viewMatrix = glMatrix.mat4.create();
        let cameratarget = this.camera.pos.translate(this.camera.dir);
        glMatrix.mat4.lookAt(viewMatrix, this.camera.pos.array, cameratarget.array, [0.0, 1.0, 0.0]); 

        //for lightning
        const normalMatrix = glMatrix.mat4.create();
        glMatrix.mat4.invert(normalMatrix, viewMatrix);
        glMatrix.mat4.transpose(normalMatrix, viewMatrix);

        //setPositionAttribute
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.position);
        gl.vertexAttribPointer(this.program.attribLocations.vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.program.attribLocations.vertexPosition);

        //setColorAttribute
        /*
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.colors);
        gl.vertexAttribPointer(this.program.attribLocations.vertexColor, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.program.attribLocations.vertexColor);
        */

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



        // Tell WebGL to use our program when drawing
        gl.useProgram(this.program.program);

        // Set the shader uniforms, viewProjectionMatrix
        gl.uniformMatrix4fv(this.program.uniformLocations.projectionMatrix, false, this.projectionMatrix);
        gl.uniformMatrix4fv(this.program.uniformLocations.modelViewMatrix, false, viewMatrix);
        gl.uniformMatrix4fv(this.program.uniformLocations.normalMatrix, false, normalMatrix);

        // Tell WebGL we want to affect texture unit 0
        gl.activeTexture(gl.TEXTURE0);

        // Bind the texture to texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, this.texture);

        // Tell the shader we bound the texture to texture unit 0
        gl.uniform1i(this.program.uniformLocations.uSampler, 0);

        //draw
        gl.drawElements(gl.TRIANGLES, this.vertexCount, gl.UNSIGNED_SHORT, 0);
    }
};

const WORLD = {
    init() {
        this.positions = [];
        this.indices = [];
        this.textureCoordinates = [];
        this.vertexNormals = [];
        //this.colors = [];
    },
    addCube(Y, grid) {
        return this.addElement(ELEMENT.CUBE, Y, grid);
    },
    addElement(E, Y, grid) {
        let positions = [...E.positions];
        let indices = [...E.indices];
        let textureCoordinates = [...E.textureCoordinates];
        let vertexNormals = [...E.vertexNormals];
        //let colors = [...E.colors];

        //positions
        for (let p = 0; p < positions.length; p += 3) {
            positions[p] += grid.x;
            positions[p + 1] += Y;
            positions[p + 2] += grid.y;
        }

        //indices
        for (let i = 0; i < indices.length; i++) {
            indices[i] += this.positions.length / 3;
        }

        //vertexNormals
        for (let p = 0; p < vertexNormals.length; p += 3) {
            vertexNormals[p] += grid.x;
            vertexNormals[p + 1] += Y;
            vertexNormals[p + 2] += grid.y;
        }

        this.positions = this.positions.concat(positions);
        this.indices = this.indices.concat(indices);
        this.textureCoordinates = this.textureCoordinates.concat(textureCoordinates);
        this.vertexNormals = this.vertexNormals.concat(vertexNormals);
        //this.colors = this.colors.concat(colors);
    },
    build(GA, Y = 0) {
        console.time("WorldBuilding");
        this.init();

        for (let [index, value] of GA.map.entries()) {
            let grid = GA.indexToGrid(index);
            //console.log(index, "->", value, "grid", grid);
            switch (value) {
                case MAPDICT.EMPTY:
                    //add cube Y-1, Y+1
                    this.addCube(Y - 1, grid);
                    this.addCube(Y + 1, grid);

                    break;
                case MAPDICT.WALL:
                    //add cube Y
                    this.addCube(Y, grid);
                    break;
                default:
                    console.error("world building GA value error", value);
            }
        }

        console.timeEnd("WorldBuilding");
        return new World(this.positions, this.indices, this.textureCoordinates, this.vertexNormals);
    },
};

/** Classes */

class World {
    constructor(positions, indices, textureCoordinates, vertexNormals, colors = null) {
        this.positions = positions;
        this.indices = indices;
        this.textureCoordinates = textureCoordinates;
        this.vertexNormals = vertexNormals;
        this.colors = colors;
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
        //let check = true;
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
        /*positions: [
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
        ],*/
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
        //colors: [],
        /*setColors() {
            for (let i = 0; i < this.faceColors.length; i++) {
                const c = this.faceColors[i];
                this.colors = this.colors.concat(c, c, c, c);
            }
        },*/
        /*faceColors: [
            [1.0, 1.0, 1.0, 1.0], // Front face: white
            [1.0, 0.0, 0.0, 1.0], // Back face: red
            [0.0, 1.0, 0.0, 1.0], // Top face: green
            [0.0, 0.0, 1.0, 1.0], // Bottom face: blue
            [1.0, 1.0, 0.0, 1.0], // Right face: yellow
            [1.0, 0.0, 1.0, 1.0], // Left face: purple
        ],*/
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
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            // Top
            0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
            // Bottom
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
            // Right
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
            // Left
            0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        ]
    }
};

//ELEMENT.CUBE.setColors();

//END
console.log(`%cWebGL ${WebGL.VERSION} loaded.`, WebGL.CSS);