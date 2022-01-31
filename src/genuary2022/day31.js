/**
 * Genuary Day 31
 * "Negative space."
 *
 * @motus_art
 */
const canvasSize = 540;
const cx = canvasSize / 2;
const boxSize = 80;
let axisCount = 0;
let timer = 0;
const speed = 0.005;
let magicAngle;

// Boxes
const boxes = [
  // X group
  {
    x: 2,
    y: 0,
    z: 0,
  },
  // Y group
  {
    x: 0,
    y: 0,
    z: 2,
  },
  // Z group
  {
    x: 0,
    y: 2,
    z: 0,
  },
];

const patternSets = [
  {
    x: 0,
    y: 0,
  },
  {
    x: 6,
    y: 0,
  },
  {
    x: 6,
    y: -6,
  },
  {
    x: 0,
    y: -6,
  },
];
// Stars
const starRows = [
  298,
  102,
  -94,
  -290,
];
const starColumns = [
  -289,
  -177,
  -63,
  50,
  163,
  276,
];


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  smooth();
  pixelDensity(2);

  // The magic angle
  magicAngle = atan(1 / sqrt(2));

  // Isometric projection
  ortho(-cx, cx, cx, -cx, -100, canvasSize * 3);
}


// Draw tick
function draw() {
  // Styles
  background(39);
  noStroke();
  fill(255);

  // Set viewing angle
  rotateX(magicAngle);
  rotateY(QUARTER_PI);

  // Animation type
  if (timer < 0.5) {
    // Cubes
    renderCubes();
  } else {
    // Stars
    renderStars();
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}


// Render the 3D cubes.
function renderCubes() {
  const timing = constrain(timer * 2, 0, 1);
  const rotateAmount = timing * HALF_PI;

  patternSets.forEach((pattern) => {
    push();
    translate(boxSize * pattern.x, boxSize * pattern.y, -250);
    boxes.forEach((boxSet) => {
      push();
      rotateY(rotateAmount);

      // 1st half
      translate(boxSize * boxSet.x, boxSize * boxSet.y, boxSize * boxSet.z);
      box(boxSize);

      // 2nd half
      translate(boxSize * boxSet.x * -2, boxSize * boxSet.y * -2, boxSize * boxSet.z * -2);
      box(boxSize);
      pop();
    });
    pop();
  });
}


// Render 2D stars.
function renderStars() {
  resetMatrix();
  fill(39);
  background(255);

  const timing = constrain(timer * 2, 1, 2) - 1;
  const rotateAmount = timing * (TWO_PI / 6);

  for (let starY = 0; starY < starRows.length; starY++) {
    for (let starX = 0; starX < starColumns.length / 2; starX++) {
      push();
      translate(starColumns[(starX * 2) + (starY % 2)], starRows[starY]);
      rotate(rotateAmount);
      star(0, 0, 66, 114, 6);
      pop();
    }
  }
}


// Draw a single star.
function star(x, y, radius1, radius2, npoints) {
  const angle = TWO_PI / npoints;
  const halfAngle = angle / 2.0;
  beginShape(TESS);
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape();
}
