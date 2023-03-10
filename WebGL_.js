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
 * STUDY:
 * https://glmatrix.net/docs/
 * https://thebookofshaders.com/
 * https://webglfundamentals.org/webgl/lessons/resources/webgl-state-diagram.html
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
 * 
 * https://www.3dgep.com/simulating-particle-effects-using-opengl/
 * http://nehe.gamedev.net/tutorial/particle_engine_using_triangle_strips/21001/
 * https://webglfundamentals.org/webgl/lessons/webgl-qna-efficient-particle-system-in-javascript---webgl-.html
 * https://registry.khronos.org/webgl/sdk/demos/google/resources/o3djs/particles.js
 * https://registry.khronos.org/webgl/sdk/demos/google/particles/index.html
 * 
 * https://www.chinedufn.com/webgl-particle-effect-billboard-tutorial/
 * https://gpfault.net/posts/webgl2-particles.txt.html
 * 
 * https://www.youtube.com/watch?v=PWjIeJDE7Rc
 * https://youtu.be/PWjIeJDE7Rc?t=844
 * https://youtu.be/PWjIeJDE7Rc?t=1672
 * https://youtu.be/PWjIeJDE7Rc?t=2340
 * https://www.youtube.com/watch?v=OYYZQ1yiXO
 * https://www.youtube.com/watch?v=sMQz3plUUG4
 * 
 * https://github.com/sketchpunk/FunWithWebGL2
 * https://webgl2fundamentals.org/webgl/lessons/webgl-gpgpu.html
 * 
 * https://www.youtube.com/watch?v=ro4bDXcISms
 * 
 * https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#properties-reference
 * https://github.com/KhronosGroup/glTF/tree/main/specification/2.0
 * https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0
 * https://raw.githubusercontent.com/javagl/JglTF/master/images/gltfOverview-0.2.0.png
 * https://github.com/mattdesl/gl-constants/blob/master/1.0/numbers.js
 * https://youtu.be/cWo-sghCp8Y?t=4559
 * https://github.khronos.org/glTF-Tutorials/gltfTutorial/gltfTutorial_001_Introduction.html
 * https://toji.github.io/webgpu-gltf-case-study/
 */

