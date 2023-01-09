//
// Genuary 2023: Day 8
// "Signed Distance Functions"
//
// @motus_art
// https://owenmcateer.github.io/Motus-Art
//
varying vec2 vUvs;
uniform vec2 resolution;
uniform float time;

const float HALF_PI = 1.57079632679;
const float PI = 3.14159265359;
const float TWO_PI = 6.28318530718;


float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}

// Vignette
vec3 Vignette() {
  float vignette = 1.0 - length(abs(vUvs - 0.5));
  vignette = smoothstep(0.0, 0.7, vignette);
  return vec3(remap(vignette, 0.0, 1.0, 0.1, 1.0));
}

float sdfCircle(vec2 p, float r) {
  return length(p) - r;
}

float sdfLine(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}


float opUnion(float d1, float d2) {
  return min(d1, d2);
}

float softMax(float a, float b, float k) {
  return log(exp(k * a) + exp(k * b)) / k;
}

float softMin(float a, float b, float k) {
  return -softMax(-a, -b, k);
}


vec3 WHITE = vec3(0.937);
const float ELEMENTS = 18.0;

void main() {
  vec2 pixelCoords = (vUvs - 0.5) * resolution;
  vec3 colour = vec3(0.15);
  float circles = 0.0;

  for (float i = 1.0; i < ELEMENTS; i++) {
    float r = i * 26.0;
    float m = (time / 30.0) * (TWO_PI * (ELEMENTS - i));
    float x = cos(m) * r;
    float y = sin(m) * r;

    float circleD = sdfCircle(vec2(x, y) + pixelCoords, 10.0);
    circles = softMin(circles, circleD, 0.05);
  }


  colour = mix(WHITE * 0.2, colour, smoothstep(-1.0, 10.0, circles));
  colour = mix(WHITE, colour, step(-5.0, circles));

  // BG
  colour *= Vignette();

  gl_FragColor = vec4(colour, 1.0);
}
