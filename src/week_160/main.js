/**
 * Motus: Cubed
 * https://owenmcateer.github.io/Motus-Art
 */
function setup() {
  createCanvas(1080, 1080, WEBGL);
}

function draw() {
  background(0);
  translate(0, -550, -4700);

  stroke(239);
  strokeWeight(1);
  fill(0);

  for (let j = 0; j < 50; j++) {
    for (let i = 0; i < 12; i++) {
      const fadeOff = easeOutQuad(j / 50, 0, 1, 1);
      stroke((noise(j, i, frameCount / -10) * 205 + 50) * fadeOff);
      push();
      translate((i - 6) * -100, 0, j * 100);
      box(100);
      pop();
      push();
      translate((i - 6) * -100, 1000, j * 100);
      box(100);
      pop();
    }
  }

  for (let j = 1; j <= 50; j++) {
    for (let i = 1; i <= 12; i++) {
      const fadeOff = easeOutQuad(j / 50, 0, 1, 1);
      stroke((noise(j, i, frameCount / -10) * 205 + 50) * fadeOff);
      push();
      let p = sin((frameCount / 50) + (i / 10) + (j * 2) / 16);
      p = constrain(p, -0.5, 0.5);
      p = map(p, -0.5, 0.5, 0, 1);
      p = easeInOutCubic(p, 0, 1, 1);
      p = (p * 2) - 1;
      p *= 500;
      translate(p, i * 100, j * 100);
      box(100);
      pop();
    }
  }
}

// Easing functions
function easeOutQuad(t, b, c, d) {
  return -c *(t/=d)*(t-2) + b;
}
function easeInOutCubic(t, b, c, d) {
  if ((t/=d/2) < 1) return c/2*t*t*t + b;
  return c/2*((t-=2)*t*t + 2) + b;
}
