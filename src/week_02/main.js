/**
 * Motus: Photoluminescent trail
 * https://owenmcateer.github.io/Motus-Art
 *
 * Maths equation by Erik Neumann
 * https://www.myphysicslab.com/pendulum/double-pendulum-en.html
 * Inspiration
 * https://www.youtube.com/watch?v=hXOEoH5q3Hw
 */
const canvas = 1080;

let r1;
let r2;
let m1;
let m2;
let a1 = 0;
let a2 = 0;
let a1vel = 0;
let a2vel = 0;
const g = 1;

let px2 = 0;
let py2 = 0;
let cx;
let cy;
let buffer;
let colours = [];

// Setup
function setup() {
  createCanvas(canvas, canvas);
  colorMode(RGB, 255, 255, 255, 1);
  pixelDensity(1);

  // Values are slightly random, meaning every viewing is slightly different
  r1 = random(198, 202);
  r2 = random(260, 244);
  m1 = random(19, 21);
  m2 = random(39, 41);
  // eslint-disable-next-line
  console.log('Values used');
  // eslint-disable-next-line
  console.log({
    r1,
    r2,
    m1,
    m2,
  });

  // Starting angles
  a1 = PI / 2;
  a2 = PI / 4;

  cx = width / 2;
  cy = height * 0.35;

  colours = [
    color(229, 252, 255, 0.3),
    color(122, 79, 242, 0.7),
    color(230, 9, 116, 0.7),
    // BG
    color(20, 34, 51),
  ];

  // Create graphic
  buffer = createGraphics(width, height);
  buffer.background(colours[3]);
  buffer.translate(cx, cy);
}

// Draw tick
function draw() {
  background(colours[3]);
  imageMode(CORNER);
  image(buffer, 0, 0, width, height);

  // Double pendulum equation
  // Arm one
  let num1 = -g * (2 * m1 + m2) * sin(a1);
  let num2 = -m2 * g * sin(a1 - 2 * a2);
  let num3 = -2 * sin(a1 - a2) * m2;
  let num4 = a2vel * a2vel * r2 + a1vel * a1vel * r1 * cos(a1 - a2);
  let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  const a1acc = (num1 + num2 + num3 * num4) / den;
  // Arm two
  num1 = 2 * sin(a1 - a2);
  num2 = (a1vel * a1vel * r1 * (m1 + m2));
  num3 = g * (m1 + m2) * cos(a1);
  num4 = a2vel * a2vel * r2 * m2 * cos(a1 - a2);
  den = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  const a2acc = (num1 * (num2 + num3 + num4)) / den;

  // Add acceleration
  a1vel += a1acc;
  a2vel += a2acc;
  a1 += a1vel;
  a2 += a2vel;

  // Calculate pixel positions
  const x1 = r1 * sin(a1);
  const y1 = r1 * cos(a1);
  const x2 = x1 + (r2 * sin(a2));
  const y2 = y1 + (r2 * cos(a2));

  // Draw pendulum.
  translate(cx, cy);
  stroke(colours[0]);
  strokeWeight(1);
  // Arm one
  line(0, 0, x1, y1);
  fill(colours[0]);
  ellipse(x1, y1, (m1 / 2), (m1 / 2));
  // Arm two
  line(x1, y1, x2, y2);
  fill(colours[0]);
  ellipse(x2, y2, (m2 / 2), (m2 / 2));

  // Draw trail
  if (frameCount > 1) {
    // Colour transition
    const trans = map(x2, (r1 + r2) * -1, r1 + r2, 0, 1);
    const lineColour = lerpColor(colours[1], colours[2], trans);
    buffer.stroke(lineColour);
    buffer.strokeWeight(2);
    buffer.line(px2, py2, x2, y2);
  }
  // Set previous position (used above for line)
  px2 = x2;
  py2 = y2;
}
