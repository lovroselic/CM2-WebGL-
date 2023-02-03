/*jshint browser: true */
/*jshint -W097 */
/*jshint -W117 */
/*jshint -W061 */
/*jshint -W083 */
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
 * https://webglfundamentals.org/webgl/lessons/webgl-drawing-multiple-things.html
 * https://learnopengl.com/Lighting/Multiple-lights
 * https://webglfundamentals.org/webgl/lessons/webgl-3d-lighting-point.html
 * https://webglfundamentals.org/webgl/lessons/webgl-qna-setting-the-values-of-a-struct-array-from-js-to-glsl.html
 * 
 * https://learnopengl.com/Advanced-OpenGL/Advanced-Data
 * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/readPixels
 * 
 * https://webglfundamentals.org/webgl/lessons/webgl-render-to-texture.html
 * https://webglfundamentals.org/webgl/lessons/webgl-picking.html
 * http://www.opengl-tutorial.org/miscellaneous/clicking-on-objects/picking-with-an-opengl-hack/
 * 
 * https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/bufferSubData
 * 
 * https://learnopengl.com/Model-Loading/Assimp
 * https://webglfundamentals.org/webgl/lessons/webgl-load-obj.html
 * http://paulbourke.net/dataformats/obj/
 * https://en.wikipedia.org/wiki/Wavefront_.obj_file
 * http://learnwebgl.brown37.net/rendering/obj_to_buffers.html
 * http://www.opengl-tutorial.org/beginners-tutorials/tutorial-7-model-loading/
 */

