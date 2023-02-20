#version 300 es
///particle_render_fShader///

#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform sampler2D uSampler;

in vec2 v_uv;
in float v_age;

out vec4 outColor;

void main(void) {
    vec2 delta = v_uv - vec2(0.5, 0.5);                       
    float lenSqr = abs(dot(delta, delta));		              
    float a = smoothstep(0.25, 0.23, lenSqr);

    a -= v_age;
    if(a < 0.0) {
        a = 0.0;
    }
    if(a < 0.1) {
        discard;
    }

    vec4 texelColor = texture(uSampler, v_uv);
    outColor = vec4(texelColor.rgb, a);
}