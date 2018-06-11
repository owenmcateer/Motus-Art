/**
 * Motus: Rainbow tunnel
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const colours = [];
const cx = canvas / 2;

const ringPoints = 30;
const ringPointAngle = 360 / ringPoints;
const rings = [];
const ringsVisible = 30;
const speed = 0.004;

let noiseStep = 0.0;
const noiseSpeed = 0.025;

// Setup
function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(HSB);

  // Colours
  colours.bg = [0];

  // Create init rings
  for (let i = ringsVisible; i > 0; i--) {
    rings.push(new Ring(i / ringsVisible));
  }
}

// Draw tick
function draw() {
  background(0);

  // Loop over rings
  for (let i = (rings.length - 1); i >= 0; i--) {
    if (rings[i].isAlive()) {
      // Update ring
      rings[i].update();
      rings[i].render();
    }
    else {
      // Remove and create new ring
      rings[i] = new Ring(0.0);
      rings[i].update();
      rings[i].render();
    }
  }
}

/**
 * Ring class
 */
class Ring {
  constructor(pct) {
    this.getNoiseXy();
    this.size = 0;
    this.radius = 0;
    this.alive = true;
    this.pct = pct;

    this.distX = cx - this.beginX;
    this.distY = cx - this.beginY;
  }

  getNoiseXy() {
    // Get noise
    const xNoise = noise(noiseStep);
    const yNoise = noise(noiseStep + 5);
    this.beginX = xNoise * canvas;
    this.beginY = yNoise * canvas;
    // Increase global noise vars
    noiseStep += noiseSpeed;
  }

  update() {
    // Update position
    this.easing = this.easeInCirc(this.pct, 0, 1, 1);
    this.pct += speed;
    if (this.pct < 1.0) {
      this.x = this.beginX + (this.easing * this.distX);
      this.y = this.beginY + (this.easing * this.distY);
      this.radius = (this.easing * (canvas / 1.35)) + 30;
      this.size = (this.easing * 60) + 5;
    }
    else {
      this.alive = false;
    }
  }

  isAlive() {
    return this.alive;
  }

  render() {
    // Ring offset
    const centerX = this.x - this.radius;
    const centerY = this.y - this.radius;

    // Colour
    noStroke();

    // Draw circles
    for (let angle = 0; angle <= 359; angle = angle + ringPointAngle) {
      fill(angle, 100, 100, this.pct);

      const pointX = cos(radians(angle)) * this.radius + centerX;
      const pointY = sin(radians(angle)) * this.radius + centerY;
      ellipse(pointX + this.radius, pointY + this.radius, this.size, this.size);
    }
  }

  easeInCirc(t, b, c, d) {
    return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
  }
}
