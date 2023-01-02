///vShader///
attribute vec4 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uNormalMatrix;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

uniform vec3 uCameraDir;

varying highp vec2 vTextureCoord;
varying highp vec3 FragPos;
varying highp vec3 vLighting;
varying highp vec3 v_normal;

varying highp vec3 transformedNormal;
//varying highp vec3 Normal;

void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vTextureCoord = aTextureCoord;
    FragPos = vec3(aVertexPosition);
    highp vec3 transformedNormal = mat3(uNormalMatrix) * aVertexNormal;
    v_normal = aVertexNormal;


    //test
    //highp mat3 id = mat3(1.0);
    //highp vec3 Normal = mat3(transpose(inverse(id))) * aVertexNormal;  

    // Apply lighting effect
    float ambientStrength = 0.15;
    highp vec3 ambientLightColor = vec3(1, 1, 0.9);
    highp vec3 ambientLight = ambientStrength * ambientLightColor;

    //vLighting = ambientLight;

    /* abandoned ?? */
    
    highp vec3 directionalLightColor = vec3(0.96, 0.95, 0.68);
    //highp vec3 directionalVector = normalize(vec3(0, 0.0, 1));
    highp vec3 directionalVector = normalize(uCameraDir);

    float power = 0.75;
    highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0) * power;
    vLighting = ambientLight + (directionalLightColor * directional);

}