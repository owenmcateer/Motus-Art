/**
 * Motus: Dihedral refraction
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const colours = [];
const cx = canvas / 2;

const hexagonPoints = [];
const points = 7;
let motion = 0;
let speed;
const hexSize = cx * 0.95;
let activeAnchor = 0;
let angleOffset;
const pointSize = 50;

// Setup
function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(HSB, 360, 100, 100, 1);

  // Colours
  colours.bg = [0];

  // Speed
  speed = PI / 100;

  // Hexagon points
  angleOffset = TWO_PI / 6;
  for (let a = angleOffset; a < TWO_PI; a += angleOffset) {
    hexagonPoints.push(createVector(
      cx + cos(a) * hexSize,
      cx + sin(a) * hexSize,
    ));
  }
  // Set base motion
  motion = angleOffset;

  // Base BG
  background(0);
}


// Draw tick
function draw() {
  background(0, 0.07);
  noStroke();

  // Increase motion
  motion += speed;

  // Loop completed?
  activeAnchor = floor((motion - angleOffset) / (TWO_PI / 3));
  if (activeAnchor > hexagonPoints.length - 1) {
    // Reset loop
    motion = angleOffset;
    activeAnchor = 0;
  }

  // Guide
  // hexagonPoints.map(p => {
  //   ellipse(p.x, p.y, 10, 10);
  // });

  // Draw points
  for (let i = 0; i < points; i++) {
    // Flipped?
    let offset = HALF_PI
    if (activeAnchor % 2) {
      offset = -HALF_PI;
    }

    // Calculate postage
    const pos = getPosition(
      hexagonPoints[activeAnchor].x,
      hexagonPoints[activeAnchor].y,
      motion + offset,
      i * (hexSize / (points - 1)),
    );

    // Calculate colours
    fill(((i / points) * 260) + 80, 100, 100, 0.8);
    ellipse(pos.x, pos.y, pointSize, pointSize);
  }
}

function getPosition(x, y, rotation, radius) {
  const thisx = (radius * sin(rotation)) + x;
  const thisy = (radius * cos(rotation)) + y;
  return createVector(thisx, thisy);
}
