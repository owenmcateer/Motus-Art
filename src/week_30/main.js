/**
 * Motus: Happy Christmas
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const colours = [];
const cx = canvas / 2;

// Triangle points
const border = 80;
const p1 = [cx, border];
const p2 = [border * 2, canvas];
const p3 = [canvas - (border * 2), canvas];

// Other settigns
const numLights = 300;
const numSnow = 500;
const lights = [];
const snow = [];
let bgGfx;

// Setup
function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);
  frameRate(30);

  // Colours
  colours.bg = [13, 13, 31];
  colours.bg2 = [36, 43, 59];
  colours.lights = [
    // Light blue
    [63, 241, 242],
    // Dark blue
    [1, 87, 254],
    // Green
    [2, 229, 137],
    // Red
    [251, 6, 69],
    // Orange
    [254, 156, 1],
  ];

  // Create lights
  for (let i = 0; i < numLights; i++) {
    lights.push(new Light());
  }

  // Create snow
  for (let i = 0; i < numSnow; i++) {
    lights.push(new Snow());
  }

  // Background
  bgGfx = linearGradient(canvas, canvas, colours.bg, colours.bg2, 'y');
}


// Draw tick
function draw() {
  background(colours.bg);
  image(bgGfx, 0, 0);

  // Let it snow ❄
  snow.forEach((flake) => {
    flake.update();
    flake.render();
  });

  // Light it up! 💡
  lights.forEach((light) => {
    light.update();
    light.render();
  });
}

/**
 * Lights class
 */
class Light {
  constructor() {
    // Get random position
    const position = point_on_triangle();
    this.x = position[0];
    this.y = position[1];
    this.size = random(38, 45);

    // Get random colour
    this.randomColour();
    this.fade = 0.5;

    // Cycle?
    if (random() > 0.5) {
      this.cycle = random(10, 60);
    }
    else {
      this.cycle = false;
    }
  }

  // Update fade cycle
  update() {
    if (this.cycle) {
      this.fade = sin(frameCount / this.cycle);
      this.fade = map(this.fade, -1, 1, 0.2, 0.7);
    }
  }

  // Render light
  render() {
    strokeWeight(this.size);
    stroke(...this.colour, this.fade);
    point(this.x, this.y);
  }

  // Pick random colour
  randomColour() {
    this.colour = colours.lights[floor(random(colours.lights.length))];
  }
}

/**
 * Snow class
 */
class Snow {
  constructor() {
    this.reset();
    this.y = random(canvas);
  }

  reset() {
    this.y = 0;
    this.x = random(canvas);
    this.forceX = random(-1, 1);
    this.forceY = random(2, 4);
    this.size = random(4, 7);
    this.solid = random(0.01, 0.2);
  }

  update() {
    this.x += this.forceX;
    this.y += this.forceY;

    // Check bounds
    if (this.x < 0 || this.x > canvas || this.y < 0 || this.y > canvas) {
      this.reset();
    }
  }

  render() {
    strokeWeight(this.size);
    stroke(255, this.solid);
    point(this.x, this.y);
  }
}


/**
 * Random point within triangle
 */
function point_on_triangle() {
  // Random values
  const [s, t] = sort([random(), random()]);

  // Triangle point maths
  return [
    s * p1[0] + (t - s) * p2[0] + (1 - t) * p3[0],
    s * p1[1] + (t - s) * p2[1] + (1 - t) * p3[1]
  ];
}

/**
 * Renders a linear gradient.
 *
 * @param {Number} w            Width
 * @param {Number} h            Height
 * @param {Color}  c1           Start colour
 * @param {Color}  c2           End colour
 * @param {axis}   axis         x/y
 *
 * @return {graphic} gfx        p5 Graphic
 */
function linearGradient(w, h, c1, c2, axis) {
  // Create graphic
  const gfx = createGraphics(w, h);
  gfx.noFill();

  // Y axis, Top to bottom gradient
  if (axis === 'y') {
    for (let i = 0; i <= h; i++) {
      const inter = map(i, 0, h, 0, 1);
      const c = lerpColor(color(...c1), color(...c2), inter);
      gfx.stroke(c);
      gfx.line(0, i, w, i);
    }
  }
  // X axis, Left to right gradient
  else if (axis === 'x') {
    for (let i = 0; i <= w; i++) {
      const inter = map(i, 0, w, 0, 1);
      const c = lerpColor(color(...c1), color(...c2), inter);
      gfx.stroke(c);
      gfx.line(i, 0, i, h);
    }
  }

  // Return gradient
  return gfx;
}
