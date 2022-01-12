/**
 * Genuary Day 12
 * "Packing"
 *
 * @motus_art
 */
const canvasSize = 540;
const area = canvasSize / 3.5;
const balls = [];


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);

  // Create starting balls
  for (let i = 0; i < 4; i++) {
    balls.push(new Ball());
  }
}


// Draw tick
function draw() {
  background(39);
  stroke(239, 80);
  strokeWeight(0.5);
  noFill();

  // Rotate camera
  rotateY(frameCount / 200);
  rotateX(sin(frameCount / 200) / 4);

  // Render balls
  balls.forEach((b) => {
    b.update();
    b.render();
  });

  // Add more balls
  if (balls.length < 100 && frameCount % 10 === 0) {
    balls.push(new Ball());
  }

  // Reset
  if (frameCount % 1400 === 0) {
    while (balls.length) { balls.pop(); }
  }
}


// Balls
class Ball {
  constructor() {
    this.alive = true;
    this.pos = p5.Vector.random3D();
    this.radius = 0;
    this.growthSpeed = random(0.002, 0.006);
  }

  update() {
    if (!this.alive) return;

    this.radius += this.growthSpeed;

    // Check hits
    balls.forEach((b) => {
      if (this !== b) {
        if (this.pos.dist(b.pos) - (this.radius + b.radius) <= 0) {
          this.alive = false;
        }
      }
    });
  }

  render() {
    if (this.radius < 0.01) return;

    push();
    translate(this.pos.x * area, this.pos.y * area, this.pos.z * area);
    rotate(this.pos.heading());
    sphere(this.radius * area, 16, 16);
    pop();
  }
}
