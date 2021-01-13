/**
 * Dot class
 */
class Dot {
  constructor(posX, posY) {
    this.x = posX * gridSize;
    this.y = posY * gridSize;
    this.timer = 0;
    this.radius = radius;
    this.alive = false;
    this.speed = random(0.03, 0.05);
  }

  // Animate
  update() {
    if (this.alive) {
      this.timer += this.speed;

      if (this.timer >= 3.5) {
        this.alive = false;
      }
    }
  }

  // Bring to life
  setAlive() {
    if (!this.alive) {
      this.alive = true;
      this.timer = 0;
    }
  }

  // Render dot
  render() {
    noStroke();
    fill(239);

    // Outer dot
    const outerSize = easeOutBack(constrain(this.timer, 0, 1), 0, 1, 1) * this.radius;
    fill(239);
    ellipse(this.x, this.y, outerSize);

    // Inner dot
    const innerSize = easeOutCubic(constrain(this.timer, 1.5, 2.5) - 1.5, 0, 1, 1) * (radius + 1);
    fill(39);
    ellipse(this.x, this.y, innerSize);
  }
}


// Easing functions
function easeOutBack(t, b, c, d, s) {
  if (s == undefined) s = 1.70158;
  return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
}

function easeOutCubic(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}
