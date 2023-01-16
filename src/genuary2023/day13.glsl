#define NUM_EXPLOSIONS 6.0
#define NUM_PARTICLES 100.0


vec2 Hash12(float t) {
  float x = fract(sin(t * 456.51) * 195.23);
  float y = fract(sin((t + x) * 951.2) * 462.1);
  return vec2(x, y);
}

vec2 Hash12_Polar(float t) {
  float a = fract(sin(t * 456.51) * 195.23) * 6.2832;
  float r = fract(sin((t + a) * 951.2) * 462.1);
  return vec2(sin(a), cos(a)) * r;

}

float Explosion(vec2 uv, float t) {
    float sparks = 0.0;
    for (float i=0.; i < NUM_PARTICLES; i++) {
        vec2 dir = Hash12_Polar(i + 1.0) * 0.5;
        float d = length(uv - dir * t);

        float brightness = mix(0.0003, 0.001, smoothstep(0.05, 0.0, t));
        brightness *= sin(t * 20.0 + i) * 0.5 + 0.5;
        brightness *= smoothstep(1.0, 0.7, t);
        sparks += brightness / d;
    }
    return sparks;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;

    vec3 col = vec3(0.0);


    for ( float i = 0.0; i < NUM_EXPLOSIONS; i++) {
        float t = (iTime / 1.5) + (i * 123.4) / NUM_EXPLOSIONS;
        float ft = floor(t);
        vec3 colour = sin(4.0 * vec3(0.34, 0.54, 0.43) * ft) * 0.25 + 0.75;

        vec2 offset = Hash12(i + 1.0 + ft * NUM_EXPLOSIONS) - 0.5;
        offset *= vec2(0.9 * 1.777, 0.9);
        col += Explosion(uv - offset, fract(t)) * colour;
    }

    col *= 2.0;

    // Output to screen
    fragColor = vec4(col,1.0);
}