const WebGL = {
    VERSION: "0.20.1",
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
        DYNAMIC_LIGHTS_RESERVATION: 8,
        EXPLOSION_N_PARTICLES: 25000,
        EXPLOSION_DURATION_MS: 2000,
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
    staticDecalList: [DECAL3D, LIGHTS3D, BUMP3D],
    interactiveDecalList: [INTERACTIVE_DECAL3D],
    dynamicDecalList: [GATE3D, ITEM3D],
    dynamicLightSources: [MISSILE3D, EXPLOSION3D],
    models: [$3D_MODEL],
    explosion_program: {
        transform: {
            vSource: "particle_transform_vShader",
            fSource: "particle_transform_fShader",
            transformFeedback: ["o_offset", "o_velocity", "o_age", "o_ageNorm"],
            program: null,
        },
        render: {
            vSource: "particle_render_vShader",
            fSource: "particle_render_fShader",
            transformFeedback: null,
            program: null,
        }
    },
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
        this.initParticlePrograms(gl);
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
        MISSILE3D.init(map);
        INTERACTIVE_DECAL3D.init(map);
        BUMP3D.init(map);
        INTERACTIVE_DECAL3D.init(map);

        if (this.VERBOSE) {
            console.log("DECAL3D", DECAL3D);
            console.log("LIGHTS3D", LIGHTS3D);
            console.log("GATE3D", GATE3D);
            console.log("VANISHING3D", VANISHING3D);
            console.log("ITEM3D", ITEM3D);
            console.log("INTERACTIVE_DECAL3D", INTERACTIVE_DECAL3D);
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
        for (const iam of [...WebGL.staticDecalList, ...WebGL.dynamicDecalList, ...WebGL.interactiveDecalList]) {
            for (const decal of iam.POOL) {
                decal.texture = this.createTexture(decal.texture);
            }
        }
        for (const obj of [...WebGL.models]) {
            for (const [_, O] of Object.entries(obj)) {
                O.textures = O.textures.map(T => this.createTexture(T));
            }
        }
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
        SHADER.fShader = SHADER.fShader.replace("N_LIGHTS = 1", `N_LIGHTS = ${LIGHTS3D.POOL.length + this.INI.DYNAMIC_LIGHTS_RESERVATION}`);
    },
    initParticlePrograms(gl) {
        const particleType = ["explosion"];
        const shaderType = ["transform", "render"];
        for (let PT of particleType) {
            let prog = `${PT}_program`;
            for (let ST of shaderType) {
                const vSource = SHADER[this[prog][ST].vSource];
                const fSource = SHADER[this[prog][ST].fSource];
                const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vSource);
                const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fSource);
                const shaderProgram = gl.createProgram();
                gl.attachShader(shaderProgram, vertexShader);
                gl.attachShader(shaderProgram, fragmentShader);

                if (this[prog][ST].transformFeedback) {
                    gl.transformFeedbackVaryings(shaderProgram, this[prog][ST].transformFeedback, gl.SEPARATE_ATTRIBS);
                }

                gl.linkProgram(shaderProgram);
                if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                    console.error(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
                    return null;
                }
                this[prog][ST].program = shaderProgram;
            }
        }
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
                uScale: gl.getUniformLocation(shaderProgram, "uScale"),
                uTranslate: gl.getUniformLocation(shaderProgram, "uTranslate"),
                uRotY: gl.getUniformLocation(shaderProgram, "uRotateY"),
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
                lights: gl.getUniformLocation(shaderProgram, "uPointLights"),
                uScale: gl.getUniformLocation(shaderProgram, "uScale"),
                uTranslate: gl.getUniformLocation(shaderProgram, "uTranslate"),
                uShine: gl.getUniformLocation(shaderProgram, "uShine"),
                uLS: gl.getUniformLocation(shaderProgram, "uLS"),
                uLightColor: gl.getUniformLocation(shaderProgram, "uLightColor"),
                uItemPosition: gl.getUniformLocation(shaderProgram, "uItemPosition"),
                lightColors: gl.getUniformLocation(shaderProgram, "uLightColors"),
                uRotY: gl.getUniformLocation(shaderProgram, "uRotateY"),
            },
        };

        this.program = programInfo;
    },
    renderScene() {
        const gl = this.CTX;
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.enable(gl.CULL_FACE);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        //scene
        const viewMatrix = glMatrix.mat4.create();
        const cameratarget = this.camera.pos.translate(this.camera.dir);
        glMatrix.mat4.lookAt(viewMatrix, this.camera.pos.array, cameratarget.array, [0.0, 1.0, 0.0]);
        this.viewMatrix = viewMatrix;

        // identity placeholders & and defaults
        const defaultShininess = 128.0 * 0.10;
        const translationMatrix = glMatrix.mat4.create();
        const scaleMatrix = glMatrix.mat4.create();
        const rotateY = glMatrix.mat4.create();

        gl.useProgram(this.program.program);
        // Set the uniform matrices
        gl.uniformMatrix4fv(this.program.uniformLocations.projectionMatrix, false, this.projectionMatrix);
        gl.uniformMatrix4fv(this.program.uniformLocations.modelViewMatrix, false, viewMatrix);
        gl.uniform3fv(this.program.uniformLocations.cameraPos, this.camera.pos.array);
        gl.uniformMatrix4fv(this.program.uniformLocations.uScale, false, scaleMatrix);
        gl.uniformMatrix4fv(this.program.uniformLocations.uTranslate, false, translationMatrix);
        gl.uniform1f(this.program.uniformLocations.uShine, defaultShininess);
        gl.uniformMatrix4fv(this.program.uniformLocations.uRotY, false, rotateY);

        //light uniforms
        let lights = [];
        let lightColors = [];
        for (let L = 0; L < LIGHTS3D.POOL.length; L++) {
            lights.push(...LIGHTS3D.POOL[L].position.array);
            lightColors.push(...LIGHTS3D.POOL[L].lightColor);
        }


        let dynLights = [];
        let dynLightColors = [];
        let dynCount = 0;
        let cont = true;
        for (let iam of this.dynamicLightSources) {
            for (let LS of iam.POOL) {
                if (!LS) continue;
                dynLights.push(...LS.pos.array);
                dynLightColors.push(...LS.lightColor);
                dynCount++;
                if (dynCount > this.INI.DYNAMIC_LIGHTS_RESERVATION) {
                    console.error("Dynamic light sources exceed reserved memory! Ignoring silently.");
                    cont = false;
                    break;
                }
            }
            if (!cont) break;
        }

        while (dynLights.length < this.INI.DYNAMIC_LIGHTS_RESERVATION * 3) {
            dynLights.push(-1, -1, -1);
            dynLightColors.push(0, 0, 0);
        }

        lights.push(...dynLights);
        lightColors.push(...dynLightColors);

        gl.uniform3fv(this.program.uniformLocations.lights, new Float32Array(lights));
        gl.uniform3fv(this.program.uniformLocations.lightColors, new Float32Array(lightColors));

        //pickProgram uniforms and defaults
        gl.useProgram(this.pickProgram.program);
        gl.uniformMatrix4fv(this.pickProgram.uniformLocations.projectionMatrix, false, this.projectionMatrix);
        gl.uniformMatrix4fv(this.pickProgram.uniformLocations.modelViewMatrix, false, viewMatrix);
        gl.uniformMatrix4fv(this.pickProgram.uniformLocations.uScale, false, scaleMatrix);
        gl.uniformMatrix4fv(this.pickProgram.uniformLocations.uTranslate, false, translationMatrix);
        gl.uniformMatrix4fv(this.pickProgram.uniformLocations.uRotY, false, rotateY);

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
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

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

        //interactive decals
        for (const iam of WebGL.interactiveDecalList) {
            for (const decal of iam.POOL) {
                gl.bindTexture(gl.TEXTURE_2D, decal.texture);
                gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, (this.world.offset.decal_start + decalCount * 6) * 2);

                //to texture
                let id_vec = this.idToVec(decal.global_id);
                gl.useProgram(this.pickProgram.program);
                gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
                gl.uniform4fv(this.pickProgram.uniformLocations.id, new Float32Array(id_vec));
                gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, (this.world.offset.decal_start + decalCount * 6) * 2);

                //back to canvas
                gl.useProgram(this.program.program);
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                //end
                decalCount++;
            }
        }

        //existing doors
        for (const door of GATE3D.POOL) {
            if (door) {
                const mTranslationmatrix = glMatrix.mat4.create();
                glMatrix.mat4.fromTranslation(mTranslationmatrix, door.pos.array);
                gl.uniformMatrix4fv(this.program.uniformLocations.uTranslate, false, mTranslationmatrix);
                gl.bindTexture(gl.TEXTURE_2D, door.texture);
                gl.drawElements(gl.TRIANGLES, door.indices, gl.UNSIGNED_SHORT, this.world.offset[door.start] * 2);

                // to texture 
                let id_vec = this.idToVec(door.global_id);
                gl.useProgram(this.pickProgram.program);
                gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
                gl.uniform4fv(this.pickProgram.uniformLocations.id, new Float32Array(id_vec));
                gl.uniformMatrix4fv(this.pickProgram.uniformLocations.uTranslate, false, mTranslationmatrix);
                gl.drawElements(gl.TRIANGLES, door.indices, gl.UNSIGNED_SHORT, this.world.offset[door.start] * 2);

                //back to canvas
                gl.useProgram(this.program.program);
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            }
        }

        //items
        for (const item of ITEM3D.POOL) {
            if (item.active) {
                const mScaleMatrix = glMatrix.mat4.create();
                glMatrix.mat4.fromScaling(mScaleMatrix, item.scale);
                const mTranslationmatrix = glMatrix.mat4.create();
                glMatrix.mat4.fromTranslation(mTranslationmatrix, item.translate);
                gl.uniformMatrix4fv(this.program.uniformLocations.uScale, false, mScaleMatrix);
                gl.uniformMatrix4fv(this.program.uniformLocations.uTranslate, false, mTranslationmatrix);
                gl.uniform1f(this.program.uniformLocations.uShine, item.shine);
                gl.uniformMatrix4fv(this.program.uniformLocations.uRotY, false, item.rotationY);
                gl.bindTexture(gl.TEXTURE_2D, item.texture);
                gl.drawElements(gl.TRIANGLES, item.indices, gl.UNSIGNED_SHORT, this.world.offset[item.start] * 2);

                // to texture 
                let id_vec = this.idToVec(item.global_id);
                gl.useProgram(this.pickProgram.program);
                gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
                gl.uniform4fv(this.pickProgram.uniformLocations.id, new Float32Array(id_vec));
                gl.uniformMatrix4fv(this.pickProgram.uniformLocations.uScale, false, mScaleMatrix);
                gl.uniformMatrix4fv(this.pickProgram.uniformLocations.uTranslate, false, mTranslationmatrix);
                gl.uniformMatrix4fv(this.pickProgram.uniformLocations.uRotY, false, item.rotationY);
                gl.drawElements(gl.TRIANGLES, item.indices, gl.UNSIGNED_SHORT, this.world.offset[item.start] * 2);

                //back to canvas
                gl.useProgram(this.program.program);
                gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            }
        }

        //missile
        for (const missile of MISSILE3D.POOL) {
            if (missile) {
                const mScaleMatrix = glMatrix.mat4.create();
                glMatrix.mat4.fromScaling(mScaleMatrix, missile.scale);
                const mTranslationmatrix = glMatrix.mat4.create();
                glMatrix.mat4.fromTranslation(mTranslationmatrix, missile.pos.array);
                gl.uniformMatrix4fv(this.program.uniformLocations.uScale, false, mScaleMatrix);
                gl.uniformMatrix4fv(this.program.uniformLocations.uTranslate, false, mTranslationmatrix);
                gl.uniform1f(this.program.uniformLocations.uShine, missile.shine);
                gl.bindTexture(gl.TEXTURE_2D, missile.texture);
                gl.drawElements(gl.TRIANGLES, missile.indices, gl.UNSIGNED_SHORT, this.world.offset[missile.start] * 2);
            }
        }

        //explosion
        for (const explosion of EXPLOSION3D.POOL) {
            if (explosion) {
                explosion.draw(gl);
            }
        }

        //remember: last draw was on particle renderer!!!

    },
    idToVec(id) {
        return [((id >> 0) & 0xFF) / 0xFF, ((id >> 8) & 0xFF) / 0xFF, ((id >> 16) & 0xFF) / 0xFF, ((id >> 24) & 0xFF) / 0xFF];
    },

    /** buffer manipulation, unused, keep for information */
    /*
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
    */

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
            $(WebGL.DATA.layer).on("mousemove", { layer: WebGL.DATA.layer }, ENGINE.readMouse);
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
                    //console.warn("id", id);
                    if (id <= 0) return;
                    const obj = GLOBAL_ID_MANAGER.getObject(id);
                    if (!obj) return;
                    if (!obj.interactive) return;
                    //console.log("obj", obj, obj.grid, obj.constructor.name);
                    let PPos2d = Vector3.to_FP_Grid(hero.player.pos);
                    let itemGrid = obj.grid;
                    if (obj.constructor.name === "Gate") {
                        itemGrid = Grid.toCenter(obj.grid);
                    }
                    let distance = PPos2d.EuclidianDistance(itemGrid);
                    //console.log("distance", distance);
                    if (distance < WebGL.INI.INTERACT_DISTANCE) {
                        return obj.interact(hero.player.GA, hero.inventory);
                    }
                }
            }
        }
    }
};

