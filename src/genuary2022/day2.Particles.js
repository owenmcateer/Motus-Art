class Particle {
  constructor(x, y) {
    this.x = x * scale;
    this.y = y * scale;
    this.windX = random(-4, 4);
    this.windY = random(12, 23);
    this.maxY = random(height - 30, height);
  }

  update() {
    this.x += this.windX;
    this.y += this.windY;

    // Max height
    if (this.y > this.maxY) {
      this.y = this.maxY;
    }
  }

  render() {
    fill(239);
    noStroke();
    rect(this.x, this.y, scale, scale);
  }
}
