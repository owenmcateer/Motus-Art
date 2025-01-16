class CircleMath {
  constructor() {
    this.diameter = 980;
    this.radius = this.diameter / 2;
    this.offsetX = 60;
    this.offsetY = 60;
  }

  // Max size of the circle
  // Ref: https://www.youtube.com/watch?v=4y_nmpv-9lI
  randomPointInCircle(edgeLimit = 0) {
    // Get a random point
    const x = random(0, this.diameter);
    const y = random(0, this.diameter);

    // Check if it in with in the circle
    if (this.isPointInCircle(x, y, edgeLimit)) {
      return { x, y };
    }
    return this.randomPointInCircle(edgeLimit);
  }

  // Check if a point is within the circle
  isPointInCircle(x, y, edgeLimit = 0) {
    return dist(this.radius, this.radius, x, y) < this.radius - edgeLimit;
  }
}