const RAY = {
    /*
        raycast related utility functions
    */
    INI: {
        NO_SOUND: 8,
        NORMAL_SOUND: 2
    },
    volume(distance) {
        let ratio = (RAY.INI.NO_SOUND - RAY.INI.NORMAL_SOUND - (distance - RAY.INI.NORMAL_SOUND)) / (RAY.INI.NO_SOUND - RAY.INI.NORMAL_SOUND);
        ratio = Math.min(Math.max(0, ratio), 1);
        return ratio;
    }
};

const WORLD = {
    bufferTypes: ["positions", 'indices', "textureCoordinates", "vertexNormals"],
    objectTypes: ["wall", "floor", "ceil", "decal"],
    init(object_types) {
        for (let O of object_types) {
            this.objectTypes.push(O);
        }
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
            case "portal":
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
        if (decal.category === "crest" && decal.expand) {
            resolution = this.divineResolution(decal.texture);
        }
        const [leftX, rightX, topY, bottomY] = this.getBoundaries(decal.category, decal.texture.width, decal.texture.height, resolution);
        const E = ELEMENT[`${decal.face}_FACE`];

        let positions = E.positions.slice();
        let indices = E.indices.slice();
        let textureCoordinates = E.textureCoordinates.slice();
        let vertexNormals = E.vertexNormals.slice();


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
            case "TOP":
                positions[0] = leftX;
                positions[2] = bottomY;
                positions[3] = rightX;
                positions[5] = bottomY;
                positions[6] = rightX;
                positions[8] = topY;
                positions[9] = leftX;
                positions[11] = topY;
                for (let y of [1, 4, 7, 10]) {
                    positions[y] += WebGL.INI.PIC_OUT - 1.0;
                }
                break;
            case "BOTTOM":
                positions[0] = leftX;
                positions[2] = bottomY;
                positions[3] = rightX;
                positions[5] = bottomY;
                positions[6] = rightX;
                positions[8] = topY;
                positions[9] = leftX;
                positions[11] = topY;
                for (let y of [1, 4, 7, 10]) {
                    positions[y] -= WebGL.INI.PIC_OUT - 1.0;
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

        this[type].positions.push(...positions);
        this[type].indices.push(...indices);
        this[type].textureCoordinates.push(...textureCoordinates);
        this[type].vertexNormals.push(...vertexNormals);

    },
    addCube(Y, grid, type) {
        return this.addElement(ELEMENT.CUBE, Y, grid, type);
    },
    addElement(E, Y, grid, type, scale = null) {
        let positions = E.positions.slice();
        let indices = E.indices.slice();
        let textureCoordinates = E.textureCoordinates.slice();
        let vertexNormals = E.vertexNormals.slice();

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

        this[type].positions.push(...positions);
        this[type].indices.push(...indices);
        this[type].textureCoordinates.push(...textureCoordinates);
        this[type].vertexNormals.push(...vertexNormals);
    },
    reserveObject(E, type) {
        let positions = E.positions.slice();
        let indices = E.indices.slice();
        let textureCoordinates = E.textureCoordinates.slice();
        let vertexNormals = E.vertexNormals.slice();

        //indices
        indices = indices.map(e => e + (this[type].positions.length / 3));

        this[type].positions.push(...positions);
        this[type].indices.push(...indices);
        this[type].textureCoordinates.push(...textureCoordinates);
        this[type].vertexNormals.push(...vertexNormals);
    },
    build(map, object_map, Y = 0) {
        const GA = map.GA;
        console.time("WorldBuilding");
        this.init(object_map);

        for (let [index, value] of GA.map.entries()) {
            let grid = GA.indexToGrid(index);
            value &= (2 ** GA.gridSizeBit - 1 - (MAPDICT.FOG + MAPDICT.RESERVED));
            switch (value) {
                case MAPDICT.EMPTY:
                case MAPDICT.WALL + MAPDICT.DOOR:
                    this.addCube(Y - 1, grid, "floor");
                    this.addCube(Y + 1, grid, "ceil");
                    break;
                case MAPDICT.WALL:
                case MAPDICT.WALL + MAPDICT.STAIR:
                case MAPDICT.WALL + MAPDICT.SHRINE:
                    this.addCube(Y, grid, "wall");
                    break;
                default:
                    console.error("world building GA value error", value);
            }
        }

        /** build static decals */
        for (const iam of [...WebGL.staticDecalList, ...WebGL.interactiveDecalList]) {
            for (const decal of iam.POOL) {
                this.addPic(Y, decal, "decal");
            }
        }
        /** static decal end */

        /** object map */
        for (let element of object_map) {
            this.reserveObject(ELEMENT[element], element);
        }

        /** object map end*/

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
        let bump = this.usingStaircase(nextPos);
        if (bump !== null) {
            bump.interact(this);
            return;
        }

        if (this.bumpEnemy(nextPos)) return;
        let check = this.GA.entityNotInWall(nextPos, Vector3.to_FP_Vector(dir), this.r);

        if (check) {
            this.pos = nextPos3;
        }
    }
    strafe(rotDirection, lapsedTime) {
        let length = (lapsedTime / 1000) * this.moveSpeed;
        let dir = Vector3.from_2D_dir(this.dir.rotate2D((rotDirection * Math.PI) / 2), this.dir.y);
        let nextPos3 = this.pos.translate(dir, length);
        let nextPos = Vector3.to_FP_Grid(nextPos3);
        let bump = this.usingStaircase(nextPos);
        if (bump !== null) {
            bump.interact(this);
            return;
        }

        if (this.bumpEnemy(nextPos)) return;
        let check = this.GA.entityNotInWall(nextPos, Vector3.to_FP_Vector(dir), this.r);
        if (check) {
            this.pos = nextPos3;
        }
    }
    usingStaircase(nextPos, resolution = 4) {
        let currentGrid = Grid.toClass(Vector3.to_FP_Grid(this.pos));
        let dir = Vector3.to_FP_Vector(this.dir);
        let checks = [];
        for (let theta = 0; theta < 2 * Math.PI; theta += (2 * Math.PI) / resolution) {
            checks.push(nextPos.translate(dir.rotate(theta), this.r));
        }

        for (const point of checks) {
            let futureGrid = Grid.toClass(point);
            if (GRID.same(futureGrid, currentGrid)) {
                continue;
            } else {
                if (this.GA.isWall(futureGrid) && this.GA.isStair(futureGrid)) {
                    let IA = this.map.decalIA3D;
                    let item = BUMP3D.POOL[IA.unroll(futureGrid)[0] - 1];
                    return item;
                }
            }
        }
        return null;
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
    constructor(grid, face, texture, category, name, expand = false) {
        super(grid, face, texture, category, name);
        this.expand = expand;
        this.type = "StaticDecal";
        this.interactive = false;
    }
}

class LightDecal extends Decal {
    constructor(grid, face, texture, category, name, lightColor) {
        super(grid, face, texture, category, name);
        this.lightColor = lightColor;
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

class Portal extends Decal {
    constructor(grid, face, texture, category, name, destination) {
        super(grid, face, texture, category, name);
        this.type = "Portal";
        this.interactive = false;
        this.destination = destination;
        this.texture = texture;
    }
    interact(hero) {
        let start_dir = FaceToDirection(this.destination.face);
        let start_grid = this.destination.grid.add(start_dir);
        start_grid = Vector3.from_Grid(Grid.toCenter(start_grid), 0.5);
        hero.setPos(start_grid);
        hero.setDir(Vector3.from_2D_dir(start_dir));

        if (GAME.level !== this.destination.level) {
            console.error("Moving between levels not yet implemented!!");
            //TODO, FIXME
            // bind new map
            // stores IAMs
            //... 

            throw "GAME DIES!";
        }
    }
}

class Destination {
    constructor(grid, face, level) {
        this.grid = Grid.toClass(grid);
        this.face = face;
        this.level = level;
    }
}

class Gate {
    constructor(grid, type) {
        this.grid = grid;
        this.pos = Vector3.from_Grid(grid);
        this.type = type;
        this.interactive = true;
        for (const prop in type) {
            this[prop] = type[prop];
        }
        this.start = `${this.element}_start`;
        this.texture = TEXTURE[this.texture];
        this.element = ELEMENT[this.element];
        this.indices = this.element.indices.length;
    }
    lift() {
        let gate = new LiftingGate(this);
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
    constructor(gate) {
        this.gate = gate;
    }
    manage(lapsedTime) {
        const DOOR_LIFTING_SPEED = 0.60;
        const dY = DOOR_LIFTING_SPEED * lapsedTime / 1000;
        this.lift(dY);
        if (this.done()) this.remove();
    }
    lift(dY) {
        this.gate.pos = this.gate.pos.add(new Vector3(0, dY, 0));
    }
    done() {
        return this.gate.pos.y > 1.0;
    }
    remove() {
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
        this.start = `${this.element}_start`;
        //unpack
        this.element = ELEMENT[this.element];
        this.texture = TEXTURE[this.texture];
        if (typeof (this.scale) === "number") {
            this.scale = new Float32Array([this.scale, this.scale, this.scale]);
        }
        this.indices = this.element.indices.length;
        //translate
        let heightTranslate = new Float32Array([0, 0, 0]);
        if (this.glueToFloor) {
            let max = ELEMENT.getMinY(this.element);
            heightTranslate[1] -= max * this.scale[1];

        }
        let translate = new Vector3(grid.x, h, grid.y);
        translate = translate.add(Vector3.from_array(heightTranslate));
        this.translate = translate.array;
        this.Y = this.translate[1];
        //value
        if (this.category === "gold") {
            this.value = RND(this.minVal, this.maxVal);
        }
        //random rotation
        let randomRotation = RND(0, 359);
        randomRotation = Math.radians(randomRotation);
        let identity = glMatrix.mat4.create();
        glMatrix.mat4.rotate(identity, identity, randomRotation, [0, 1, 0]);
        this.rotationY = identity;
    }
    interact(GA, inventory) {
        //console.log(this, "interaction", this.category);
        this.active = false;
        return {
            category: this.category,
            value: this.value,
            color: this.color,
            inventorySprite: this.inventorySprite,
            which: this.which,
            pos: this.translate,
        };
    }
}

class WallFeature3D {
    constructor(grid, face, type) {
        this.interactive = true;
        this.active = true;
        this.grid = grid;
        this.face = face;
        for (const prop in type) {
            this[prop] = type[prop];
        }
        this.texture = SPRITE[this.sprite];
    }
}

/** Particle classes */

class ParticleEmmiter {
    constructor(position, texture) {
        this.gl = WebGL.CTX;
        this.pos = position;
        this.birth = Date.now();
        this.age = 0;
        this.duration = null;
        this.currentIndex = 0;
        this.texture = WebGL.createTexture(texture);
    }
    update(date) {
        this.normalized_age = (date - this.birth) / this.duration;
    }
    build(number) {
        const gl = this.gl;
        let start_index = RND(0, UNIFORM.INI.MAX_N_PARTICLES - number);

        this.readFeedback = [gl.createVertexArray(), gl.createVertexArray()];
        this.writeFeedback = [gl.createTransformFeedback(), gl.createTransformFeedback()];

        //location
        let location_data = UNIFORM.spherical_locations.slice(start_index * 3, (start_index + number) * 3);
        this.bOffset = [gl.createBuffer(), gl.createBuffer()];
        let locOffset = 0;

        //velocity
        let velocity_data = UNIFORM.spherical_directions.slice(start_index * 3, (start_index + number) * 3);
        this.bVelocity = [gl.createBuffer(), gl.createBuffer()];
        const locVelocity = 1;

        //age
        let age_data = new Float32Array(number);
        let age = Date.now() - this.birth;
        age_data.fill(age);
        this.bAge = [gl.createBuffer(), gl.createBuffer()];
        const locAge = 2;

        //ageNorm
        let age_norm_data = new Float32Array(number);
        this.bAgeNorm = [gl.createBuffer(), gl.createBuffer()];
        let locAgeNorm = 3;

        //life
        let life_data = [];
        for (let c = 0; c < number; c++) {
            life_data.push(RND(Math.floor(this.duration * 0.85), this.duration));
        }
        this.bLife = [gl.createBuffer(), gl.createBuffer()];
        const locLife = 4;

        for (let i = 0; i < 2; i++) {

            gl.bindVertexArray(this.readFeedback[i]);

            //location offsets
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bOffset[i]);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(location_data), gl.DYNAMIC_COPY);
            gl.vertexAttribPointer(locOffset, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(locOffset);

            //velocity_offsets
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bVelocity[i]);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(velocity_data), gl.DYNAMIC_COPY);
            gl.vertexAttribPointer(locVelocity, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(locVelocity);

            //age buffers
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bAge[i]);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(age_data), gl.DYNAMIC_COPY);
            gl.vertexAttribPointer(locAge, 1, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(locAge);

            //age_norm_buffers
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bAgeNorm[i]);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(age_norm_data), gl.DYNAMIC_COPY);
            gl.vertexAttribPointer(locAgeNorm, 1, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(locAgeNorm);

            //life buffers
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bLife[i]);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(life_data), gl.STATIC_DRAW);
            gl.vertexAttribPointer(locLife, 1, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(locLife);

            //clean
            gl.bindVertexArray(null);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);

            //Setup Transform Feedback
            gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, this.writeFeedback[i]);
            gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, locOffset, this.bOffset[i]);
            gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, locVelocity, this.bVelocity[i]);
            gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, locAge, this.bAge[i]);
            gl.bindBufferBase(gl.TRANSFORM_FEEDBACK_BUFFER, locAgeNorm, this.bAgeNorm[i]);
            gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);
        }

        //Render VAO
        this.vaoRender = [gl.createVertexArray(), gl.createVertexArray()];

        //index
        this.bIndex = gl.createBuffer();
        this.aIndex = new Uint16Array([0, 1, 2, 2, 3, 0]);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bIndex);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.aIndex, gl.STATIC_DRAW);
        this.vaoCount = this.aIndex.length;

        //vertices
        this.bVertices = gl.createBuffer();
        this.aVertices = new Float32Array([
            -0.025, -0.025, 0.0,
            0.025, -0.025, 0.0,
            0.025, 0.025, 0.0,
            -0.025, 0.025, 0.0,
        ]);

        const locVert = 0;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bVertices);
        gl.bufferData(gl.ARRAY_BUFFER, this.aVertices, gl.STATIC_DRAW);

        //UVs
        this.bUV = gl.createBuffer();
        this.aUV = new Float32Array([
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0
        ]);
        const locUV = 1;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.bUV);
        gl.bufferData(gl.ARRAY_BUFFER, this.aUV, gl.STATIC_DRAW);

        //Setup VAOs for Rendering
        locOffset = 2;
        locAgeNorm = 3;
        for (let i = 0; i < 2; i++) {

            gl.bindVertexArray(this.vaoRender[i]);

            //INDEX
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bIndex);

            //VERTICES
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bVertices);
            gl.vertexAttribPointer(locVert, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(locVert);

            //UVs
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bUV);
            gl.vertexAttribPointer(locUV, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(locUV);

            //OFFSET
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bOffset[i]);
            gl.vertexAttribPointer(locOffset, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(locOffset);
            gl.vertexAttribDivisor(locOffset, 1); //instanced

            //AGE NORM
            gl.bindBuffer(gl.ARRAY_BUFFER, this.bAgeNorm[i]);
            gl.vertexAttribPointer(locAgeNorm, 1, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(locAgeNorm);
            gl.vertexAttribDivisor(locAgeNorm, 1); //instanced

            //CLEANUP
            gl.bindVertexArray(null);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
        }
    }
    draw(gl) {
        const transform_program = WebGL.explosion_program.transform.program;
        gl.useProgram(transform_program);

        //uniforms
        let u_time = gl.getUniformLocation(transform_program, "u_time");
        let time_now = Date.now() - this.birth;
        gl.uniform1f(u_time, time_now);
        const u_velocity_factor = gl.getUniformLocation(transform_program, "uVelocityFactor");
        gl.uniform1f(u_velocity_factor, this.velocity);
        const u_gravity = gl.getUniformLocation(transform_program, "uGravity");
        gl.uniform3fv(u_gravity, this.gravity);
        //

        const nextIndex = (this.currentIndex + 1) % 2;
        let vaoTFRead = this.readFeedback[this.currentIndex];
        let vaoTFWrite = this.writeFeedback[nextIndex];

        gl.bindVertexArray(vaoTFRead);										        //READ FROM
        gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, vaoTFWrite);		        //WRITE TO
        gl.enable(gl.RASTERIZER_DISCARD);							                //Disable Fragment Shader

        gl.beginTransformFeedback(gl.POINTS);					                    //Begin Feedback Process
        gl.drawArrays(gl.POINTS, 0, this.number);	                                //Execute Feedback Shader.
        gl.endTransformFeedback();									                //End Feedback Process

        gl.disable(gl.RASTERIZER_DISCARD);							                //Enable Fragment Shader
        gl.bindTransformFeedback(gl.TRANSFORM_FEEDBACK, null);			            //Clear out which feedback is bound

        //render
        const render_program = WebGL.explosion_program.render.program;
        gl.useProgram(render_program);
        gl.disable(gl.CULL_FACE);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

        //render uniforms
        const projection_matrix = gl.getUniformLocation(render_program, "uProjectionMatrix");
        gl.uniformMatrix4fv(projection_matrix, false, WebGL.projectionMatrix);
        const modelViewMatrix = gl.getUniformLocation(render_program, "uModelViewMatrix");
        gl.uniformMatrix4fv(modelViewMatrix, false, WebGL.viewMatrix);
        const expCenter = gl.getUniformLocation(render_program, "uExpCenter");
        gl.uniform3fv(expCenter, this.pos.array);
        const u_scale = gl.getUniformLocation(render_program, "uScale");
        gl.uniform1f(u_scale, this.scale);
        const u_rounded = gl.getUniformLocation(render_program, "uRounded");
        gl.uniform1i(u_rounded, this.rounded);
        // uniform end

        gl.bindVertexArray(this.vaoRender[nextIndex]);
        gl.activeTexture(gl.TEXTURE0);
        const u_sampler = gl.getUniformLocation(render_program, "uSampler");
        gl.uniform1i(u_sampler, 0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.drawElementsInstanced(gl.TRIANGLES, this.vaoCount, gl.UNSIGNED_SHORT, 0, this.number);

        //cleanup
        gl.bindVertexArray(null);
        this.currentIndex = nextIndex;
    }
}

