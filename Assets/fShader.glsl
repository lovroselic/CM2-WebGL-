///fShader///
varying highp vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform highp vec3 uCameraPos;

varying highp vec3 FragPos;
varying highp vec3 v_normal;

void main(void) {
    //ambient
    highp float ambientStrength = 0.10;
    highp vec3 ambientLightColor = vec3(1, 1, 0.9);
    highp vec3 ambientLight = ambientStrength * ambientLightColor;

    //diffuse
    highp float dist = distance(uCameraPos, FragPos);
    highp float attenuation = 1.0 / (1.0 + 0.15 * dist + 0.45 * dist * dist);
    highp float diffuseStrength = 2.0 ;
    highp vec3 diffuseLightColor = vec3(1, 1, 0.9);
    highp vec3 norm = normalize(v_normal);
    highp vec3 lightDir = normalize(uCameraPos - FragPos);
    highp float diff = max(dot(norm, lightDir), 0.0);
    highp vec3 diffuse = diffuseStrength * attenuation * diff * diffuseLightColor;

    highp vec3 light = ambientLight + diffuse;

    highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
    if (texelColor.a < 0.6) discard;
    gl_FragColor = vec4(texelColor.rgb * light, texelColor.a);

}