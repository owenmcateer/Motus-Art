/**
 * Motus: A loud GIF
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
let timer = 0;
const speed = 0.02;
const s = 200;

// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  rectMode(CENTER);
  colorMode(RGB, 255, 255, 255, 1);
  background(39);
}


// Draw tick
function draw() {
  background(39, 0.8);
  translate(width / 2, height / 2);

  // Bounce
  let bounce = 0;
  if (timer > 0.8 && timer < 0.9) {
    bounce = easeInQuad(map(constrain(timer, 0.8, 0.9), 0.8, 0.9, 0, 1), 0, 1, 1);
  }
  else if (timer > 0.9) {
    bounce = 1 - easeOutBounce(map(timer, 0.9, 1, 0, 1), 0, 1, 1);
  }

  // Half bounce translate
  rotate(bounce * 0.015);
  translate(0, bounce * s * 0.1 * 0.5);

  // Border outline
  stroke(239);
  strokeWeight(16);
  noFill();
  rect(0, 0, width * 0.8, height * 0.8);

  // Half bounce translate
  translate(0, bounce * s * 0.1);

  // Position box & line
  translate(0, s * 0.65);

  // Baseline
  strokeWeight(8);
  line(width * -0.4, 0, width * 0.4, 0);

  // Horizontal slide
  translate(-s * timer + (s * 0.5), 0);
  noStroke();
  fill(239);

  const rot = easeInQuad(map(constrain(timer, 0, 0.8), 0, 0.8, 0, 1), 0, 1, 1);
  rotate(rot * HALF_PI);
  rect(s * -0.5, s * -0.5, s, s);

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}

// Easing functions
function easeInQuad(t, b, c, d) {
  return c*(t/=d)*t + b;
}

function easeOutBounce(t, b, c, d) {
  if ((t/=d) < (1/2.75)) {
    return c*(7.5625*t*t) + b;
  } else if (t < (2/2.75)) {
    return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
  } else if (t < (2.5/2.75)) {
    return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
  } else {
    return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
  }
}
