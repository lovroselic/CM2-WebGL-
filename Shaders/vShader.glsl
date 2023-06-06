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

varying vec2 vTextureCoord;
varying vec3 FragPos;
varying vec3 v_normal;

mat3 transpose3(mat3 matrix);
mat3 inverse3(mat3 matrix);

void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * uTranslate * uRotateY * uScale * aVertexPosition;
    vTextureCoord = aTextureCoord;
    FragPos = vec3(aVertexPosition);          

    mat4 normalMatrix = mat4(transpose3(inverse3(mat3(uModelViewMatrix))));       //calculate out of shader!!
    vec4 transformedNormal = normalMatrix * uRotateY * vec4(aVertexNormal, 0.0);                                   
    v_normal = transformedNormal.xyz;
}

mat3 transpose3(mat3 matrix) {
    return mat3(matrix[0][0], matrix[1][0], matrix[2][0], matrix[0][1], matrix[1][1], matrix[2][1], matrix[0][2], matrix[1][2], matrix[2][2]);
}

mat3 inverse3(mat3 matrix) {
    mat3 adjugate = mat3(matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1], matrix[0][2] * matrix[2][1] - matrix[0][1] * matrix[2][2], matrix[0][1] * matrix[1][2] - matrix[0][2] * matrix[1][1], matrix[1][2] * matrix[2][0] - matrix[1][0] * matrix[2][2], matrix[0][0] * matrix[2][2] - matrix[0][2] * matrix[2][0], matrix[0][2] * matrix[1][0] - matrix[0][0] * matrix[1][2], matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0], matrix[0][1] * matrix[2][0] - matrix[0][0] * matrix[2][1], matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]);

    float determinant = matrix[0][0] * adjugate[0][0] + matrix[0][1] * adjugate[1][0] + matrix[0][2] * adjugate[2][0];
    return adjugate / determinant;
}