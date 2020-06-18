/**
 * Motus: Dancing Cubes
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const cx = canvasSize / 2;
const border = 100;
const boxes = [];
let previousSet = null;

const fps = 30;
let bpm;

const sets = [
  // Doubles
  [0, 2, 3, 5, 6, 8],
  [0, 1, 2, 6, 7, 8],
  // Diagonal
  [0, 4, 8],
  [2, 4, 6],
  [0, 2, 4, 6, 8],
  // Cross
  [1, 3, 4, 5, 7],
  // Rows&cols
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
let font;


// Preloader
function preload() {
  font = loadFont('../assets/fonts/WorkSans-Medium.ttf');
}


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  smooth();
  frameRate(fps);
  colorMode(RGB, 255, 255, 255, 1);
  pixelDensity(2);

  // Create boxes
  const spacing = (canvasSize - (border / 2)) / 3;
  for (let i = 0; i < 9; i++) {
    const x = (i % 3) * spacing;
    const y = floor(i / 3) * spacing;
    boxes.push(new Box(x, y, spacing / 1.8));
  }

  // BPM tapper
  bpm = new BpmTapper(fps, 120);
}


/**
 * Pick a random set.
 * Do not repeat previous pick.
 */
function getRandomSet() {
  const pick = floor(random(sets.length));
  if (pick === previousSet) {
    return getRandomSet();
  }
  previousSet = pick;
  return sets[pick];
}


/**
 * Pick a random axis to rotate around.
 *
 * @return string [x, y, x]
 */
function getRandomAxis() {
  return random(['x', 'y', 'z']);
}


// Draw tick
function draw() {
  background(39);
  fill(239);
  stroke(0);
  strokeWeight(2);

  // Center camera
  translate(-cx + border + 6, -cx + border + 6);

  // Draw boxes
  boxes.forEach((b) => {
    b.setSpeed(bpm.getSpeed());
    b.update();
    b.render();
  });

  // BPM
  if ((frameCount - bpm.getBpmOffset()) % bpm.getBpmFps() === 0) {
    const axis = getRandomAxis();
    getRandomSet().forEach((i) => {
      boxes[i].setRotation(axis, HALF_PI);
    });
  }

  // BPM / help text
  fill('#ccc');
  textFont(font);
  textSize(20);

  textAlign(LEFT);
  text('Space to hold', -92, height - 115);

  textAlign(RIGHT);
  text((bpm.getBpm()) ? `BPM: ${bpm.getBpm()}` : 'Tap BPM', width - 120, height - 115);
}
