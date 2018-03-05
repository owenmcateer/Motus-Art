/**
 * Motus: Interlacing sun
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const r = 480;
const lineWidth = 28;
const lines = (r * 2) / lineWidth;
const offset = (canvas - (lineWidth * lines)) / 2;
let count = 0.5;
const countSpeed = 0.015;
let c;

// Setup
function setup() {
  createCanvas(canvas, canvas);
}

// Draw tick
function draw() {
  background(90, 75, 63);
  noStroke();

  for (let i = 0; i < lines; i++) {
    let mult = easeInOutExpo(map(sin(count + (i / (PI * 5))) * 1, -1, 1, 0, 1));

    if (i % 2 === 0) {
      c = color(240, 106, 17, (mult + 0.5) * 255);
    } else {
      c = color(240, 106, 17, (mult + 0.5) * 255);
      mult = 1.0 - mult;
    }
    fill(c);

    const s = (i * lineWidth) + lineWidth;
    const lineHeight = (Math.sqrt((2 * s * r) - Math.pow(s, 2)) * 2) * mult;
    rect((i * lineWidth) + offset, (r - (lineHeight / 2)) + offset, lineWidth, lineHeight);
  }
  count += countSpeed;
}

// Easing effect InOutExpo
function easeInOutExpo(t) {
  if (t === 0 || t === 1) {
    return t;
  }
  let tt = t / 0.5;
  if (tt < 1) {
    return 0.5 * Math.pow(2, 10 * (tt - 1));
  }
  return 0.5 * (-Math.pow(2, -10 * --tt) + 2);
}
