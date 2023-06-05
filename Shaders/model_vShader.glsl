///model_vShader///
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

const int MAX_JOINTS = 64;

attribute vec4 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;
attribute vec4 aJoint;
attribute vec4 aWeight;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uScale;
uniform mat4 uTranslate;
uniform mat4 uRotateY;
uniform mat4 u_jointMat[MAX_JOINTS];

varying vec2 vTextureCoord;
varying vec3 FragPos;
varying vec3 v_normal;

mat3 transpose3(mat3 matrix);
mat3 inverse3(mat3 matrix);

void main(void) {
    mat4 skinMat = aWeight.x * u_jointMat[int(aJoint.x)] +
        aWeight.y * u_jointMat[int(aJoint.y)] +
        aWeight.z * u_jointMat[int(aJoint.z)] +
        aWeight.w * u_jointMat[int(aJoint.w)];

    vec4 position = skinMat * aVertexPosition;
    gl_Position = uProjectionMatrix * uModelViewMatrix * uTranslate * uRotateY * uScale * position;
    vTextureCoord = aTextureCoord;
    FragPos = vec3(position); 
    v_normal = vec3(skinMat * vec4(aVertexNormal, 0.0)); 
    mat4 normalMatrix = mat4(transpose3(inverse3(mat3(uModelViewMatrix * uRotateY))));                          //calculate out of shader!!
    vec4 transformedNormal = normalMatrix * vec4(v_normal, 0.0); 
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