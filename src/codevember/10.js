/**
 * Motus: #codevember 10 Apples
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const cx = canvasSize / 2;

// Matter.js
const {
  Engine,
  Body,
  Composites,
  World,
  Bodies,
} = Matter;

// Vars
let engine;
let appleImg;
let apples;
let deviceAlpha = false;

// Pre-load assets
function preload() {
  appleImg = loadImage('../assets/img/codevember/apple.png');
}

// Draw tick
function setup() {
  createCanvas(canvasSize, canvasSize);  
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);
  imageMode(CENTER);


  // Create MatterJS engine
  engine = Engine.create();

  // Hungry for apples? 🍎🍎🍎
  apples = Composites.pyramid(130, 130, 6, 4, 10, 10, (x, y) => {
    const outlineA = Bodies.circle(x, y, 70);
    return Body.create({
      parts: [outlineA],
    });
  });

  // Add to world
  World.add(engine.world, [
    // Add apples
    apples,
    // Outer walls
    Bodies.rectangle(cx, 0, canvasSize, 15, { isStatic: true }),
    Bodies.rectangle(canvasSize, cx, 15, canvasSize, { isStatic: true }),
    Bodies.rectangle(0, cx, 15, canvasSize, { isStatic: true }),
    Bodies.rectangle(cx, canvasSize, canvasSize, 15, { isStatic: true }),
  ]);

  // Go go engine!
  Engine.run(engine);

  // Device rotation
  window.addEventListener('deviceorientation', (event) => {
    deviceAlpha = event.alpha;
  });

  // Auto rotate
  autoRotateGravity();
}


// Draw tick
let firstRun = true;
function draw() {
  // BG
  background(51);

  // first run?
  if (firstRun) {
    apples.bodies.forEach((apple) => {
      Body.rotate(apple, random(0, PI));
      apple.restitution = 0.7;
    });
    firstRun = false;
  }

  // Draw appels
  apples.bodies.forEach((apple) => {
    push();
    translate(apple.position.x, apple.position.y - 14);
    rotate(apple.angle + radians(135));
    image(appleImg, 0, 0);
    pop();
  });

  if (deviceAlpha !== false) {
    const gX = cos(HALF_PI + radians(deviceAlpha)) * 4;
    const gY = sin(HALF_PI + radians(deviceAlpha)) * 4;
    engine.world.gravity.x = gX;
    engine.world.gravity.y = gY;
  }
}
    
// Shift gravity
const gravityDir = [
  { x: 0, y: 1 },
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
];
function autoRotateGravity() {
  if (deviceAlpha !== false) return;
  // Switch gravity
  const randomGravity = gravityDir[Math.floor(Math.random() * gravityDir.length)];
  engine.world.gravity.x = randomGravity.x;
  engine.world.gravity.y = randomGravity.y;
  setTimeout(autoRotateGravity, 1000);
}
