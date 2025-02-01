/**
 * Genuary 2025: Day 30
 * Abstract map
 *
 * https://owenmcateer.github.io/Motus-Art
 */


// Array and textureless GLSL 2D simplex noise function.
// Author : Ian McEwan, Ashima Arts.
vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec2 mod289(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec3 permute(vec3 x) {
  return mod289(((x*34.0)+10.0)*x);
}
float noise(vec2 v)
  {
  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                     -0.577350269189626,  // -1.0 + 2.0 * C.x
                      0.024390243902439); // 1.0 / 41.0
// First corner
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);

// Other corners
  vec2 i1;
  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0
  //i1.y = 1.0 - i1.x;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  // x0 = x0 - 0.0 + 0.0 * C.xx ;
  // x1 = x0 - i1 + 1.0 * C.xx ;
  // x2 = x0 - 1.0 + 2.0 * C.xx ;
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

// Permutations
  i = mod289(i); // Avoid truncation effects in permutation
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
		+ i.x + vec3(0.0, i1.x, 1.0 ));

  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;

// Gradients: 41 points uniformly over a line, mapped onto a diamond.
// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

// Normalise gradients implicitly by scaling m
// Approximation of: m *= inversesqrt( a0*a0 + h*h );
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );

// Compute final noise value at P
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}


// Code
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = fragCoord.xy / iResolution.xy;

    // Scale and offset UVs for better noise visualization
    uv *= 1.5; // Terrain scale & scrolling
    uv.x += iTime * 0.1;
    uv.y -= iTime * 0.05;
    float noiseValue = noise(uv);

    // Quantize noise into discrete height levels
    float numLevels = 20.0; // Number of contour lines
    float level = floor(noiseValue * numLevels) / numLevels;

    // Calculate the color based on the level.
    float contourWidth = 0.2;
    float lineIntensity = 10.0;
    float distToLevel = abs(sin(noiseValue * 26.0) - level * (1.0/numLevels));
    float line = smoothstep(contourWidth, 0.0, distToLevel) * lineIntensity;

    // Background color
    vec3 backgroundColor = vec3(0.0);

    //Line color
    vec3 lineColor = vec3(0.9);
    vec3 color = mix(backgroundColor, lineColor, line);

    // Circle mask
    vec2 circleMask = (fragCoord - iResolution.xy * 0.5) / iResolution.y;
    float g = dot(circleMask, circleMask);
    g = (g < 0.22)
      ? 1.0
      : 0.0;

    // Return color
    fragColor = vec4( mix(vec3(0.0), color, g), 1.0);
}