class ParticleExplosion extends ParticleEmmiter {
    constructor(position, texture = TEXTURE.Explosion, number = WebGL.INI.EXPLOSION_N_PARTICLES) {
        super(position, texture);
        this.number = number;
        this.duration = WebGL.INI.EXPLOSION_DURATION_MS;
        this.build(number);
        this.lightColor = colorStringToVector("#FF3300");
        this.scale = 0.5;
        this.gravity = new Float32Array([0, 0.0075, 0]);
        this.velocity = 0.03;
        this.rounded = 1;
        //console.log("ParticleEmmiter", this);
    }
}

class BloodExplosion extends ParticleEmmiter {
    constructor(position, texture = TEXTURE.RedLiquid, number = WebGL.INI.EXPLOSION_N_PARTICLES) {
        super(position, texture);
        this.number = number;
        this.duration = WebGL.INI.EXPLOSION_DURATION_MS;
        this.build(number);
        this.lightColor = colorStringToVector("#111111");
        this.scale = 0.25;
        this.gravity = new Float32Array([0, 0.0025, 0]);
        this.velocity = 0.0075;
        this.rounded = 1;
        //console.log("ParticleEmmiter", this);
    }
}

class SmokeExplosion extends ParticleEmmiter {
    constructor(position, texture = TEXTURE.ScrapedMetal, number = WebGL.INI.EXPLOSION_N_PARTICLES) {
        super(position, texture);
        this.number = number;
        this.duration = WebGL.INI.EXPLOSION_DURATION_MS;
        this.build(number);
        this.lightColor = colorStringToVector("#111111");
        this.scale = 0.20;
        this.gravity = new Float32Array([0, -0.0025, 0]);
        this.velocity = 0.005;
        this.rounded = 1;
        //console.log("ParticleEmmiter", this);
    }
}

