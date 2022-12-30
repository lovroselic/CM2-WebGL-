///vShader///
attribute vec4 aVertexPosition;
attribute vec4 aVertexColor;
//attribute vec3 aVertexNormal;
//attribute vec2 aTextureCoord;

//uniform mat4 uNormalMatrix;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

//varying highp vec2 vTextureCoord;
//varying highp vec3 vLighting;
varying lowp vec4 vColor;

void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    //vTextureCoord = aTextureCoord;
    vColor = aVertexColor;

    // Apply lighting effect
    /*
    highp vec3 ambientLight = vec3(0.13, 0.13, 0.13);
    highp vec3 directionalLightColor = vec3(0.96, 0.95, 0.68);
    highp vec3 directionalVector = normalize(vec3(0, 0, 0.75));
    highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);
    highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0) * 0.5;
    vLighting = ambientLight + (directionalLightColor * directional);
    */
}