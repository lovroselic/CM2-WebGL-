///fShader///
varying highp vec2 vTextureCoord;
varying highp vec3 vLighting;

uniform sampler2D uSampler;

uniform highp vec3 uCameraPos;

varying highp vec3 FragPos;
varying highp vec3 v_normal;
varying highp vec3 transformedNormal;

void main(void) {
    //ambient
    highp float ambientStrength = 0.15;
    //highp float ambientStrength = 0.65;
    highp vec3 ambientLightColor = vec3(1, 1, 0.9);
    highp vec3 ambientLight = ambientStrength * ambientLightColor;

    //diffuse
    highp float diffuseStrength = 1.0;
    highp vec3 diffuseLightColor = vec3(1, 1, 0.9);
    //highp vec3 diffuseLightColor = vec3(1, 0, 0.0);

    highp vec3 norm = normalize(v_normal);
    //highp vec3 norm = normalize(transformedNormal);



    highp vec3 lightDir = normalize(uCameraPos - FragPos);

    highp float diff = max(dot(norm, lightDir), 0.0);
    highp vec3 diffuse = diffuseStrength * diff * diffuseLightColor;

    highp vec3 light = ambientLight + diffuse;
    //highp vec3 light = ambientLight;
    //highp vec3 light = diffuse;

    //
    highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
    gl_FragColor = vec4(texelColor.rgb * light, texelColor.a); 
    //gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a); //OK
    //gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
    //gl_FragColor = texture2D(uSampler, vTextureCoord);
}