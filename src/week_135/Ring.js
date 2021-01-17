/**
 * Ring class
 */
class Ring {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.growSpeed = random(5, 10);
    this.size = 0;
    this.colour = random(180, 300);
  }

  update() {
    this.size += this.growSpeed;
  }

  render() {
    strokeWeight(this.size / 80);
    stroke(this.colour, 50, 100, 0.75);
    ellipse(this.x, this.y, this.size);
  }
}
