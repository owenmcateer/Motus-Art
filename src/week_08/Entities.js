/**
 * Entities class
 *
 * @param {int} x
 * @param {int} y
 */
class Entity {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.cx = x;
    this.cy = y;

    this.pos = createVector(cx, cy);
    this.end = createVector(x, y);
    this.size = 0;
    this.sizeEnd = 0;
    this.colour = color(255);

    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 15;
    this.maxforce = 20;
  }

  // Update tick
  update() {
    const desired = p5.Vector.sub(this.end, this.pos);
    const d = desired.mag();

    // Slow down easing
    if (d < 100) {
      const m = map(d, 0, 100, 0, this.maxspeed);
      desired.setMag(m);
    } else {
      desired.setMag(this.maxspeed);
    }

    // New vector
    const newVector = p5.Vector.sub(desired, this.vel);
    newVector.limit(this.maxforce);
    this.acc.add(newVector);
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    // Change size
    this.size += (this.sizeEnd - this.size) * 0.1;

    // Change colour
    const xPos = this.pos.x - this.cx;
    const yPos = -(this.pos.y - this.cy);
    const hue = atan2(yPos, xPos);
    const c = color(map(hue, -PI, PI, 150, 211), 80, 80);
    this.colour = c;
  }

  // Render entity
  display() {
    noStroke();
    fill(this.colour);
    ellipse(this.pos.x, this.pos.y, this.size, this.size);
  }

  // Set new end vector
  newEnd(x, y, s) {
    this.end = createVector(x, y);
    this.sizeEnd = s * 1.2;
  }
}
