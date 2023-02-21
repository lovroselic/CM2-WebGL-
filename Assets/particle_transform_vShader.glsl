#version 300 es
///particle_transform_vShader///

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform float u_time;

layout(location = 0) in vec3 a_offset;
layout(location = 1) in vec3 a_velocity;
layout(location = 2) in float a_age;
layout(location = 3) in float a_ageNorm;
layout(location = 4) in float a_life;

out vec3 o_offset;
out vec3 o_velocity;
out float o_age;
out float o_ageNorm;

void main(void) {
    float age = u_time - a_age;
    o_velocity = a_velocity - vec3(0.0, 0.0075, 0.0); //Apply Gravity to Velocity;
    //o_offset = a_offset + 0.025 * o_velocity;
    o_offset = a_offset + 0.03 * o_velocity;
    o_age = a_age;
    o_ageNorm = age / a_life;
}