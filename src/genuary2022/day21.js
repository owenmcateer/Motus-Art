/**
 * Genuary Day 21
 * "Combine two (or more) of your pieces from previous days to make a new piece.
 * Days 3 + Day 19 to make a ring world out of words.
 *
 * @motus_art
 *
 * Planet maths from https://github.com/cmllngf/planet_1
 */
const word = 'space';
let timer = 0;
const speed = 0.005;
let seed;
const beltCount = 200;
const planetCount = 2500;
const planetRadius = 150;


// Setup
function setup() {
  createCanvas(540, 540);
  colorMode(HSL, 360, 100, 100, 1);
  // Set constant seed
  seed = random(1000);
}

// Draw tick
function draw() {
  background(0);
  stroke(239);
  noStroke();
  fill(239);
  textAlign(CENTER);

  // Set constant seed
  randomSeed(seed);

  // Stars
  for (let i = 0; i < 500; i++) {
    stroke(0, 100, 100, random(0.5, 1));
    strokeWeight(random(2));
    point(random(width), random(height));
  }

  // Planet
  fill(0);
  noStroke();
  ellipse(width / 2, height / 2, planetRadius * 2);
  stroke(0);
  strokeWeight(2);
  for (let i = 0; i < planetCount; i++) {
    let a = random(TWO_PI) + timer;
    const y = random(-1, 1);
    const r = sqrt(1 - y * y);
    const c = (noise(y) * 360) / 2;
    a += timer / 8;
    const z = sin(a);
    fill(c, 50, 50);
    if (z > 0) {
      letter(
        cos(a) * planetRadius * r + (width / 2),
        y * planetRadius + z * r * 5 + (height / 2),
        i,
      );
    }
  }

  // Belt
  const beltColor = color(random(360), random(40, 50), random(60, 90));
  fill(beltColor);
  stroke(0);
  strokeWeight(2);

  const stepX = 60;
  const stepY = 40;
  for (let i = 0; i < beltCount; i++) {
    const rx = random(-30, -30 + stepX);
    const ry = random(-5, -5 + stepY);
    let a = random(TWO_PI) + timer;
    a += timer / 8;
    const xpos = cos(a) * (planetRadius * 1.5 + rx) + (width / 2);
    const ypos = sin(a) * (30 + ry) + (height / 2);
    if (ypos > (height / 2) || dist(width / 2, height / 2, xpos, ypos) > planetRadius) {
      text(word, xpos, ypos);
    }
  }

  // Timer
  timer += speed;
  if (timer >= TWO_PI) {
    timer = 0;
  }
}

// Pick letter from word
function letter(x, y, i) {
  text(word[i % word.length], x, y);
}
