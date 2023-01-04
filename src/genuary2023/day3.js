/**
 * Genuary 2023: Day 3
 * "Glitch Art"
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
// Libraries
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';

// Assets
const textureImageBSOD = require('./bsod.png');

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 1, 1000);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Lights
scene.add(new THREE.AmbientLight(0x222222));
const light = new THREE.DirectionalLight(0xffffff);
light.position.set(1, 1, 1);
scene.add(light);

// load a image resource
const BSOD_texture = new THREE.TextureLoader().load(textureImageBSOD);
const BSOD_material = new THREE.MeshBasicMaterial({ map: BSOD_texture });
const BSOD_geometry = new THREE.PlaneGeometry(sizes.width / 2, sizes.height / 2);
const BSOD_mesh = new THREE.Mesh(BSOD_geometry, BSOD_material);
scene.add(BSOD_mesh);

// Camera
const camera = new THREE.PerspectiveCamera(70, sizes.width / sizes.height, 0.1, 1000);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 380;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// postprocessing
let goWild = true;
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const glitchPass = new GlitchPass();
composer.addPass(glitchPass);

// Wild settings
glitchPass.goWild = goWild;
goWildTimer();

// Objects
const object = new THREE.Object3D();
scene.add(object);
const geometry = new THREE.SphereGeometry(1, 4, 4);
for (let i = 0; i < 25; i++) {
  const material = new THREE.MeshPhongMaterial( { color: 0x00aa11 * Math.random(), flatShading: true });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(Math.random() - 0.3, Math.random() - 0.3, Math.random() - 0.3).normalize();
  mesh.position.multiplyScalar(Math.random() * 250);
  mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
  object.add(mesh);
}

// Objects
const geometryTorus = new THREE.TorusGeometry( 100, 40, 16, 50 );
const materialWireframe = new THREE.MeshBasicMaterial()
materialWireframe.color = new THREE.Color(0xefefef)
materialWireframe.wireframe = true;
const sphere = new THREE.Mesh(geometryTorus,materialWireframe)
scene.add(sphere)

// Glitch
function goWildTimer() {
  goWild = !goWild;
  glitchPass.goWild = goWild;
  setTimeout(goWildTimer, goWild ? 2000 : 6000);
}

// Resize event
window.addEventListener('resize', () =>
{
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
 * Animate
 */

const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  object.rotation.x += 0.005;
  object.rotation.y += 0.01;
  sphere.rotation.y = 0.5 * elapsedTime;
  sphere.scale.x = (Math.sin(elapsedTime * 1.0) + 1) / 2 + 0.5;
  sphere.scale.y = (Math.sin(elapsedTime * 2) + 1) / 2 + 0.5;
  sphere.scale.z = (Math.sin(elapsedTime * 1.5) + 1) / 2 + 0.5;

  // Render
  composer.render();

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
