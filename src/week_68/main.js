/**
 * Motus: Uncomfortably close
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;

// Matter js
const { Engine, World, Bodies } = Matter;
let engine;
let world;
const boxes = [];

// Plates
const staticObj = [
  {
    x: 130,
    y: 320,
    angle: Math.PI * 0.25,
    width: 300,
    height: 20,
  },
  {
    x: canvasSize - 130,
    y: 320,
    angle: Math.PI * -0.25,
    width: 300,
    height: 20,
  },
];

const gridSize = 20;
const gridBox = Math.round(canvasSize / gridSize);


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  frameRate(50);
  rectMode(CENTER);
  pixelDensity(2);

  engine = Engine.create();
  world = engine.world;

  // Create plates
  staticObj.forEach((obj) => {
    const options = {
      isStatic: true,
      angle: obj.angle,
      width: obj.width,
      height: obj.height,
    };
    obj.body = Bodies.rectangle(obj.x, obj.y, options.width, options.height, options);
    World.add(world, obj.body);
  });

  // Add first ball
  boxes.push(new Ball());
}


// Draw tick
function draw() {
  background(40, 180);
  noStroke();
  strokeCap(ROUND);
  fill(170);

  // BG grid
  stroke(50);
  for (let x = 0; x < gridSize; x++) {
    const xx = x * gridBox;
    line(xx, 0, xx, height);
  }

  for (let y = 0; y < gridSize; y++) {
    const yy = y * gridBox;
    line(0, yy, height, yy);
  }

  // Start engine and render balls
  Engine.update(engine);
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].check();
    boxes[i].show();
  }

  // Draw plates
  staticObj.forEach((obj) => {
    push();
    translate(obj.body.position.x, obj.body.position.y);
    rotate(obj.body.angle);
    rect(0, 0, obj.body.width, obj.body.height, obj.body.height / 2);
    pop();
  });

  // Add the balls
  if (frameCount % 40 === 0) {
    boxes.push(new Ball());
  }
}


// Ball class
class Ball {
  constructor() {
    const options = {
      friction: 1,
      restitution: 1,
      frictionAir: 0.002,
      force: { x: 0.01, y: 0.0004 },
    };
    this.size = 20;
    this.body = Bodies.circle(250, this.size * -0.5, this.size, options);
    this.alive = true;

    // Add object to matter
    World.add(world, this.body);
  }

  check() {
    if (this.body.position.y > (height + this.size)) {
      this.kill();
    }
  }

  kill() {
    this.col = 'red';
    World.remove(world, this.body);
    this.alive = false;
  }

  show() {
    if (!this.alive) return;

    const { position, angle } = this.body;

    push();
    translate(position.x, position.y);
    rotate(angle);

    noStroke();
    ellipse(0, 0, this.size * 2);

    stroke(100);
    line(0, -this.size, 0, this.size);
    line(-this.size, 0, this.size, 0);
    pop();
  }
}
