/**
 * Genuary 2023: Day 16
 * "Reflection of a reflection"
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
let img;
let baseCanvas;
let capture;

// Setup
function setup() {
  baseCanvas = createCanvas(540, 540);

  background(239);
  img = createImage(width, height);

  rectMode(CENTER);
  imageMode(CENTER);
  frameRate(60);
  const constraints = {
    video: {
      mandatory: {
        minWidth: 290,
        minHeight: 190,
      },
      optional: [{ maxFrameRate: 10 }],
    },
    audio: true,
  };
  capture = createCapture(constraints);
  capture.hide();
}

// Draw tick
function draw() {
  // Outer box
  if (frameCount % (60 * 4) < 100) {
    fill(39);
  } else {
    fill(0);
  }
  stroke(155);
  rect(width / 2, 0, width, 20);
  rect(width, height / 2, 20, height);
  rect(width / 2, height, width, 20);
  rect(0, height / 2, 20, height);

  // Circle
  stroke(239);
  fill(39);
  ellipse(
    cos(frameCount / 10) * width * 0.4 + width / 2,
    sin(frameCount / 5) * height * 0.2 + height / 2,
    100,
  );

  // User window
  noCursor();
  const x = mouseX;
  const y = mouseY;
  rect(x, y, 300, 30);
  rect(x, y + 115, 300, 200);
  textSize(24);
  fill(239);
  noStroke();
  text('_ □ x', x + 86, y + 7);
  image(capture, x, y + 115, 290, 190);

  // Copy buffer
  img.copy(baseCanvas, 0, 0, width, height, 0, 0, width, height);

  // Reflection of a reflection
  image(img, width * 0.5, height * 0.5, width, height);
  image(img, width * 0.5, height * 0.5, width * 0.95, height * 0.95);
}
