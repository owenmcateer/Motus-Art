/**
 * Motus: Water Simulation
 * For Flipot display
 */
const canvasSize = 400;
let debugParticles;
let debugFrame;

const fps = 18;
const gravity = new b2Vec2(0, -10);
const timeStep = 1 / fps;
const velocityIterations = 8;
const positionIterations = 3;
let simulation;
let world;

const simScale = 100;
const radius = 20;
const particleSize = radius / simScale;


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  frameRate(fps);
  // pixelDensity(1);
  smooth();
  world = new b2World(gravity);

  // Load simulation
  simulation = new window.Simulation();

  // Debug text
  debugParticles = createInput('particles: ');
  debugFrame = createInput('frame: ');
}


/**
 * Draw tick
 */
function draw() {
  background(0);
  // Styles
  noFill();
  stroke(255);
  strokeWeight(1);

  // Sim tick
  simulation.Step();

  // Draw particle systems
  for (let i = 0, max = world.particleSystems.length; i < max; i++) {
    drawParticleSystem(world.particleSystems[i]);
  }

  // Debug, particle count
  debugParticles.value(`Particles: ${world.particleSystems[0].GetPositionBuffer().length}`);
  debugFrame.value(`Frame: ${frameCount}`);
}


/**
 * Draw particle system
 */
function drawParticleSystem(system) {
  const particles = system.GetPositionBuffer();
  const maxParticles = particles.length;
  const transform = new b2Transform();
  transform.SetIdentity();

  // Draw each particle
  for (let i = 0, c = 0; i < maxParticles; i += 2, c += 4) {
    ellipse(particles[i] * simScale, -particles[i + 1] * simScale, particleSize * 20);
  }
}
