/**
 * Motus Art: 36 Petals
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const cx = canvasSize / 2;
const numberOfRings = 36;
const circles = [];
const speed = 3;
const rotateOffset = 360 / -4;
let rollBack = false;


function setup() {
  createCanvas(canvasSize, canvasSize);
  pixelDensity(2);
}


function draw() {
  background(40);
  stroke(240);
  strokeWeight(4);
  noFill();

  // Add ring
  if ((circles.length < numberOfRings) && frameCount % 10 === 0) {
    const pos = (circles.length / numberOfRings) * TWO_PI - HALF_PI;
    const posOffset = (circles.length / numberOfRings) * 360;
    const x = sin(pos) * 150 + cx;
    const y = cos(pos) * 150 + cx;

    circles.push(new Circle(x, y, rotateOffset + posOffset));
  }
  else if (rollBack !== false && rollBack < circles.length && frameCount % 10 === 0) {
    circles[rollBack].change(360, null);
    rollBack++;
  }

  // Update & render rings
  circles.forEach((c) => {
    c.update();
    c.draw();
  });
}

// Click to rollback
function mouseClicked() {
  rollBack = 0;
}

// Circle class
class Circle {
  constructor(x, y, offset) {
    this.x = x;
    this.y = y;
    this.r = 150;
    this.offset = offset;
    this.start = 0;
    this.end = 0;
    this.startTarget = this.start;
    this.endTarget = 360;
  }

  update() {
    // Start target
    if (this.start > this.startTarget) {
      this.start -= speed;
    }
    else if (this.start < this.startTarget) {
      this.start += speed;
    }
    // End target
    if (this.end > this.endTarget) {
      this.end -= speed;
    }
    else if (this.end < this.endTarget) {
      this.end += speed;
    }
  }

  // Change targets
  change(start, end) {
    if (start !== null) {
      this.startTarget = start;
    }
    if (end !== null) {
      this.endTarget = end;
    }
  }

  draw() {
    if ((this.start === 0 && this.end === 0) || (this.start === 360 && this.end === 360)) {
      // Circle is zero in size
    } else {
      // Draw arc
      arc(
        this.y,
        this.x,
        this.r,
        this.r,
        radians(this.start + this.offset),
        radians(this.end + this.offset),
      );
    }
  }
}
