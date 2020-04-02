/**
 * Motus: Ovals
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const cx = canvasSize / 2;

const numOfCircles = 20;
const circleSize = canvasSize * 0.9;
const circles = [];
const speed = 0.03;
let showing = 0;


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  addCircle();

  frameRate(6);
}


// Draw tick
function draw() {
  background(39);
  stroke(239);
  strokeWeight(8);
  noFill();

  // Outer circle
  ellipse(cx, cx, circleSize);
  strokeWeight(4);

  // Add a new circle
  if (frameCount % 5 === 0) {
    addCircle();
  }

  // Update & render rings
  circles.forEach((c) => {
    c.update();
    c.draw();
  });
}


// Add circle
function addCircle() {
  if (showing <= numOfCircles) {
    circles.push(new Circle(showing));
    showing++;
  }
}


// Circle class
class Circle {
  constructor(i) {
    this.w = i * 10 + 1;
    this.h = circleSize;
    this.r = easeInOutCubic(i / numOfCircles, 0, 1, 1) * (PI / 2.5) + -HALF_PI;
    this.item = i;
    this.offset = HALF_PI;
    this.start = 0;
    this.end = 0;
  }

  update() {
    if (this.end <= TWO_PI) {
      this.end += speed;
    }
  }

  draw() {
    push();
    translate(cx,cx);
    rotate(this.r);

    if (this.end >= TWO_PI) {
      // Whole circle
      ellipse(
        0,
        0,
        this.w,
        this.h,
      );
    } else {
      // Draw arc
      arc(
        0,
        0,
        this.w,
        this.h,
        this.start + this.offset,
        this.end + this.offset,
      );
    }
    pop();
  }
}

// Easing
function easeInOutCubic(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t + b;
  return c/2*((t-=2)*t*t + 2) + b;
}
