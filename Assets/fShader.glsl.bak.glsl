///fShader///
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

//#define N_LIGHTS 666
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec3 uCameraPos;

varying vec3 FragPos;
varying vec3 v_normal;

const int N_LIGHTS = 666; //replaced before compiling
//uniform  vec3 uPointLights[2];
//uniform  vec3 uPointLights[N_LIGHTS];
//uniform vec3 uPointLights[N_LIGHTS];
uniform  vec3 uPointLights[2];

vec3 CalcPointLight(vec3 PL_position, vec3 FragPos, vec3 viewDir, vec3 normal);

void main(void) {
    //ambient
    float ambientStrength = 0.10;
    vec3 ambientLightColor = vec3(1, 1, 0.9);
    vec3 ambientLight = ambientStrength * ambientLightColor;

    //diffuse
    float dist = distance(uCameraPos, FragPos);
    float attenuation = 1.0 / (1.0 + 0.15 * dist + 0.45 * dist * dist);
    float diffuseStrength = 1.0;
    vec3 diffuseLightColor = vec3(1, 1, 0.9);
    vec3 norm = normalize(v_normal);
    vec3 viewDir = normalize(uCameraPos - FragPos);
    float diff = max(dot(norm, viewDir), 0.0);
    vec3 diffuse = diffuseStrength * attenuation * diff * diffuseLightColor;

    vec3 light = ambientLight + diffuse;

    //point lights
    vec3 PL_output = vec3(0.0);

    //
    uPointLights[0] = vec3(1.5, 0.1, 1.0);
    uPointLights[1] = vec3(6.5, 0.1, 1.0);

    for(int i = 0; i < N_LIGHTS + 1; i++) {
        //pointLight = vec3(1.5, 0.1, 1.0);
        PL_output += CalcPointLight(uPointLights[i], FragPos, viewDir, norm);

    }
    light += PL_output;

    vec4 texelColor = texture2D(uSampler, vTextureCoord);
    if(texelColor.a < 0.6) {
        discard;
    }
    gl_FragColor = vec4(texelColor.rgb * light, texelColor.a);

}

vec3 CalcPointLight(vec3 PL_position, vec3 FragPos, vec3 viewDir, vec3 normal) {
    float shininess = 128.0 * 0.1;
    vec3 pointLightColor = vec3(0.6, 0.6, 0.5);
    vec3 lightDir = normalize(PL_position - FragPos);

    // diffuse shading
    float diff = max(dot(normal, lightDir), 0.0);
    // specular shading
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    // attenuation
    float distance = length(PL_position - FragPos);
    float attenuation = 1.0 / (1.0 + 1.0 * distance + 1.0 * (distance * distance));

    //together
    float ambientStrength = 0.02;
    vec3 ambient = pointLightColor * ambientStrength * attenuation;
    float diffuseStrength = 0.05;
    vec3 diffuse = pointLightColor * diff * diffuseStrength * attenuation;
    float specStrength = 0.05;
    vec3 specular = pointLightColor * spec * specStrength * attenuation;
    //return diffuse;
    return diffuse + ambient + specular;
}