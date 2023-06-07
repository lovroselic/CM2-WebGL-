///fShader///
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

struct Material {
    vec3 ambientColor;
    vec3 diffuseColor;
    vec3 specularColor;
    float shininess;
};

const int N_LIGHTS = 1;                                     //replaced before compiling
uniform vec3 uPointLights[N_LIGHTS];
uniform vec3 uLightColors[N_LIGHTS];
uniform sampler2D uSampler;
uniform vec3 uCameraPos;
uniform Material uMaterial;

varying vec3 FragPos;
varying vec3 v_normal;
varying vec2 vTextureCoord;

vec3 InnerLight(vec3 cameraPos, vec3 FragPos, vec3 viewDir, vec3 normal, float shininess, vec3 ambientColor, vec3 diffuseColor, vec3 specularColor);
vec3 CalcPointLight(vec3 PL_position, vec3 FragPos, vec3 viewDir, vec3 normal, float shininess, vec3 pointLightColor, vec3 ambientColor, vec3 diffuseColor, vec3 specularColor);

void main(void) {
    vec3 ambientColor = uMaterial.ambientColor;
    vec3 diffuseColor = uMaterial.diffuseColor;
    vec3 specularColor = uMaterial.specularColor;
    float shininess = uMaterial.shininess;

    vec3 norm = normalize(v_normal);
    vec3 viewDir = normalize(uCameraPos - FragPos);
    vec3 light = InnerLight(uCameraPos, FragPos, viewDir, norm, shininess, ambientColor, diffuseColor, specularColor);

    //adding point lights
    vec3 PL_output = vec3(0.0);

    for(int i = 0; i < N_LIGHTS; i++) {
        if(uPointLights[i].x < 0.0) {
            continue;
        }
        PL_output += CalcPointLight(uPointLights[i], FragPos, viewDir, norm, shininess, uLightColors[i], ambientColor, diffuseColor, specularColor);
    }

    light += PL_output;

    vec4 texelColor = texture2D(uSampler, vTextureCoord);
    if(texelColor.a < 0.4) {
        discard;
    }

    gl_FragColor = vec4(texelColor.rgb * light, texelColor.a);
}

vec3 InnerLight(vec3 cameraPos, vec3 FragPos, vec3 viewDir, vec3 normal, float shininess, vec3 ambientColor, vec3 diffuseColor, vec3 specularColor) {
    //ambient
    float ambientStrength = 0.225; //OK
    vec3 ambientLightColor = vec3(0.9, 0.9, 0.81);
    vec3 ambientLight = ambientStrength * ambientLightColor * ambientColor;

    //diffuse
    float dist = distance(cameraPos, FragPos);
    float attenuation = 1.0 / (1.0 + 0.10 * dist + 0.65 * dist * dist);
    float diffuseStrength = 2.5;
    vec3 diffuseLightColor = vec3(1, 1, 0.9);
    float diff = max(dot(normal, viewDir), 0.0);
    vec3 diffuselight = diffuseStrength * attenuation * diff * ambientLightColor * diffuseColor;

    // specular shading
    vec3 reflectDir = reflect(-viewDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    float specStrength = 0.9;
    vec3 specularLight = diffuseLightColor * spec * specStrength * attenuation * specularColor;

    return ambientLight + diffuselight + specularLight;
}

vec3 CalcPointLight(vec3 PL_position, vec3 FragPos, vec3 viewDir, vec3 normal, float shininess, vec3 pointLightColor, vec3 ambientColor, vec3 diffuseColor, vec3 specularColor) {
    vec3 lightDir = normalize(PL_position - FragPos);

    // diffuse shading
    float diff = max(dot(normal, lightDir), 0.0);
    // specular shading
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    // attenuation
    float distance = length(PL_position - FragPos);
    float attenuation = 1.0 / (1.0 + 0.1 * distance + 0.65 * (distance * distance));

    float ambientStrength = 1.0;
    vec3 ambient = pointLightColor * ambientStrength * attenuation * ambientColor;
    //float diffuseStrength = 1.75;
    float diffuseStrength = 2.5;
    vec3 diffuse = pointLightColor * diff * diffuseStrength * attenuation * diffuseColor;
    //float specStrength = 1.5;
    float specStrength = 1.5;
    vec3 specular = pointLightColor * spec * specStrength * attenuation * specularColor;

    return diffuse + ambient + specular;
}