const WebGL = {
    VERSION: "0.13.5",
    CSS: "color: gold",
    CTX: null,
    VERBOSE: true,
    INI: {
        PIC_WIDTH: 0.5,
        PIC_TOP: 0.2,
        PIC_OUT: 0.01,
        LIGHT_WIDTH: 0.4,
        LIGHT_TOP: 0.1,
        DEFAULT_RESOLUTION: 256,
        MIN_RESOLUTION: 128,
        INTERACT_DISTANCE: 1.3,
    },
    program: null,
    pickProgram: null,
    buffer: null,
    texture: null,
    aspect: null,
    zNear: 0.1,
    zFar: 100,
    projectionMatrix: null,
    vertexCount: null,
    targetTexture: null,
    depthBuffer: null,
    frameBuffer: null,
    staticDecalList: [DECAL3D, LIGHTS3D],
    dynamicDecalList: [GATE3D, ITEM3D],
    setContext(layer) {
        this.CTX = LAYER[layer];
        if (this.VERBOSE) console.log(`%cContext:`, this.CSS, this.CTX);
        if (this.CTX === null) console.error("Unable to initialize WebGL. Your browser or machine may not support it.");
    },
    init(layer, world, textureData, camera,
        vsSource = SHADER.vShader,
        fsSource = SHADER.fShader,
        pick_vSource = SHADER.pick_vShader,
        pick_fSource = SHADER.pick_fShader) {
        this.world = world;
        this.setContext(layer);
        const gl = this.CTX;
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        this.initShaderProgram(gl, vsSource, fsSource);
        this.initPickProgram(gl, pick_vSource, pick_fSource);
        this.initBuffers(gl, world);
        this.setTexture(textureData);
        this.setDecalTextures();
        this.aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        this.setCamera(camera);
        this.setPickBuffers(gl);

        if (this.VERBOSE) {
            console.log(`%cWorld:`, this.CSS, this.world);
            console.log(`%cWebGL:`, this.CSS, this);
        }
    },
    init_required_IAM(map) {
        DECAL3D.init(map);
        LIGHTS3D.init(map);
        GATE3D.init(map);
        VANISHING3D.init(map);
        ITEM3D.init(map);

        if (this.VERBOSE) {
            console.log("DECAL3D", DECAL3D);
            console.log("LIGHTS3D", LIGHTS3D);
            console.log("GATE3D", GATE3D);
            console.log("VANISHING3D", VANISHING3D);
            console.log("ITEM3D", ITEM3D);
        }
    },
    setCamera(camera) {
        this.camera = camera;
        const projectionMatrix = glMatrix.mat4.create();
        glMatrix.mat4.perspective(projectionMatrix, this.camera.fov, this.aspect, this.zNear, this.zFar);
        this.projectionMatrix = projectionMatrix;
    },
    createTexture(T) {
        const gl = this.CTX;
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, T);
        if (isPowerOf2(T.width) && isPowerOf2(T.height)) {
            gl.generateMipmap(gl.TEXTURE_2D);
        } else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }

        return texture;

        function isPowerOf2(value) {
            return (value & (value - 1)) === 0;
        }
    },
    setTexture(textureData) {
        const gl = this.CTX;
        this.texture = {};

        for (let T in textureData) {
            this.texture[T] = this.createTexture(textureData[T]);
        }

        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    },
    setDecalTextures() {
        for (const iam of [...WebGL.staticDecalList, ...WebGL.dynamicDecalList]) {
            for (const decal of iam.POOL) {
                decal.texture = this.createTexture(decal.texture);
            }
        }
    },
    initBuffers(gl, world) {
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(world.positions), gl.STATIC_DRAW);
        //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(world.positions), gl.DYNAMIC_DRAW);

        const indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(world.indices), gl.STATIC_DRAW);
        //gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(world.indices), gl.DYNAMIC_DRAW);

        const textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(world.textureCoordinates), gl.STATIC_DRAW);
        //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(world.textureCoordinates), gl.DYNAMIC_DRAW);

        const normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(world.vertexNormals), gl.STATIC_DRAW);
        //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(world.vertexNormals), gl.DYNAMIC_DRAW);

        this.buffer = {
            position: positionBuffer,
            indices: indexBuffer,
            normal: normalBuffer,
            textureCoord: textureCoordBuffer,
        };
    },
    setPickBuffers(gl) {
        // Create a texture to render to
        const targetTexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, targetTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        this.targetTexture = targetTexture;

        // create a depth renderbuffer
        const depthBuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
        this.depthBuffer = depthBuffer;

        // Create and bind the framebuffer
        const fb = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fb);

        // attach the texture as the first color attachment
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.targetTexture, 0);

        // make a depth buffer and the same size as the targetTexture
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depthBuffer);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.canvas.clientWidth, gl.canvas.clientHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthBuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, gl.canvas.clientWidth, gl.canvas.clientHeight);

        this.frameBuffer = fb;
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
    updateShaders() {
        SHADER.fShader = SHADER.fShader.replace("N_LIGHTS = 1", `N_LIGHTS = ${LIGHTS3D.POOL.length}`);
    },
    initPickProgram(gl, vsSource, fsSource) {
        const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
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
            },
            uniformLocations: {
                projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
                modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
                id: gl.getUniformLocation(shaderProgram, "u_id"),
            },
        };

        this.pickProgram = programInfo;
    },
    initShaderProgram(gl, vsSource, fsSource) {
        const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
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
                cameraPos: gl.getUniformLocation(shaderProgram, "uCameraPos"),
                lights: gl.getUniformLocation(shaderProgram, "uPointLights")
            },
        };

        this.program = programInfo;
    },
    renderScene() {
        const gl = this.CTX;
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST); // Enable depth testing
        gl.depthFunc(gl.LEQUAL); // Near things obscure far things
        gl.enable(gl.CULL_FACE);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        //scene
        const viewMatrix = glMatrix.mat4.create();
        const cameratarget = this.camera.pos.translate(this.camera.dir);
        glMatrix.mat4.lookAt(viewMatrix, this.camera.pos.array, cameratarget.array, [0.0, 1.0, 0.0]);

        gl.useProgram(this.program.program);
        // Set the uniform matrices
        gl.uniformMatrix4fv(this.program.uniformLocations.projectionMatrix, false, this.projectionMatrix);
        gl.uniformMatrix4fv(this.program.uniformLocations.modelViewMatrix, false, viewMatrix);
        gl.uniform3fv(this.program.uniformLocations.cameraPos, this.camera.pos.array);

        //light uniforms
        let lights = [];
        for (let L = 0; L < LIGHTS3D.POOL.length; L++) {
            lights = [...lights, ...LIGHTS3D.POOL[L].position.array];
        }
        gl.uniform3fv(this.program.uniformLocations.lights, new Float32Array(lights));

        //and pickProgram
        gl.useProgram(this.pickProgram.program);
        gl.uniformMatrix4fv(this.pickProgram.uniformLocations.projectionMatrix, false, this.projectionMatrix);
        gl.uniformMatrix4fv(this.pickProgram.uniformLocations.modelViewMatrix, false, viewMatrix);

        this.renderDungeon();
    },
    renderDungeon() {
        const gl = this.CTX;
        gl.useProgram(this.program.program);

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

        //picking program
        gl.useProgram(this.pickProgram.program);
        //setPositionAttribute
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.position);
        gl.vertexAttribPointer(this.pickProgram.attribLocations.vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.pickProgram.attribLocations.vertexPosition);

        //start draw
        gl.useProgram(this.program.program);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null); //
        //draw separated
        //wall
        gl.drawElements(gl.TRIANGLES, this.world.offset.wall_count, gl.UNSIGNED_SHORT, this.world.offset.wall_start * 2);

        //floor
        gl.bindTexture(gl.TEXTURE_2D, this.texture.floor);
        gl.drawElements(gl.TRIANGLES, this.world.offset.floor_count, gl.UNSIGNED_SHORT, this.world.offset.floor_start * 2);

        //ceil
        gl.bindTexture(gl.TEXTURE_2D, this.texture.ceil);
        gl.drawElements(gl.TRIANGLES, this.world.offset.ceil_count, gl.UNSIGNED_SHORT, this.world.offset.ceil_start * 2);

        //static decals
        let decalCount = 0;
        for (const iam of WebGL.staticDecalList) {
            for (const decal of iam.POOL) {
                gl.bindTexture(gl.TEXTURE_2D, decal.texture);
                gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, (this.world.offset.decal_start + decalCount * 6) * 2);
                decalCount++;
            }
        }

        //existing doors
        for (const door of GATE3D.POOL) {
            if (door) {
                gl.bindTexture(gl.TEXTURE_2D, door.texture);
                gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, (this.world.offset.door_start + ((door.id - 1) * 36)) * 2);

                // to texture 
                let id = GATE3D.globalId(door.id);
                let id_vec = this.idToVec(id);

                gl.useProgram(this.pickProgram.program);
                gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
                gl.uniform4fv(this.pickProgram.uniformLocations.id, new Float32Array(id_vec));
                gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, (this.world.offset.door_start + ((door.id - 1) * 36)) * 2);

                //back to canvas
                gl.useProgram(this.program.program);
                gl.bindFramebuffer(gl.FRAMEBUFFER, null); //
            }
        }

        //items
        let current_item_index_offset = 0;
        for (const item of ITEM3D.POOL) {
            if (item.active) {
                gl.bindTexture(gl.TEXTURE_2D, item.texture);
                gl.drawElements(gl.TRIANGLES, item.indices, gl.UNSIGNED_SHORT, 2 * this.world.offset.item_start + current_item_index_offset);

                // to texture 
                let id = ITEM3D.globalId(item.id);
                let id_vec = this.idToVec(id);

                gl.useProgram(this.pickProgram.program);
                gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
                gl.uniform4fv(this.pickProgram.uniformLocations.id, new Float32Array(id_vec));
                gl.drawElements(gl.TRIANGLES, item.indices, gl.UNSIGNED_SHORT, 2 * this.world.offset.item_start + current_item_index_offset);

                //back to canvas
                gl.useProgram(this.program.program);
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);

                //current_item_index_offset += item.byte_length;
            }
            current_item_index_offset += item.byte_length;
        }
    },
    idToVec(id) {
        return [((id >> 0) & 0xFF) / 0xFF, ((id >> 8) & 0xFF) / 0xFF, ((id >> 16) & 0xFF) / 0xFF, ((id >> 24) & 0xFF) / 0xFF];
    },

    /** buffer manipulation */
    hideCube(id, type) {
        let offset = (this.world.positionOffset[`${type}_start`] + ((id - 1) * 72)) * 4;
        let data = ELEMENT.CUBE.hidden;
        return this.updateVertices(offset, data);
    },
    updateVertices(offset, data) {
        const gl = this.CTX;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer.position);
        gl.bufferSubData(gl.ARRAY_BUFFER, offset, data);
    },

    /** end buffer manipulation */

    DATA: {
        window: null,
        layer: null,
    },
    MOUSE: {
        initialize(id) {
            WebGL.DATA.window = id;
            WebGL.DATA.layer = ENGINE.getCanvasName(id);
            ENGINE.topCanvas = WebGL.DATA.layer;
            $(WebGL.DATA.layer).on(
                "mousemove",
                { layer: WebGL.DATA.layer },
                ENGINE.readMouse
            );
            console.log(`%cWebGL.MOUSE -> window ${WebGL.DATA.window}, layer: ${WebGL.DATA.layer}`, WebGL.CSS);
        },
        click(hero) {
            if (ENGINE.mouseOverId(WebGL.DATA.window)) {
                if (ENGINE.mouseClickId(WebGL.DATA.window)) {
                    const gl = WebGL.CTX;
                    gl.bindFramebuffer(gl.FRAMEBUFFER, WebGL.frameBuffer);
                    const pixelX = ENGINE.mouseX;
                    const pixelY = gl.canvas.height - ENGINE.mouseY - 1;
                    const data = new Uint8Array(4);
                    gl.readPixels(pixelX, pixelY, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, data);
                    const id = data[0] + (data[1] << 8) + (data[2] << 16) + (data[3] << 24);
                    if (id > 0) {
                        const obj = GLOBAL_ID_MANAGER.getObject(id);
                        if (!obj) return;
                        if (!obj.interactive) return;
                        console.log("obj", obj, obj.grid, obj.constructor.name);
                        let PPos2d = Vector3.to_FP_Grid(HERO.player.pos);
                        let itemGrid = obj.grid;
                        if (obj.constructor.name === "Gate") {
                            itemGrid = Grid.toCenter(obj.grid);
                        }
                        let distance = PPos2d.EuclidianDistance(itemGrid);
                        console.log("distance", distance);
                        if (distance < WebGL.INI.INTERACT_DISTANCE) {
                            return obj.interact(hero.player.GA, hero.inventory);
                        }
                    }
                }
            }
        }
    }
};

