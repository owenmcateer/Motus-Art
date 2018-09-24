/**
 * Motus: Summer rain
 * https://owenmcateer.github.io/Motus-Art
 */

// Settings
const canvas = 1080;
const rain = [];
const growSpeed = 0.007;
const maxSize = 600;

// Setup
function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);

  // Rain
  for (let i = 0; i < 30; i++) {
    rain.push(new RainDrop(round(random(600))));
  }
}

// Draw tick
function draw() {
  background(0);

  // Let it rain
  rain.forEach((drop) => {
    drop.update();

    if (drop.isAlive()) {
      drop.render();
    }
    else {
      drop.reset();
    }
  });
}

// Rain drop class
class RainDrop {
  constructor(delay) {
    this.startDelay = delay;
    // Init reset()
    this.reset();
  }

  update() {
    // Drop stage
    this.startDelay--;
    if (this.startDelay > 0) {
      // Delayed
      return;
    }
    if (this.dropY < this.y) {
      // Falling
      this.dropY += 20 * this.distance;
    }
    else {
      // Hit ground
      this.progress += growSpeed;
      this.easing = easeOutCubic(this.progress, 0, 1, 1);
    }
  }

  // Render rain drop/splash
  render() {
    noFill();
    strokeWeight(2);

    // Hit ground?
    if (this.dropY < this.y) {
      // Falling
      stroke(255, this.distance * 0.9);
      line(this.x, this.dropY - 20, this.x, this.dropY);
      const reflection = this.y + (this.y - this.dropY);
      stroke(255, this.distance * 0.3);
      line(this.x, reflection, this.x, reflection + 15);
    }
    else {
      // Splash
      stroke(255, 1 - this.easing);
      const size = (maxSize * this.easing) * this.distance;
      ellipse(this.x, this.y, size, size * 0.4);
    }
  }

  // Am I alive?
  isAlive() {
    return (this.progress <= 1);
  }

  // Reset drop
  reset() {
    this.x = random(50, width - 50);
    this.y = random(50, width - 50);
    this.dropY = this.y - height;
    this.progress = 0.0;
    this.distance = map(this.y, 0, height, 0.2, 1);
  }
}

// Easing function
function easeOutCubic(t, b, c, d) {
  return c*((t=t/d-1)*t*t + 1) + b;
}
