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
uniform mat4 uRotateY;
uniform mat3 uNormalMatrix;

varying vec2 vTextureCoord;
varying vec3 FragPos;
varying vec3 v_normal;

void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * uTranslate * uRotateY * uScale * aVertexPosition;
    vTextureCoord = aTextureCoord;
    FragPos = vec3(aVertexPosition);

    mat4 normalMatrix = mat4(uNormalMatrix);       
    vec4 transformedNormal = normalMatrix * uRotateY * vec4(aVertexNormal, 0.0);    
    v_normal = transformedNormal.xyz;
}