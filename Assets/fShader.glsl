///fShader///
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

const int N_LIGHTS = 1; //replaced before compiling
uniform vec3 uPointLights[N_LIGHTS];
uniform vec3 uLightColors[N_LIGHTS];
uniform sampler2D uSampler;
uniform vec3 uCameraPos;
uniform float uShine;

varying vec3 FragPos;
varying vec3 v_normal;
varying vec2 vTextureCoord;

vec3 InnerLight(vec3 cameraPos, vec3 FragPos, vec3 viewDir, vec3 normal);
vec3 CalcPointLight(vec3 PL_position, vec3 FragPos, vec3 viewDir, vec3 normal, float shininess, vec3 pointLightColor);

void main(void) {
    vec3 norm = normalize(v_normal);
    vec3 viewDir = normalize(uCameraPos - FragPos);
    vec3 light = InnerLight(uCameraPos, FragPos, viewDir, norm);

    //adding point lights
    vec3 PL_output = vec3(0.0);

    for(int i = 0; i < N_LIGHTS; i++) {
        if(uPointLights[i].x < 0.0) {
            continue;
        }
        PL_output += CalcPointLight(uPointLights[i], FragPos, viewDir, norm, uShine, uLightColors[i]);
    }

    light += PL_output;

    vec4 texelColor = texture2D(uSampler, vTextureCoord);
    if(texelColor.a < 0.4) {
        discard;
    }

    gl_FragColor = vec4(texelColor.rgb * light, texelColor.a);
}

vec3 InnerLight(vec3 cameraPos, vec3 FragPos, vec3 viewDir, vec3 normal) {
    //ambient
    float ambientStrength = 0.15;
    vec3 ambientLightColor = vec3(1, 1, 0.9);
    vec3 ambientLight = ambientStrength * ambientLightColor;

    //diffuse
    float dist = distance(cameraPos, FragPos);
    float attenuation = 1.0 / (1.0 + 0.10 * dist + 0.40 * dist * dist);
    float diffuseStrength = 1.2;
    vec3 diffuseLightColor = vec3(1, 1, 0.9);
    float diff = max(dot(normal, viewDir), 0.0);
    vec3 diffuselight = diffuseStrength * attenuation * diff * diffuseLightColor;

    // specular shading
    float shininess = 128.0 * 0.20;
    vec3 reflectDir = reflect(-viewDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    float specStrength = 1.2;
    vec3 specularLight = diffuseLightColor * spec * specStrength * attenuation;

    return ambientLight + diffuselight + specularLight;
}

vec3 CalcPointLight(vec3 PL_position, vec3 FragPos, vec3 viewDir, vec3 normal, float shininess, vec3 pointLightColor) {
    vec3 lightDir = normalize(PL_position - FragPos);

    // diffuse shading
    float diff = max(dot(normal, lightDir), 0.0);
    // specular shading
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
    // attenuation
    float distance = length(PL_position - FragPos);
    float attenuation = 1.0 / (1.0 + 0.15 * distance + 0.45 * (distance * distance));

    float ambientStrength = 0.99;
    vec3 ambient = pointLightColor * ambientStrength * attenuation;
    float diffuseStrength = 0.99;
    vec3 diffuse = pointLightColor * diff * diffuseStrength * attenuation;
    float specStrength = 0.99;
    vec3 specular = pointLightColor * spec * specStrength * attenuation;

    return diffuse + ambient + specular;
}