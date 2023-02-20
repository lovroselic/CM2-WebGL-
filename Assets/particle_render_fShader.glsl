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
    vec2 delta = v_uv - vec2(0.5, 0.5);                       //Distance from center
    float lenSqr = abs(dot(delta, delta));		              //Length Squared (avoiding square roots)
    float a = smoothstep(0.25, 0.23, lenSqr);	  //Center, so 0.5*0.5 = 0.25, the squared len from center, avoid roots.
    if(a < 0.1) {
        discard;
    }

    //float a = 1.0;

    a -= v_age;
    //outColor = vec4(1.0, 0.0, 0.0, a);
    vec4 texelColor = texture(uSampler, v_uv);
    outColor = vec4(texelColor.rgb, a);
}