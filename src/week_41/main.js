/**
 * Motus: Woman's day
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 540;
const cx = canvas / 2;
const colours = {};

const density = 1.7;
const entities = [];
let mousePos;
let vectorZero;
let bg;


function setup() {
  createCanvas(canvas, canvas);
  colorMode(RGB, 255, 255, 255, 1);

  //  Colours
  colours.bgTop = [184, 88, 135];
  colours.bgBottom = [181, 77, 96];
  colours.entity = [49, 24, 71, 0.75];

  // Create entity points
  randomRing(cx, cx - 85, canvas * 0.35, canvas * 0.65);
  randomRect(cx - 40, 358, 80, 175);
  randomRect(cx - 115, 395, 75, 65);
  randomRect(cx + 40, 395, 75, 65);

  // Reusable zero-zero vector
  vectorZero = createVector(0, 0);

  // BG
  bg = linearGradient(canvas, canvas, colours.bgTop, colours.bgBottom, 'y');
}


function draw() {
  background(...colours.bgBottom);
  image(bg, 0, 0);

  // Style defaults
  noStroke();

  // Set mouse location
  mousePos = createVector(mouseX, mouseY);

  // Render entities
  entities.forEach((e) => {
    e.behaviors();
    e.update();
    e.render();
  });
}


// Generate ramdom points in the ring area
function randomRing(x, y, inner, outer) {
  const area = (sq(outer / 2) * PI) - (sq(inner / 2) * PI);
  const amount = sqrt(area) / (density / 3);

  for (let i = 0; i < amount; i++) {
    const randRadius = random(inner / 2, outer / 2);
    const randRadian = random(TWO_PI);

    const randX = cos(randRadian) * randRadius + x;
    const randY = sin(randRadian) * randRadius + y;
    entities.push(new Entity(randX, randY));
  }
}


// Generate ramdom points in the cross area
function randomRect(x, y, w, h) {
  const amount = sqrt(w * h) / density;

  for (let i = 0; i < amount; i++) {
    const randX = random(x, x + w);
    const randY = random(y, y + h);
    entities.push(new Entity(randX, randY));
  }
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
