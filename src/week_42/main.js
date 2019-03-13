/**
 * Motus: Neon tunnel
 * https://owenmcateer.github.io/Motus-Art
 *
 * inspired by the High Trestle Trail Bridge
 * over the Des Moines River between
 * Woodward and Madrid, Iowa.
 * https://www.atlasobscura.com/places/high-trestle-trail-bridge
 */
const canvas = 540;
const cx = canvas / 2;
const colours = {};

const vanishingPoint = cx + 50;
const squaresNum = 14;
let step = 0;

// Setup
function setup() {
  createCanvas(canvas, canvas);
  colorMode(RGB, 255, 255, 255, 1);
  rectMode(CENTER);

  //  Colours
  colours.bg = [2, 2, 3];
  colours.blue_dark = [30, 84, 177];
  colours.blue_light = [235, 255, 255];
  colours.white = [251, 254, 255];
}

// Draw
function draw() {
  background(...colours.bg);

  // Tick
  tick(step);
  step += 0.002;

  // Reset tick
  if (step >= 1 / squaresNum) {
    step = 0;
  }

  // Render walkway
  fill(...colours.blue_dark, 0.96);
  noStroke();
  quad(0, height, cx - 8, vanishingPoint + 4, cx + 8, vanishingPoint + 4, width, height);

  blur(6, (level) => {
    stroke(...colours.blue_dark, 1 * level);
    strokeWeight(3 * (5 - (6 * level)));
    line(0, height, cx - 8, vanishingPoint + 4);
    line(width, height, cx + 8, vanishingPoint + 4);
  });

  fill(...colours.blue_light, 0.5);
  quad(0, height, cx - 6, vanishingPoint + 4, 4, height);
  quad(width - 4, height, cx + 6, vanishingPoint + 4, width, height);
}


/**
 * Tick render
 * @param {int}} tickStep
 */
function tick(tickStep) {
  noFill();

  // Door ways
  for (let i = 0; i < squaresNum; i++) {
    const ii = (i / squaresNum) + tickStep;
    const easer = easeInExpo(ii, 0, 1, 1);
    const size = easer * (canvas * 1.2);
    const rotation = easeOutExpo(ii, 0, 1, 1) * HALF_PI;
    const strokeSize = (easer * 10) + 1;
    const strokeOpacity = map(easeOutExpo(ii, 0, 1, 1), 0, 1, 0.2, 1);

    push();
    translate(cx, vanishingPoint);
    rotate(rotation);

    // Box with blur
    blur(8, level => {
      stroke(...colours.blue_dark, strokeOpacity * level);
      strokeWeight(strokeSize * (10 - (14 * level)));
      rect(0, 0, size, size);
    });

    // Final
    stroke(...colours.white, strokeOpacity + 0.1);
    strokeWeight(map(easer, 0, 1, 1, 3));
    rect(0, 0, size, size);

    pop();
  }
}

/**
 * Blur
 * Loops over a callback function x time to create blur effect.
 * @param {int} amount
 * @param {function} fnc
 */
function blur(amount, fnc) {
  for (let i = 0; i < amount; i++) {
    const level = i / amount;
    fnc(level);
  }
}

// https://easings.net
function easeInExpo(t, b, c, d) {
  return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
}
function easeOutExpo(t, b, c, d) {
  return c * (t /= d) * t * t + b;
}
