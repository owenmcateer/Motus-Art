/**
 * Motus: Downfall
 * https://owenmcateer.github.io/Motus-Art
 *
 * Sounds design by: @dancareybailey
 */
const canvasSize = 540;

let phase = 0;
let speed = 0.08;
const items = 18;
const itemSpacing = Math.floor(canvasSize / (items + 2));
const edge = itemSpacing * 1.5;

const plasmaScale = 2;
let audioTrack;


// Preload
function preload() {
  soundFormats('mp3', 'ogg');
  audioTrack = loadSound('../assets/audio/Downfall-dancareybailey.mp3');
}


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  rectMode(CENTER);

  audioTrack.setVolume(1);
  audioTrack.play();
}


// Draw tick
function draw() {
  background(40);

  // Phase
  phase += speed;
  speed += 0.0001;

  // Loop X&Y
  for (let x = 0; x < items; x++) {
    for (let y = 0; y < items; y++) {
      // Plasma color
      const hue = phase * 8.0
        + y / (plasmaScale * 0.5)
        + 8.0 * sin(phase + y / (plasmaScale * 4.0)
        + 4.0 * sin(phase + x / (plasmaScale * 8.0)
        + 0.5 * sin(phase + y / (plasmaScale * 4.0))));

      // Get pixel colour
      colorMode(HSB, 255);
      stroke(255);
      noFill();
      const size = hue;

      noFill();
      rect(x * itemSpacing + edge, y * itemSpacing + edge, size, size);
    }
  }

  // Reset
  if (phase >= 145) {
    phase = 0;
    speed = 0.1;
    audioTrack.play(0);
  }
}
