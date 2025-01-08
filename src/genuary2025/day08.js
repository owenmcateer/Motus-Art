// ThreeJS
import * as THREE from 'three';

// Effects
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

// Shaders
const waterVertexShader = `
uniform float uSize;
uniform float uTime;
attribute float aScale;
varying vec4 vPos;
attribute float aRandom;
varying float vRandom;
#define TWO_PI 6.28318530718

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float offset = sin(modelPosition.x + uTime * 0.25) * cos(modelPosition.z + uTime * 2.0) * 0.3;
    offset += sin(modelPosition.x + uTime * 0.5) * 0.2;
    offset += sin(modelPosition.x + uTime * 0.75) * 0.1;
    offset += sin(modelPosition.x + uTime * 1.0) * 0.05;
    modelPosition.y += offset;


    // Add random jitter based on uTime, every few seconds
    float jitterAmount = 1.0 - smoothstep(0.0, 0.8, abs(sin(uTime * 0.5)));
    modelPosition.x += sin(uTime * 0.1 + aRandom * TWO_PI) * jitterAmount;
    modelPosition.y += cos(uTime * 0.1 + aRandom * TWO_PI) * jitterAmount;
    modelPosition.z += tan(uTime * modelPosition.z) * jitterAmount;


    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    gl_PointSize = uSize * aScale;
    gl_PointSize *= 1.0 / - viewPosition.z;

    vPos = modelPosition;
}
`;

const waterFragmentShader = `
uniform float uTime;
varying vec4 vPos;

vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}

void main()
{
    float circle = distance(gl_PointCoord, vec2(0.5));
    circle = 1.0 - circle;
    circle = pow(circle, 12.0);

    float palettePhase = abs(sin(uTime * 0.5 + vPos.x * 0.2 + vPos.y * 0.3 + vPos.z * 0.1));
    palettePhase = smoothstep(0.0, 1.0, palettePhase);
    vec3 col = vec3(1.0) * palettePhase;
    col *= circle;

    gl_FragColor = vec4(col, 0.9);
}
`;


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.outputColorSpace = THREE.LinearSRGBColorSpace
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


/**
 * Light wave
 */
const particle_count = 1_000_000
let geometry = null
let material = null
let points = null
const generateLightWave = () =>
{
    /**
     * Clean up
     */
    if(points !== null)
    {
        geometry.dispose()
        material.dispose()
        scene.remove(points)
    }

    /**
     * Geometry
     */
    geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particle_count * 3)
    const scales = new Float32Array(particle_count)
    const randomValues = new Float32Array(particle_count)

    for(let i = 0; i < particle_count; i++)
    {
        const i3 = i * 3

        // Position
        positions[i3    ] = (Math.random() - 0.5) * 5
        positions[i3 + 1] = (Math.random() - 0.5) * 0.01
        positions[i3 + 2] = (Math.random() - 0.5) * 21
        positions[i3    ] = (Math.random() - 0.5) * 0
        positions[i3 + 1] = Math.cos(Math.random() * Math.PI * 2)
        positions[i3 + 2] = Math.sin(Math.random() * Math.PI * 2)

        // Random point on a sphere
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const radius = Math.cbrt(Math.random()) * 3;

        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);

        // Scale
        scales[i] = Math.random() * 1 + 0.5

        // Random values
        randomValues[i] = Math.random()
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randomValues, 1))


    /**
     * Material
     */
    material = new THREE.ShaderMaterial({
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        vertexShader: waterVertexShader,
        fragmentShader: waterFragmentShader,
        uniforms:
        {
            uSize: { value: 10 * renderer.getPixelRatio() },
            uTime: { value: 0 }
        }
    })

    /**
     * Points
     */
    points = new THREE.Points(geometry, material)
    scene.add(points)
}
generateLightWave()


/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(5.5, 0, 0);
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);

const rotateCamera = () => {
  const elapsedTime = clock.getElapsedTime();
  const radius = 5.5;
  camera.position.x = radius * Math.cos(elapsedTime * 0.2);
  camera.position.z = radius * Math.sin(elapsedTime * 0.2);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
};


/**
 * Post processing
 */
const renderScene = new RenderPass( scene, camera );
const params = {
    threshold: 0.3,
    strength: 0.45,
    radius: 1.5,
};
const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = params.threshold;
bloomPass.strength = params.strength;
bloomPass.radius = params.radius;

const outputPass = new OutputPass();

const composer = new EffectComposer( renderer );
composer.addPass( renderScene );
composer.addPass( bloomPass );
composer.addPass( outputPass );


/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update material
    material.uniforms.uTime.value = elapsedTime

    rotateCamera();
    // Render
    composer.render();

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
