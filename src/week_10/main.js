/**
 * Motus: Linear geometry
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const colours = [];

// Setup
let x;
let y;
let x2;
let y2;
let cx;
let cy;
let angle1 = 0;
let angle2 = 0;
let angle1speed;
let angle2speed;
let pg;
let reset = 0;

// Sets
// These are some nice combinations I found.
// Let me know if you find any others.
const sets = [
  {
    a1: 0.08,
    a2: 0.05,
  },
  {
    a1: 0.09,
    a2: 0.05,
  },
  {
    a1: 0.03,
    a2: 0.05,
  },
  {
    a1: 0.03,
    a2: 0.08,
  },
  {
    a1: 0.03,
    a2: 0.10,
  },
  {
    a1: 0.07,
    a2: 0.06,
  },
  {
    a1: 3.141592 / 100,
    a2: 0.06,
  },
];

function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);
  cx = width / 2;
  cy = height / 2;

  // Create blank canvas
  pg = createGraphics(width, height);

  // Set colours
  colours[0] = color(229, 252, 255, 0.4);
  colours[1] = color(100, 230, 235, 0.3);
  colours[2] = color(181, 27, 226, 0.3);
  colours[3] = color(0, 4, 16);

  // Randomly pick a pattern
  pickPattern();
}

function draw() {
  background(colours[3]);

  // Output graphic
  image(pg, 0, 0, width, height);

  // Point colours
  fill(colours[0]);
  noStroke();

  // Outer point
  x = cx + (cos(angle1) * (cx * 0.9));
  y = cy + (sin(angle1) * (cx * 0.9));
  ellipse(x, y, 7, 7);
  angle1 += angle1speed;

  // Inner point
  x2 = cx + (cos(angle2) * (cx * 0.8));
  y2 = cy + (sin(angle2) * (cx * 0.8));
  ellipse(x2, y2, 7, 7);
  angle2 += angle2speed;

  // Draw lines
  const lerp = map(cos(angle1), -1, 1, 0, 1);
  pg.stroke(lerpColor(colours[1], colours[2], lerp));
  pg.line(x, y, x2, y2);


  // Reset?
  if (reset) {
    noStroke();
    fill(color(0, 4, 16, reset / 100));
    rect(0, 0, width, height);
    reset += 2;
    if (reset >= 100) {
      reset = 0;
      pg = createGraphics(width, height);
      pickPattern();
    }
  }
}

function pickPattern() {
  const rand = Math.floor(random(sets.length));
  const chosen = sets[rand];
  angle1speed = chosen.a1;
  angle2speed = chosen.a2;
}

function mouseClicked() {
  if (reset === 0) {
    reset = 1;
  }
}
function keyPressed() {
  if (keyCode === ENTER && reset === 0) {
    reset = 1;
  }
}
