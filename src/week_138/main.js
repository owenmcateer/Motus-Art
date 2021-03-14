/**
 * Motus: 360
 */
const radius = 220;
let set = 5;
const sets = [
  { l: 100 },
  { l: 50 },
  { l: 50 },
  { l: 75 },
  { l: 50 },
  { l: 50 },
];

// Setup
function setup() {
  createCanvas(520, 520);
  pixelDensity(2);
}

// Draw tick
function draw() {
  background(39);
  stroke(255, 240);
  strokeWeight(3);

  translate(width / 2, height / 2);

  const step = TWO_PI / sets[set].l;
  for (let i = 0; i < TWO_PI; i += step) {
    let a = 0;
    if (i > PI) {
      a = PI;
    }

    switch (set) {
      case 0:
        // Eased
        line(
          cos(easeOutCubic(i, 0, TWO_PI, TWO_PI)) * radius,
          sin(easeOutCubic(i, 0, TWO_PI, TWO_PI)) * radius,
          0,
          0,
        );
        break;

      case 1:
        line(
          cos(i) * radius,
          sin(i) * radius,
          cos(a) * radius,
          sin(a) * radius,
        );
        break;

      case 2:
        line(
          cos(i) * radius,
          sin(i) * radius,
          cos(-HALF_PI) * radius,
          sin(-HALF_PI) * radius,
        );
        line(
          cos(i) * radius,
          sin(i) * radius,
          cos(HALF_PI) * radius,
          sin(HALF_PI) * radius,
        );
        break;

      case 3:
        line(
          cos(i) * radius,
          sin(i) * radius,
          0,
          radius,
        );
        break;

      case 4:
        line(
          cos(i) * radius,
          sin(i) * radius,
          cos(i + HALF_PI) * radius,
          sin(i + HALF_PI) * radius,
        );
        break;

      default:
    }
  }

  // Sunset
  if (set === 5) {
    // Sun
    for (let i = PI; i < TWO_PI; i += PI / 25) {
      line(
        cos(PI - i) * radius,
        sin(PI - i) * radius,
        0,
        0,
      );
    }
    // Ocean
    for (let i = 0; i < 25; i++) {
      const s = easeOutCubic(i / 25, 0, 1, 1) * radius;
      const chordLength = Math.sqrt((2 * s * radius) - (s * s));

      line(
        -chordLength, radius - s,
        chordLength, radius - s,
      );
    }
  }

  // Outline
  noFill();
  ellipse(0, 0, radius * 2);

  // Timer
  if (frameCount % 120 === 0) {
    set++;
  }
  if (set >= 5) {
    set = 0;
  }
}


function easeOutCubic(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}