const WORLD = {
    bufferTypes: ["positions", 'indices', "textureCoordinates", "vertexNormals"],
    objectTypes: ["wall", "floor", "ceil", "decal", "door", "item"],
    init() {
        for (let BT of this.bufferTypes) {
            this[BT] = [];
        }
        for (let OT of this.objectTypes) {
            this[OT] = {};
            for (let BT of this.bufferTypes) {
                this[OT][BT] = [];
            }
        }
    },
    getBoundaries(cat, W, H, resolution) {
        const R = W / H;
        let leftX, rightX, topY, bottomY;
        let dW, dH;

        switch (cat) {
            case "picture":
                leftX = ((1 - WebGL.INI.PIC_WIDTH) / 2.0);
                rightX = 1.0 - leftX;
                topY = 1.0 - WebGL.INI.PIC_TOP;
                bottomY = 1.0 - ((WebGL.INI.PIC_WIDTH / R) + WebGL.INI.PIC_TOP);
                break;
            case "light":
                leftX = ((1 - WebGL.INI.LIGHT_WIDTH) / 2.0);
                rightX = 1.0 - leftX;
                topY = 1.0 - WebGL.INI.LIGHT_TOP;
                bottomY = 1.0 - ((WebGL.INI.LIGHT_WIDTH / R) + WebGL.INI.LIGHT_TOP);
                break;
            case "crest":
                dW = (1.0 - W / resolution) / 2;
                dH = (1.0 - H / resolution) / 2;
                leftX = dW;
                rightX = 1.0 - dW;
                topY = 1.0 - dH;
                bottomY = dH;
                break;
            default:
                console.error("decal category error", cat);
                break;
        }
        return [leftX, rightX, topY, bottomY];
    },
    divineResolution(pic) {
        let maxDimension = Math.max(pic.width, pic.height);
        let resolution = 2 ** (Math.ceil(Math.log2(maxDimension)));
        return Math.max(resolution, WebGL.INI.MIN_RESOLUTION);
    },
    addPic(Y, decal, type) {
        let resolution = WebGL.INI.DEFAULT_RESOLUTION;
        if (decal.category === "crest") {
            resolution = this.divineResolution(decal.texture);
        }
        const [leftX, rightX, topY, bottomY] = this.getBoundaries(decal.category, decal.texture.width, decal.texture.height, resolution);
        const E = ELEMENT[`${decal.face}_FACE`];
        let positions = [...E.positions];
        let indices = [...E.indices];
        let textureCoordinates = [...E.textureCoordinates];
        let vertexNormals = [...E.vertexNormals];

        //scale
        switch (decal.face) {
            case "FRONT":
                positions[0] = leftX;
                positions[1] = bottomY;
                positions[3] = rightX;
                positions[4] = bottomY;
                positions[6] = rightX;
                positions[7] = topY;
                positions[9] = leftX;
                positions[10] = topY;
                for (let z of [2, 5, 8, 11]) {
                    positions[z] += WebGL.INI.PIC_OUT;
                }
                break;
            case "BACK":
                positions[0] = leftX;
                positions[1] = bottomY;
                positions[3] = leftX;
                positions[4] = topY;
                positions[6] = rightX;
                positions[7] = topY;
                positions[9] = rightX;
                positions[10] = bottomY;
                for (let z of [2, 5, 8, 11]) {
                    positions[z] -= WebGL.INI.PIC_OUT;
                }
                break;
            case "RIGHT":
                positions[1] = bottomY;
                positions[2] = leftX;
                positions[4] = topY;
                positions[5] = leftX;
                positions[7] = topY;
                positions[8] = rightX;
                positions[10] = bottomY;
                positions[11] = rightX;
                for (let x of [0, 3, 6, 9]) {
                    positions[x] += WebGL.INI.PIC_OUT;
                }
                break;
            case "LEFT":
                positions[1] = bottomY;
                positions[2] = leftX;
                positions[4] = bottomY;
                positions[5] = rightX;
                positions[7] = topY;
                positions[8] = rightX;
                positions[10] = topY;
                positions[11] = leftX;
                for (let x of [0, 3, 6, 9]) {
                    positions[x] -= WebGL.INI.PIC_OUT;
                }
                break;
            default:
                console.error("addPic face error:", decal.face);
                break;
        }

        //translate
        for (let p = 0; p < positions.length; p += 3) {
            positions[p] += decal.grid.x;
            positions[p + 1] += Y;
            positions[p + 2] += decal.grid.y;
        }

        //indices
        indices = indices.map(e => e + (this[type].positions.length / 3));

        this[type].positions = this[type].positions.concat(positions);
        this[type].indices = this[type].indices.concat(indices);
        this[type].textureCoordinates = this[type].textureCoordinates.concat(textureCoordinates);
        this[type].vertexNormals = this[type].vertexNormals.concat(vertexNormals);
    },
    addCube(Y, grid, type) {
        return this.addElement(ELEMENT.CUBE, Y, grid, type);
    },
    addElement(E, Y, grid, type, scale = null) {
        let positions = [...E.positions];
        let indices = [...E.indices];
        let textureCoordinates = [...E.textureCoordinates];
        let vertexNormals = [...E.vertexNormals];

        //positions
        for (let p = 0; p < positions.length; p += 3) {
            if (scale) {
                positions[p] *= scale[0];
                positions[p + 1] *= scale[1];
                positions[p + 2] *= scale[2];
            }
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
    build(map, Y = 0) {
        const GA = map.GA;
        console.time("WorldBuilding");
        this.init();

        for (let [index, value] of GA.map.entries()) {
            let grid = GA.indexToGrid(index);
            switch (value) {
                case MAPDICT.EMPTY:
                case MAPDICT.WALL + MAPDICT.DOOR + MAPDICT.RESERVED:
                    this.addCube(Y - 1, grid, "floor");
                    this.addCube(Y + 1, grid, "ceil");
                    break;
                case MAPDICT.WALL:
                    this.addCube(Y, grid, "wall");
                    break;
                default:
                    console.error("world building GA value error", value);
            }
        }

        /** build static decals */
        for (const iam of WebGL.staticDecalList) {
            for (const decal of iam.POOL) {
                this.addPic(Y, decal, "decal");
            }
        }
        /** static decal end */

        /** build gates */
        for (const door of GATE3D.POOL) {
            let door_vertice_offset = this.door.positions.length;
            this.addCube(Y, door.grid, "door");
            door.vertice_data = this.door.positions.slice(door_vertice_offset, door_vertice_offset + 72);

            //smudge bottom
            let door_texture_offset = this.door.textureCoordinates.length - 48 + 24;
            for (let i = 0; i < 8; i++) {
                if (this.door.textureCoordinates[door_texture_offset + i] === 1.0) {
                    this.door.textureCoordinates[door_texture_offset + i] = 0.1;
                }
            }
        }
        /** gates end */

        /** items */
        for (const item of ITEM3D.POOL) {
            this.addElement(item.element, item.Y, item.grid, 'item', item.scale);
        }

        /** items end */

        /** map indices */
        {
            let L = 0;
            for (let type of this.objectTypes) {
                this[type].indices = this[type].indices.map(e => e + L);
                L += this[type].positions.length / 3;
            }
        }

        /** globalize */
        for (let BT of this.bufferTypes) {
            this[BT] = [];
            for (let OT of this.objectTypes) {
                this[BT] = this[BT].concat(this[OT][BT]);
            }
        }

        const offset = this.create_offset('indices');
        const positionOffset = this.create_offset('positions');

        console.timeEnd("WorldBuilding");
        return new World(this.positions, this.indices, this.textureCoordinates, this.vertexNormals, offset, positionOffset);
    },
    create_offset(BT) {
        let offset = {};
        let L = 0;
        for (let OT of this.objectTypes) {
            offset[`${OT}_count`] = this[OT][BT].length;
            offset[`${OT}_start`] = L;
            L += this[OT][BT].length;
        }

        return offset;
    }
};

/** Classes */

class World {
    constructor(positions, indices, textureCoordinates, vertexNormals, offset, positionOffset) {
        this.positions = positions;
        this.indices = indices;
        this.textureCoordinates = textureCoordinates;
        this.vertexNormals = vertexNormals;
        this.offset = offset;
        this.positionOffset = positionOffset;
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

class Decal {
    constructor(grid, face, texture, category, name) {
        this.grid = grid;
        this.face = face;
        this.texture = texture;
        this.category = category;
        this.name = name;
    }
}
class StaticDecal extends Decal {
    constructor(grid, face, texture, category, name) {
        super(grid, face, texture, category, name);
        this.type = "StaticDecal";
        this.interactive = false;
    }
}
class LightDecal extends Decal {
    constructor(grid, face, texture, category, name) {
        super(grid, face, texture, category, name);
        this.type = "LightDecal";
        this.interactive = false;
        this.setPosition(grid, face);
    }
    setPosition(grid, face) {
        let off = FaceToOffset(face, WebGL.INI.PIC_OUT);
        let pos = FP_Grid.toClass(grid).add(off);
        this.position = new Vector3(pos.x, WebGL.INI.LIGHT_TOP, pos.y);
    }
}
class Gate {
    constructor(grid, type) {
        this.grid = grid;
        this.type = type;
        this.interactive = true;
        for (const prop in type) {
            this[prop] = type[prop];
        }
        this.texture = TEXTURE[this.texture];
    }
    hide() {
        WebGL.hideCube(this.id, "door");
    }
    lift() {
        let gate = new LiftingGate(this, this.grid, this.texture, this.name, this.vertice_data, VANISHING3D);
        VANISHING3D.add(gate);
    }
    interact(GA, inventory) {
        console.log("Open gate", this.color, this.name);
        if (this.locked) {
            const checkKey = (key, value) => inventory.key.some((o) => o[key] === value);
            console.log("checkKey", checkKey("color", this.color));
            if (checkKey("color", this.color)) {
                this.locked = false;
                inventory.key = inventory.key.filter((el) => el.color !== this.color);
            }
        }

        if (!this.locked) {
            this.interactive = false;
            this.lift();
            GA.openDoor(this.grid);
            AUDIO.OpenGate.play();
            return { category: "title", section: "keys" };
        } else {
            AUDIO.ClosedDoor.play();
        }
    }
}
class LiftingGate {
    constructor(gate, grid, texture, name, data, IAM) {
        this.gate = gate;
        this.grid = grid;
        this.texture = texture;
        this.name = name;
        this.vertice_data = new Float32Array(data);
        this.IAM = IAM;
    }
    manage(lapsedTime) {
        const DOOR_LIFTING_SPEED = 0.60;
        const dY = DOOR_LIFTING_SPEED * lapsedTime / 1000;
        this.lift(dY);
        let offset = (WebGL.world.positionOffset.door_start + ((this.gate.id - 1) * 72)) * 4;
        WebGL.updateVertices(offset, this.vertice_data);
        if (this.done()) this.remove();
    }
    lift(dY) {
        for (let i = 0; i < this.vertice_data.length; i += 3) {
            this.vertice_data[i + 1] += dY;
        }
    }
    done() {
        return this.vertice_data[1] > 1.0;
    }
    remove() {
        //this.gate.hide();
        this.gate.IAM.remove(this.gate.id);
        this.IAM.remove(this.id);
    }
}

class FloorItem3D {
    constructor(grid, type, h = 0) {
        this.grid = grid;
        this.type = type;
        this.h = h;
        this.interactive = true;
        this.active = true;
        for (const prop in type) {
            this[prop] = type[prop];
        }
        //unpack
        this.element = ELEMENT[this.element];
        this.texture = TEXTURE[this.texture];
        if (typeof (this.scale) === "number") {
            this.scale = new Float32Array([this.scale, this.scale, this.scale]);
        }
        this.byte_length = this.element.indices.length * 2;
        this.indices = this.element.indices.length;
        //transpose
        let heightTranspose = new Float32Array([0, 0, 0]);
        if (this.glueToFloor) {
            let max = ELEMENT.getMinY(this.element);
            heightTranspose[1] -= max * this.scale[1];

        }
        let transpose = new Vector3(grid.x, h, grid.y);
        transpose = transpose.add(Vector3.from_array(heightTranspose));
        this.transpose = transpose.array;
        this.Y = this.transpose[1];
        //value
        if (this.category === "gold") {
            this.value = RND(this.minVal, this.maxVal);
        }
    }
    interact(GA, inventory) {
        console.log(this, "interaction", this.category);
        this.active = false;
        return {
            category: this.category,
            value: this.value,
            color: this.color,
            inventorySprite: this.inventorySprite
        };
    }
}

/** Utility functions */

const FaceToOffset = function (face, E = 0) {
    let x, y;
    switch (face) {
        case "FRONT":
            x = 0.5;
            y = 1.0 + E;
            break;
        case "BACK":
            x = 0.5;
            y = 0.0 - E;
            break;
        case "LEFT":
            x = 0.0 - E;
            y = 0.5;
            break;
        case "RIGHT":
            x = 1.0 + E;
            y = 0.5;
            break;
        default:
            console.error("FaceToVector, invalid face", face);
            break;
    }
    return new FP_Grid(x, y);
};

/** Elements */

const ELEMENT = {
    getMinY(element) {
        let max = Infinity;
        for (let i = 0; i < element.positions.length; i += 3) {
            if (element.positions[i + 1] < max) {
                max = element.positions[i + 1];
            }
        }
        return max;
    },
    FRONT_FACE: {
        positions: [0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0,],
        indices: [0, 1, 2, 0, 2, 3],
        textureCoordinates: [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0],
        vertexNormals: [0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0]
    },
    BACK_FACE: {
        positions: [0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,],
        indices: [0, 1, 2, 0, 2, 3],
        textureCoordinates: [1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,],
        vertexNormals: [0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0]
    },
    RIGHT_FACE: {
        positions: [1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0,],
        indices: [0, 1, 2, 0, 2, 3],
        textureCoordinates: [1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,],
        vertexNormals: [1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,]
    },
    LEFT_FACE: {
        positions: [0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0],
        indices: [0, 1, 2, 0, 2, 3],
        textureCoordinates: [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0],
        vertexNormals: [-1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,],
    },
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
        ],
        //hidden: new Float32Array(72).fill(-10.0),
        hidden: new Float32Array(72),
    },
    CUBE_CENTERED: {
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
        ],
    },
    BAR: {
        positions: [
            // Front face
            -1.0, -0.5, 0.5, 1.0, -0.5, 0.5, 0.8, 0.5, 0.4, -0.8, 0.5, 0.4,

            // Back face
            -1.0, -0.5, -0.5, -0.8, 0.5, -0.4, 0.8, 0.5, -0.4, 1.0, -0.5, -0.5,

            // Top face
            -0.8, 0.5, -0.4, -0.8, 0.5, 0.4, 0.8, 0.5, 0.4, 0.8, 0.5, -0.4,

            // Bottom face
            -1.0, -0.5, -0.5, 1.0, -0.5, -0.5, 1.0, -0.5, 0.5, -1.0, -0.5, 0.5,

            // Right face
            1.0, -0.5, -0.5, 0.8, 0.5, -0.4, 0.8, 0.5, 0.4, 1.0, -0.5, 0.5,

            // Left face
            -1.0, -0.5, -0.5, -1.0, -0.5, 0.5, -0.8, 0.5, 0.4, -0.8, 0.5, -0.4,
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
        ],
    },
    hidden: new Float32Array(72),
    //hidden: new Float32Array(72).fill(-10.0),
};

//END
console.log(`%cWebGL ${WebGL.VERSION} loaded.`, WebGL.CSS);