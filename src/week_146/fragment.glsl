
varying vec3 vPos;
uniform vec3 uSize;
uniform float uThickness;
uniform float uSmoothness;
uniform float uColour;

void main() {

  float a = smoothstep(uThickness, uThickness + uSmoothness, length(abs(vPos.xy) - uSize.xy));
  a *= smoothstep(uThickness, uThickness + uSmoothness, length(abs(vPos.yz) - uSize.yz));
  a *= smoothstep(uThickness, uThickness + uSmoothness, length(abs(vPos.xz) - uSize.xz));

  vec3 c = mix(vec3(1), vec3(0), a);

  gl_FragColor = vec4(c, 1.0);
}