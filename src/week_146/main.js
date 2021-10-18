
/**
 * Base
 */
let timer = 0;
const speed = 0.007;
const planeSize = 1;
const numOfPlanes = 12 * 2;
const gap = (planeSize / numOfPlanes) * 2;


/**
 * Scene vars
 */
const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Shaders
 */
const edgeVertexShader = `
varying vec3 vPos;

void main()	{
  vPos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}
`;

const edgeFragmentShader = `
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
`;


/**
 * Window resize
 */
window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Vinyls
 */
// Method 1) Edge geomerty
// const geometry = new THREE.PlaneGeometry(1, 1);
// const edges = new THREE.EdgesGeometry( geometry );
// const vinyl = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );

// Method 2) Shader
const geometry = new THREE.PlaneGeometry(planeSize, planeSize);
const material = new THREE.ShaderMaterial({
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  uniforms:
  {
    uSize: {
      value: new THREE.Vector3(geometry.parameters.width, geometry.parameters.height, geometry.parameters.depth).multiplyScalar(0.5),
    },
    uThickness: { value: 0.01 },
    uSmoothness: { value: 0.01 },
    uColour: { value: new THREE.Color(0xefefef) },
  },
  vertexShader: edgeVertexShader,
  fragmentShader: edgeFragmentShader,
});
const vinyl = new THREE.Mesh(geometry, material);

// Single vinyl
vinyl.position.set(0, -0.5, -0.5);
vinyl.rotation.y = Math.PI / 2;

// Pivot point
const pivot = new THREE.Group();
pivot.position.set(0, 0, 0);
pivot.add(vinyl);

// Create all vinyls
const vinyls = [];
for (let i = 0; i < numOfPlanes; i++) {
  vinyls[i] = pivot.clone();
  vinyls[i].position.x += gap * i;
  scene.add(vinyls[i]);
}


/**
 * Camera
 */
const d = 550;
const camera = new THREE.OrthographicCamera(
  sizes.width / -d,
  sizes.width / d,
  sizes.height / d,
  sizes.height / -d,
  1,
  1000,
);
camera.position.set(d + 0.5, d, d);
camera.rotation.order = 'YXZ';
camera.rotation.y = Math.PI / 4;
camera.rotation.x = Math.atan(-1 / Math.sqrt(2));


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x272727);


/**
 * Animation tick
 */
const tick = () => {
  // Animate planes
  for (let i = 0; i < numOfPlanes; i++) {
    let r = timer * 2;
    r -= ((numOfPlanes - i) * (1 / numOfPlanes));
    r = constrain(r, 0, 1);
    r = easeInOutCubic(1 - r, 0, 1, 1);

    vinyls[i].rotation.x = (r * (Math.PI / 2)) + (Math.PI / 2);
    vinyls[i].position.z = timer;
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

/**
 * Helpers
*/
function constrain(n, low, high) {
  return Math.max(Math.min(n, high), low);
}

function easeInOutCubic(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t + b;
  return c/2*((t-=2)*t*t + 2) + b;
}
