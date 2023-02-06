///vShader///
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

attribute vec4 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

uniform mat4 uScale;
uniform mat4 uTranslate;

varying vec2 vTextureCoord;
varying vec3 FragPos;
varying vec3 v_normal;

void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * uTranslate * uScale * aVertexPosition;
    //gl_Position = uProjectionMatrix  * uTranslate * uScale * aVertexPosition;
    vTextureCoord = aTextureCoord;
    FragPos = vec3(aVertexPosition);
    v_normal = aVertexNormal;
}