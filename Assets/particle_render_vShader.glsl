#version 300 es
///particle_render_vShader///

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

//uniform float u_time;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec3 uExpCenter;

layout(location = 0) in vec3 a_position;
layout(location = 1) in vec2 a_uv;
layout(location = 2) in vec3 a_offset;
layout(location = 3) in float a_ageNorm;

out vec2 v_uv;
out float v_age;

void main(void) {
    v_uv = a_uv;
    v_age = a_ageNorm;

    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4((a_position * (1.0 - v_age * v_age)) + a_offset + uExpCenter, 1);
}