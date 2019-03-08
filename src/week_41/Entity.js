/**
 * Entity class
 */
class Entity {
  // Create entity
  constructor(x, y) {
    this.pos = createVector(random(canvas), random(canvas));
    this.target = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.size = 15;
    this.maxSpeed = 6;
    this.maxForce = 0.5;
  }


  // Behaviors
  behaviors() {
    // Seek home
    const seek = this.seek(this.target);
    seek.mult(1);
    this.applyForce(seek);

    // Cursor forces
    const cursor = this.cursor(mousePos);
    cursor.mult(5);
    this.applyForce(cursor);
  }


  // Apply force
  applyForce(f) {
    this.acc.add(f);
  }


  // Seek home point
  seek(target) {
    const desired = p5.Vector.sub(target, this.pos);
    const d = desired.mag();
    let speed = this.maxSpeed;
    if (d < 100) {
      speed = map(d, 0, 100, 0, this.maxSpeed);
    }

    desired.setMag(speed);
    const steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  }


  // Cursor forces
  cursor(target) {
    const desired = p5.Vector.sub(target, this.pos);
    if (desired.mag() < 100) {
      desired.setMag(this.maxSpeed);

      // Attract entities with mouse press
      if (!mouseIsPressed) {
        desired.mult(-1);
      }

      // Steer
      const steer = p5.Vector.sub(desired, this.vel);
      steer.limit(2);
      return steer;
    }
    return vectorZero;
  }


  // Update entity position
  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }


  // Output entities
  render() {
    strokeWeight(this.size);
    stroke(...colours.entity);
    point(this.pos.x, this.pos.y);
  }
}
