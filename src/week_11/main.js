/**
 * Motus: Traveling waves
 * https://owenmcateer.github.io/Motus-Art
 *
 * 15 pendulums increasing lengths released together to create
 * traveling/standing/random waves. After 95 second the loop
 * will appear to start again. With added friction it will
 * eventually slow to a stop.
 *
 * https://www.youtube.com/watch?v=yVkdfJ9PkRQ
 * Video of Pendulum Waves apparatus from Harvard Natural Sciences.
 */
const canvas = 1080;
const colours = {};
let cx;
const pendants = [];
const l = 800;
const lu = l / 343.58;
const rods = [
  l,
  lu * 330.49,
  lu * 318.14,
  lu * 306.47,
  lu * 295.42,
  lu * 284.97,
  lu * 275.05,
  lu * 265.65,
  lu * 256.72,
  lu * 248.24,
  lu * 240.16,
  lu * 232.48,
  lu * 225.16,
  lu * 218.18,
  lu * 211.52,
];
// Setup
function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  cx = width / 2;

  // Colours
  colours.bg = color('#a3c3c7');
  colours.table = color('#8cafb5');
  colours.pendantStart = color('#465258');
  colours.pendantEnd = color('#4a6e78');
  colours.pendantStroke = color(74, 110, 120, 200);
  colours.shadow = color(0, 0, 0, 20);

  // Create pendants
  for (let i = 15; i >= 0; i--) {
    pendants.push(new Pendulum(cx, -40, rods[i], i));
  }
}

// Draw tick
function draw() {
  background(colours.bg);
  // Draw table
  noStroke();
  fill(colours.table);
  rect(0, 620, width, height);

  // Shadow must be drawn under
  for (let i = 0; i < pendants.length; i++) {
    pendants[i].update();
    pendants[i].renderShadow();
  }
  // Draw pendants on top
  for (let i = 0; i < pendants.length; i++) {
    pendants[i].render();
  }
}

class Pendulum {
  constructor(x, y, rod, item) {
    // Set starting values/movement
    this.anchor = createVector(x, y);
    this.acc = 0.0;
    this.vel = 0.0;
    this.size = 70;
    this.bob = createVector();
    this.angle = PI / 8;
    this.rod = rod;
    this.item = item;
  }

  update() {
    // Gravity
    this.acc = (-3 / this.rod) * sin(this.angle);
    // Update Angle + velocity
    this.vel += this.acc;
    // Friction
    this.vel *= 0.9998;
    // Update angle
    this.angle += this.vel;
    // Calculate X&Y
    this.bob.x = this.anchor.x + (this.rod * sin(this.angle));
    this.bob.y = this.anchor.y + (this.rod * cos(this.angle));
  }

  render() {
    // Colour
    const amt = map(this.item, 0, 9, 1, 0);
    const colour = lerpColor(colours.pendantStart, colours.pendantEnd, amt);
    // Draw rod.
    strokeWeight(3);
    stroke(colour);
    line(this.anchor.x, this.anchor.y, this.bob.x, this.bob.y);
    // Draw bob.
    strokeWeight(2);
    stroke(colours.pendantStroke);
    fill(colour);
    ellipse(this.bob.x, this.bob.y, this.size, this.size);
  }

  // Draw shadow
  renderShadow() {
    const shadowY = this.anchor.y + 430 + ((this.rod * 0.8));
    noStroke();
    fill(colours.shadow);
    ellipse(this.bob.x, shadowY, this.size * 1.4, this.size / 3);
  }
}