class WoodExplosion extends ParticleEmmiter {
    constructor(position, texture = TEXTURE.Wood1, number = WebGL.INI.EXPLOSION_N_PARTICLES) {
        super(position, texture);
        this.number = number;
        this.duration = WebGL.INI.EXPLOSION_DURATION_MS;
        this.build(number);
        this.lightColor = colorStringToVector("#111111");
        this.scale = 0.1;
        this.gravity = new Float32Array([0, 0.0005, 0]);
        this.velocity = 0.0025;
        this.rounded = 0;
        //console.log("ParticleEmmiter", this);
    }
}

/** model formats */

class $3D_Model {
    constructor(name, buffer, textures, meshes) {
        this.name = name;
        this.buffer = buffer;
        this.textures = textures;
        this.meshes = meshes;
    }
}

class $Mesh {
    constructor(name, primitives) {
        this.name = name;
        this.primitives = primitives;
    }
}

class $Primitive {
    constructor(material, indices, positions, normals, textcoord, joints, weights) {
        this.material = material;
        this.indices = indices;
        this.positions = positions;
        this.normals = normals;
        this.textcoord = textcoord;
        this.joints = joints;
        this.weights = weights;
    }
}
class $BufferData {
    constructor(data, count, type, target, min, max) {
        this.data = data;
        this.count = count;
        this.type = type;
        this.target = target;
        this.min = min;
        this.max = max;
    }
}

