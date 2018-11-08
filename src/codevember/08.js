/**
 * Motus: Kit-Cat Klock
 * #codevember day 8
 * https://owenmcateer.github.io/Motus-Art
 *
 * Ref: https://www.youtube.com/watch?v=WKVy4IjPXqA
 * https://en.wikipedia.org/wiki/Kit-Cat_Klock
 */
const canvas = 1080;
const colours = [];
const cx = canvas / 2;

let cat;
let tail;
let eye;
let clockHand;
let canvasBg;
let tiles;

// Preload
function preload() {
  cat = loadImage('../../assets/img/codevember/cat-body.png');
  tail = loadImage('../../assets/img/codevember/cat-tail.png');
  eye = loadImage('../../assets/img/codevember/cat-eye.png');
  clockHand = loadImage('../../assets/img/codevember/cat-clock-hand.png');
  tiles = loadImage('../../assets/img/codevember/tiles.jpg');
}

// Setup
function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);
  imageMode(CENTER);

  // Colours
  colours.bgTop = [138, 188, 135];
  colours.bgBottom = [84, 134, 81];


  // Draw background gradient
  canvasBg = drawBackground();
}


// Draw tick
function draw() {
  background(colours.bgTop);
  image(canvasBg, cx, cx);

  const timer = sin(frameCount / 10);

  // Tail
  push();
    translate(cx, 700);
    tailRotate = timer * (PI / 20);
    rotate(tailRotate);
    image(tail, 0, 150);
  pop();

  // Body
  image(cat, cx, 380);

  // Eyes
  push();
    eyeOffset = timer * -20;
    translate(cx + eyeOffset, 135);
    image(eye, -70, 0);
    image(eye, 70, 0);
  pop();

  // Hour hand
  push();
    translate(cx, 500);
    scale(1, 0.8);
    rotate(hour() * (TWO_PI / 12));
    image(clockHand, 0, -50);
  pop();

  // Minute hand
  push();
    translate(cx, 500);
    rotate(minute() * (TWO_PI / 60));
    image(clockHand, 0, -50);
    // Hand cover
    fill('#C1CAC0');
    noStroke();
    ellipse(0, 0, 20, 20);
  pop();

}

function drawBackground() {
  const bg = createGraphics(width, height);
  // Repeat BG
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      bg.image(tiles, tiles.width * x, tiles.height * y);
    }
  }
  return bg;
}
