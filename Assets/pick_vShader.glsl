///pick_vShader///
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

attribute vec4 aVertexPosition;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

uniform mat4 uScale;
uniform mat4 uTranslate;

void main(void) {
    //gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    gl_Position = uProjectionMatrix * uModelViewMatrix * uTranslate * uScale * aVertexPosition;
}