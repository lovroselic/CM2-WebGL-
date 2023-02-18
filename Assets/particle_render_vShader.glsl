///particle_render_vShader///
#version 300 es

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

//uniform float u_time;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

layout(location = 0) in vec3 a_position;
layout(location = 1) in vec2 a_uv;
layout(location = 2) in vec3 a_offset;
layout(location = 3) in float a_ageNorm;

out vec2 v_uv;
out float v_age;

void main(void) {
    v_uv = a_uv;
    v_age = a_ageNorm;
    //gl_Position = uProjectionMatrix * uModelViewMatrix * uTranslate * uScale * aVertexPosition;
    //vec3 pos = a_position;// * (1.0-v_age);
    //gl_Position = matProjection * matCameraView * uModalMatrix * vec4(a_offset + pos, 1.0);
    gl_Position = uProjectionMatrix * uModelViewMatrix * (a_offset + a_position);
}