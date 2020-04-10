/**
 * Motus: Tock
 *
 * Music by: Greg Vladimirov
 * https://www.instagram.com/gregvladimirov/
 *
 * Ref: https://owenmcateer.github.io/Motus-Art/projects/week_56.html
 */
const canvasSize = 1080;
const setFrameRate = 30;
const bpm = 126;
let timer = 0.8;
const speed = (bpm / 60) / setFrameRate;
const blocks = 12;

const boxSize = 80;
const boxGap = 16;
const boxSpace = boxSize + boxGap;
let audioTrack;


// Preload
function preload() {
  soundFormats('mp3', 'ogg');
  audioTrack = loadSound('../assets/audio/Tock-GregVladimirov.mp3');
}


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  frameRate(setFrameRate);
  audioTrack.loop();
  background(40);
}


// Draw tick
function draw() {
  background(40);

  // Styles
  stroke(0);
  strokeWeight(4);
  smooth();

  // Draw blocks
  for (let i = 0; i < blocks; i++) {
    fill(map(i, 0, blocks, 39, 255) - (timer * (255 / blocks)));

    // Position
    push();
    translate(0, i * boxSpace - 500 + (timer * -boxSpace));

    // Block angle
    if (i === blocks / 2) {
      let r = constrain(timer, 0.3, 0.7);
      r = map(r, 0.3, 0.7, 0, 1);
      r = easeOutBack(r, 0, 1, 1);
      rotateY(r * QUARTER_PI);
    }
    else if (i < blocks / 2) {
      rotateY(QUARTER_PI);
    }
    else {
      rotateY(PI);
    }

    // Render block
    box(360, boxSize, 360);
    pop();
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}

function easeOutBack(t, b, c, d, s) {
  if (s == undefined) s = 1.70158;
  return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
}