/** Utility functions */

const FaceToOffset = function (face, E = 0) {
    const offsets = {
        "FRONT": { x: 0.5, y: 1.0 + E },
        "BACK": { x: 0.5, y: 0.0 - E },
        "LEFT": { x: 0.0 - E, y: 0.5 },
        "RIGHT": { x: 1.0 + E, y: 0.5 }
    };
    const offset = offsets[face];
    if (!offset) {
        console.error("FaceToOffset, invalid face", face);
        return null;
    }
    return new FP_Grid(offset.x, offset.y);
};

const FaceToDirection = function (face) {
    switch (face) {
        case "FRONT":
            return DOWN;
        case "BACK":
            return UP;
        case "LEFT":
            return LEFT;
        case "RIGHT":
            return RIGHT;
        default:
            console.error("FaceToDirection, invalid face", face);
    }
};

/** Elements */

const ELEMENT = {
    getMinY(element) {
        let minY = Infinity;
        for (let i = 0; i < element.positions.length; i += 3) {
            if (element.positions[i + 1] < minY) {
                minY = element.positions[i + 1];
            }
        }
        return minY;
    },
    FRONT_FACE: {
        positions: [0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0],
        indices: [0, 1, 2, 0, 2, 3],
        textureCoordinates: [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0],
        vertexNormals: [0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0]
    },
    BACK_FACE: {
        positions: [0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0],
        indices: [0, 1, 2, 0, 2, 3],
        textureCoordinates: [1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,],
        vertexNormals: [0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0]
    },
    RIGHT_FACE: {
        positions: [1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0],
        indices: [0, 1, 2, 0, 2, 3],
        textureCoordinates: [1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0],
        vertexNormals: [1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0]
    },
    LEFT_FACE: {
        positions: [0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0],
        indices: [0, 1, 2, 0, 2, 3],
        textureCoordinates: [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0],
        vertexNormals: [-1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0],
    },
    TOP_FACE: {
        positions: [0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0],
        indices: [0, 2, 1, 0, 3, 2],
        textureCoordinates: [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0],
        vertexNormals: [0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0],
    },
    BOTTOM_FACE: {
        positions: [0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0],
        indices: [0, 1, 2, 0, 2, 3],
        textureCoordinates: [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0],
        vertexNormals: [0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0]
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
    },
    CUBE_SM: {
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
            0.0, 0.0, 0.1, 0.0, 0.1, 0.1, 0.0, 0.1,
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
};

const UNIFORM = {
    spherical_locations: null,
    spherical_directions: null,
    INI: {
        MAX_N_PARTICLES: 50000,
        SPHERE_R: 0.20,
        MIN_VELOCITY_FACTOR: 0.01,
        MAX_VELOCITY_FACTOR: 0.6
    },
    setup() {
        this.spherical_distributed(this.INI.MAX_N_PARTICLES, this.INI.SPHERE_R);
        console.log(`%cUNIFORM created ${this.INI.MAX_N_PARTICLES} spherical particles.`, WebGL.CSS);
    },
    spherical_distributed(N, R) {
        console.time("particles");
        this.spherical_directions = new Float32Array(N * 3);
        this.spherical_locations = new Float32Array(N * 3);

        for (let c = 0; c < N; c++) {
            let vector = glMatrix.vec3.create();
            for (let v = 0; v < 3; v++) {
                let coord = RNDF(-1, 1);
                vector[v] = coord;
            }
            glMatrix.vec3.normalize(vector, vector);
            let velocity = glMatrix.vec3.create();
            glMatrix.vec3.scale(velocity, vector, RNDF(this.INI.MIN_VELOCITY_FACTOR, this.INI.MAX_VELOCITY_FACTOR));
            let location = glMatrix.vec3.create();
            glMatrix.vec3.scale(location, vector, RNDF(0.001, R));
            let idx = c * 3;
            this.spherical_directions[idx] = velocity[0];
            this.spherical_directions[idx + 1] = velocity[1];
            this.spherical_directions[idx + 2] = velocity[2];
            this.spherical_locations[idx] = location[0];
            this.spherical_locations[idx + 1] = location[1];
            this.spherical_locations[idx + 2] = location[2];
        }
        console.timeEnd("particles");
    }
};

/** GL constants */
const GL_DATA_LENGTH = {
    SCALAR: 1,
    VEC2: 2,
    VEC3: 3,
    VEC4: 4,
    MAT2: 4,
    MAT3: 9,
    MAT4: 16,

}
const GL_CONSTANT = {
    0: 'NONE',
    1: 'ONE',
    2: 'LINE_LOOP',
    3: 'LINE_STRIP',
    4: 'TRIANGLES',
    5: 'TRIANGLE_STRIP',
    6: 'TRIANGLE_FAN',
    256: 'DEPTH_BUFFER_BIT',
    512: 'NEVER',
    513: 'LESS',
    514: 'EQUAL',
    515: 'LEQUAL',
    516: 'GREATER',
    517: 'NOTEQUAL',
    518: 'GEQUAL',
    519: 'ALWAYS',
    768: 'SRC_COLOR',
    769: 'ONE_MINUS_SRC_COLOR',
    770: 'SRC_ALPHA',
    771: 'ONE_MINUS_SRC_ALPHA',
    772: 'DST_ALPHA',
    773: 'ONE_MINUS_DST_ALPHA',
    774: 'DST_COLOR',
    775: 'ONE_MINUS_DST_COLOR',
    776: 'SRC_ALPHA_SATURATE',
    1024: 'STENCIL_BUFFER_BIT',
    1028: 'FRONT',
    1029: 'BACK',
    1032: 'FRONT_AND_BACK',
    1280: 'INVALID_ENUM',
    1281: 'INVALID_VALUE',
    1282: 'INVALID_OPERATION',
    1285: 'OUT_OF_MEMORY',
    1286: 'INVALID_FRAMEBUFFER_OPERATION',
    2304: 'CW',
    2305: 'CCW',
    2849: 'LINE_WIDTH',
    2884: 'CULL_FACE',
    2885: 'CULL_FACE_MODE',
    2886: 'FRONT_FACE',
    2928: 'DEPTH_RANGE',
    2929: 'DEPTH_TEST',
    2930: 'DEPTH_WRITEMASK',
    2931: 'DEPTH_CLEAR_VALUE',
    2932: 'DEPTH_FUNC',
    2960: 'STENCIL_TEST',
    2961: 'STENCIL_CLEAR_VALUE',
    2962: 'STENCIL_FUNC',
    2963: 'STENCIL_VALUE_MASK',
    2964: 'STENCIL_FAIL',
    2965: 'STENCIL_PASS_DEPTH_FAIL',
    2966: 'STENCIL_PASS_DEPTH_PASS',
    2967: 'STENCIL_REF',
    2968: 'STENCIL_WRITEMASK',
    2978: 'VIEWPORT',
    3024: 'DITHER',
    3042: 'BLEND',
    3088: 'SCISSOR_BOX',
    3089: 'SCISSOR_TEST',
    3106: 'COLOR_CLEAR_VALUE',
    3107: 'COLOR_WRITEMASK',
    3317: 'UNPACK_ALIGNMENT',
    3333: 'PACK_ALIGNMENT',
    3379: 'MAX_TEXTURE_SIZE',
    3386: 'MAX_VIEWPORT_DIMS',
    3408: 'SUBPIXEL_BITS',
    3410: 'RED_BITS',
    3411: 'GREEN_BITS',
    3412: 'BLUE_BITS',
    3413: 'ALPHA_BITS',
    3414: 'DEPTH_BITS',
    3415: 'STENCIL_BITS',
    3553: 'TEXTURE_2D',
    4352: 'DONT_CARE',
    4353: 'FASTEST',
    4354: 'NICEST',
    5120: 'BYTE',
    5121: 'UNSIGNED_BYTE',
    5122: 'SHORT',
    5123: 'UNSIGNED_SHORT',
    5124: 'INT',
    5125: 'UNSIGNED_INT',
    5126: 'FLOAT',
    5386: 'INVERT',
    5890: 'TEXTURE',
    6401: 'STENCIL_INDEX',
    6402: 'DEPTH_COMPONENT',
    6406: 'ALPHA',
    6407: 'RGB',
    6408: 'RGBA',
    6409: 'LUMINANCE',
    6410: 'LUMINANCE_ALPHA',
    7680: 'KEEP',
    7681: 'REPLACE',
    7682: 'INCR',
    7683: 'DECR',
    7936: 'VENDOR',
    7937: 'RENDERER',
    7938: 'VERSION',
    9728: 'NEAREST',
    9729: 'LINEAR',
    9984: 'NEAREST_MIPMAP_NEAREST',
    9985: 'LINEAR_MIPMAP_NEAREST',
    9986: 'NEAREST_MIPMAP_LINEAR',
    9987: 'LINEAR_MIPMAP_LINEAR',
    10240: 'TEXTURE_MAG_FILTER',
    10241: 'TEXTURE_MIN_FILTER',
    10242: 'TEXTURE_WRAP_S',
    10243: 'TEXTURE_WRAP_T',
    10497: 'REPEAT',
    10752: 'POLYGON_OFFSET_UNITS',
    16384: 'COLOR_BUFFER_BIT',
    32769: 'CONSTANT_COLOR',
    32770: 'ONE_MINUS_CONSTANT_COLOR',
    32771: 'CONSTANT_ALPHA',
    32772: 'ONE_MINUS_CONSTANT_ALPHA',
    32773: 'BLEND_COLOR',
    32774: 'FUNC_ADD',
    32777: 'BLEND_EQUATION_RGB',
    32778: 'FUNC_SUBTRACT',
    32779: 'FUNC_REVERSE_SUBTRACT',
    32819: 'UNSIGNED_SHORT_4_4_4_4',
    32820: 'UNSIGNED_SHORT_5_5_5_1',
    32823: 'POLYGON_OFFSET_FILL',
    32824: 'POLYGON_OFFSET_FACTOR',
    32854: 'RGBA4',
    32855: 'RGB5_A1',
    32873: 'TEXTURE_BINDING_2D',
    32926: 'SAMPLE_ALPHA_TO_COVERAGE',
    32928: 'SAMPLE_COVERAGE',
    32936: 'SAMPLE_BUFFERS',
    32937: 'SAMPLES',
    32938: 'SAMPLE_COVERAGE_VALUE',
    32939: 'SAMPLE_COVERAGE_INVERT',
    32968: 'BLEND_DST_RGB',
    32969: 'BLEND_SRC_RGB',
    32970: 'BLEND_DST_ALPHA',
    32971: 'BLEND_SRC_ALPHA',
    33071: 'CLAMP_TO_EDGE',
    33170: 'GENERATE_MIPMAP_HINT',
    33189: 'DEPTH_COMPONENT16',
    33306: 'DEPTH_STENCIL_ATTACHMENT',
    33635: 'UNSIGNED_SHORT_5_6_5',
    33648: 'MIRRORED_REPEAT',
    33901: 'ALIASED_POINT_SIZE_RANGE',
    33902: 'ALIASED_LINE_WIDTH_RANGE',
    33984: 'TEXTURE0',
    33985: 'TEXTURE1',
    33986: 'TEXTURE2',
    33987: 'TEXTURE3',
    33988: 'TEXTURE4',
    33989: 'TEXTURE5',
    33990: 'TEXTURE6',
    33991: 'TEXTURE7',
    33992: 'TEXTURE8',
    33993: 'TEXTURE9',
    33994: 'TEXTURE10',
    33995: 'TEXTURE11',
    33996: 'TEXTURE12',
    33997: 'TEXTURE13',
    33998: 'TEXTURE14',
    33999: 'TEXTURE15',
    34000: 'TEXTURE16',
    34001: 'TEXTURE17',
    34002: 'TEXTURE18',
    34003: 'TEXTURE19',
    34004: 'TEXTURE20',
    34005: 'TEXTURE21',
    34006: 'TEXTURE22',
    34007: 'TEXTURE23',
    34008: 'TEXTURE24',
    34009: 'TEXTURE25',
    34010: 'TEXTURE26',
    34011: 'TEXTURE27',
    34012: 'TEXTURE28',
    34013: 'TEXTURE29',
    34014: 'TEXTURE30',
    34015: 'TEXTURE31',
    34016: 'ACTIVE_TEXTURE',
    34024: 'MAX_RENDERBUFFER_SIZE',
    34041: 'DEPTH_STENCIL',
    34055: 'INCR_WRAP',
    34056: 'DECR_WRAP',
    34067: 'TEXTURE_CUBE_MAP',
    34068: 'TEXTURE_BINDING_CUBE_MAP',
    34069: 'TEXTURE_CUBE_MAP_POSITIVE_X',
    34070: 'TEXTURE_CUBE_MAP_NEGATIVE_X',
    34071: 'TEXTURE_CUBE_MAP_POSITIVE_Y',
    34072: 'TEXTURE_CUBE_MAP_NEGATIVE_Y',
    34073: 'TEXTURE_CUBE_MAP_POSITIVE_Z',
    34074: 'TEXTURE_CUBE_MAP_NEGATIVE_Z',
    34076: 'MAX_CUBE_MAP_TEXTURE_SIZE',
    34338: 'VERTEX_ATTRIB_ARRAY_ENABLED',
    34339: 'VERTEX_ATTRIB_ARRAY_SIZE',
    34340: 'VERTEX_ATTRIB_ARRAY_STRIDE',
    34341: 'VERTEX_ATTRIB_ARRAY_TYPE',
    34342: 'CURRENT_VERTEX_ATTRIB',
    34373: 'VERTEX_ATTRIB_ARRAY_POINTER',
    34466: 'NUM_COMPRESSED_TEXTURE_FORMATS',
    34467: 'COMPRESSED_TEXTURE_FORMATS',
    34660: 'BUFFER_SIZE',
    34661: 'BUFFER_USAGE',
    34816: 'STENCIL_BACK_FUNC',
    34817: 'STENCIL_BACK_FAIL',
    34818: 'STENCIL_BACK_PASS_DEPTH_FAIL',
    34819: 'STENCIL_BACK_PASS_DEPTH_PASS',
    34877: 'BLEND_EQUATION_ALPHA',
    34921: 'MAX_VERTEX_ATTRIBS',
    34922: 'VERTEX_ATTRIB_ARRAY_NORMALIZED',
    34930: 'MAX_TEXTURE_IMAGE_UNITS',
    34962: 'ARRAY_BUFFER',
    34963: 'ELEMENT_ARRAY_BUFFER',
    34964: 'ARRAY_BUFFER_BINDING',
    34965: 'ELEMENT_ARRAY_BUFFER_BINDING',
    34975: 'VERTEX_ATTRIB_ARRAY_BUFFER_BINDING',
    35040: 'STREAM_DRAW',
    35044: 'STATIC_DRAW',
    35048: 'DYNAMIC_DRAW',
    35632: 'FRAGMENT_SHADER',
    35633: 'VERTEX_SHADER',
    35660: 'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
    35661: 'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
    35663: 'SHADER_TYPE',
    35664: 'FLOAT_VEC2',
    35665: 'FLOAT_VEC3',
    35666: 'FLOAT_VEC4',
    35667: 'INT_VEC2',
    35668: 'INT_VEC3',
    35669: 'INT_VEC4',
    35670: 'BOOL',
    35671: 'BOOL_VEC2',
    35672: 'BOOL_VEC3',
    35673: 'BOOL_VEC4',
    35674: 'FLOAT_MAT2',
    35675: 'FLOAT_MAT3',
    35676: 'FLOAT_MAT4',
    35678: 'SAMPLER_2D',
    35680: 'SAMPLER_CUBE',
    35712: 'DELETE_STATUS',
    35713: 'COMPILE_STATUS',
    35714: 'LINK_STATUS',
    35715: 'VALIDATE_STATUS',
    35716: 'INFO_LOG_LENGTH',
    35717: 'ATTACHED_SHADERS',
    35718: 'ACTIVE_UNIFORMS',
    35719: 'ACTIVE_UNIFORM_MAX_LENGTH',
    35720: 'SHADER_SOURCE_LENGTH',
    35721: 'ACTIVE_ATTRIBUTES',
    35722: 'ACTIVE_ATTRIBUTE_MAX_LENGTH',
    35724: 'SHADING_LANGUAGE_VERSION',
    35725: 'CURRENT_PROGRAM',
    36003: 'STENCIL_BACK_REF',
    36004: 'STENCIL_BACK_VALUE_MASK',
    36005: 'STENCIL_BACK_WRITEMASK',
    36006: 'FRAMEBUFFER_BINDING',
    36007: 'RENDERBUFFER_BINDING',
    36048: 'FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE',
    36049: 'FRAMEBUFFER_ATTACHMENT_OBJECT_NAME',
    36050: 'FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL',
    36051: 'FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE',
    36053: 'FRAMEBUFFER_COMPLETE',
    36054: 'FRAMEBUFFER_INCOMPLETE_ATTACHMENT',
    36055: 'FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT',
    36057: 'FRAMEBUFFER_INCOMPLETE_DIMENSIONS',
    36061: 'FRAMEBUFFER_UNSUPPORTED',
    36064: 'COLOR_ATTACHMENT0',
    36096: 'DEPTH_ATTACHMENT',
    36128: 'STENCIL_ATTACHMENT',
    36160: 'FRAMEBUFFER',
    36161: 'RENDERBUFFER',
    36162: 'RENDERBUFFER_WIDTH',
    36163: 'RENDERBUFFER_HEIGHT',
    36164: 'RENDERBUFFER_INTERNAL_FORMAT',
    36168: 'STENCIL_INDEX8',
    36176: 'RENDERBUFFER_RED_SIZE',
    36177: 'RENDERBUFFER_GREEN_SIZE',
    36178: 'RENDERBUFFER_BLUE_SIZE',
    36179: 'RENDERBUFFER_ALPHA_SIZE',
    36180: 'RENDERBUFFER_DEPTH_SIZE',
    36181: 'RENDERBUFFER_STENCIL_SIZE',
    36194: 'RGB565',
    36336: 'LOW_FLOAT',
    36337: 'MEDIUM_FLOAT',
    36338: 'HIGH_FLOAT',
    36339: 'LOW_INT',
    36340: 'MEDIUM_INT',
    36341: 'HIGH_INT',
    36346: 'SHADER_COMPILER',
    36347: 'MAX_VERTEX_UNIFORM_VECTORS',
    36348: 'MAX_VARYING_VECTORS',
    36349: 'MAX_FRAGMENT_UNIFORM_VECTORS',
    37440: 'UNPACK_FLIP_Y_WEBGL',
    37441: 'UNPACK_PREMULTIPLY_ALPHA_WEBGL',
    37442: 'CONTEXT_LOST_WEBGL',
    37443: 'UNPACK_COLORSPACE_CONVERSION_WEBGL',
    37444: 'BROWSER_DEFAULT_WEBGL'
};

//END
console.log(`%cWebGL ${WebGL.VERSION} loaded.`, WebGL.CSS);