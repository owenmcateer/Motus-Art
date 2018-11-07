/**
 * Motus: #codevember 03 Carrot
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const cx = canvas / 2;


const {
  Engine,
  // Runner,
  Body,
  Composites,
  World,
  Bodies,
} = Matter;

let engine;
let carrotSvg;
let carrots;
let deviceAlpha = false;
let phoneIcon;
let phoneRotate;

// Pre-load assets
function preload() {
  // Carrot image SVG
  carrotSvg = loadImage('../../assets/img/carrot.png'); // http://www.freepik.com
  phoneRotate = loadImage('../../assets/img/icons/phone-rotate.png');
  phoneIcon = loadImage('../../assets/img/icons/phone.png');
}

function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);
  imageMode(CENTER);

  // Create MatterJS engine
  engine = Engine.create();

  // Carrots! 🥕🥕🥕
  carrots = Composites.stack(130, 130, 6, 5, 10, 10, (x, y) => {
    const outlineA = Bodies.trapezoid(x, y, 100, 200, 1, {
      // angle
    });
    return Body.create({
      parts: [outlineA],
    });
  });

  // Add to world
  World.add(engine.world, [
    // Add carrots
    carrots,
    // Outer walls
    Bodies.rectangle(cx, 0, canvas, 15, { isStatic: true }),
    Bodies.rectangle(canvas, cx, 15, canvas, { isStatic: true }),
    Bodies.rectangle(0, cx, 15, canvas, { isStatic: true }),
    Bodies.rectangle(cx, canvas, canvas, 15, { isStatic: true }),
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
  background(51);

  if (firstRun) {
    carrots.bodies.forEach((carrot) => {
      Body.rotate(carrot, random(0, PI));
    });
    firstRun = false;
  }

  // Basic demo
  carrots.bodies.forEach((carrot) => {
    push();
    translate(carrot.position.x, carrot.position.y - 14);
    rotate(carrot.angle + radians(135));
    image(carrotSvg, 0, 0);
    pop();
  });

  // Device rotation?
  if (deviceAlpha === false) {
    // Phone icon
    fill(255);
    image(phoneIcon, cx, cx, 209, 370);

    push();
    imageMode(CENTER);
    translate(cx, cx);
    rotate(sin(frameCount / 50) * (PI / 4));
    image(phoneRotate, 0, 0, 760, 628);
    pop();
  }
  else {
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
  setTimeout(autoRotateGravity, 2000);
}
