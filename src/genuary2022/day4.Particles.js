class Particle {
  constructor(i) {
    this.i = i;
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(10), random(10));
    this.acc = createVector(0, 0);
    this.maxSpeed = 3;
    this.rad = 25;
    this.colour = colours[i % colours.length];
  }

  update() {
    this.edges();
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  edges() {
    if (this.pos.x > width + this.rad) this.pos.x = -this.rad;
    if (this.pos.x < -this.rad) this.pos.x = width + this.rad;
    if (this.pos.y > height + this.rad) this.pos.y = -this.rad;
    if (this.pos.y < -this.rad) this.pos.y = height + this.rad;
  }

  follow(flowfield) {
    const x = floor(this.pos.x / gridSize);
    const y = floor(this.pos.y / gridSize);
    const index = x + (y * gridCount);
    const force = flowfield[index];
    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  render() {
    noStroke();
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());

    // Background
    fill(0);
    ellipse(0, sin(frameCount / 10 + this.i) * 20, this.rad + 1);
    ellipse(0, sin(frameCount / 10 + this.i + PI) * 20, this.rad + 1);

    // Foreground
    fill(
      map(sin(frameCount / 50 + this.i), -1, 1, 43, 44),
      map(sin(frameCount / 50 + this.i), -1, 1, 30, 26),
      map(sin(frameCount / 50 + this.i), -1, 1, 34, 43),
    );
    ellipse(0, sin(frameCount / 10 + this.i) * 20, this.rad);
    ellipse(0, sin(frameCount / 10 + this.i + PI) * 20, this.rad);

    pop();
  }
}
