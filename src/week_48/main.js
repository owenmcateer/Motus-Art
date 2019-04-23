/**
 * Motus: Neural Net Cube
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const colours = {};

const cubes = 5;
const cubeSize = 88;
const cubeGap = 32;
const cubeOuterSize = cubeSize + cubeGap;
const totalSize = cubeOuterSize * cubes;
const cubeOffset = totalSize / 2.5;
const speed = 0.003;
let timer = 0;


function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  colorMode(RGB, 255, 255, 255, 1);

  //  Colours
  colours.bg = [20];
  colours.stroke = [240];
  colours.fill = [0];
}


function draw() {
  background(colours.bg);
  smooth();

  // Rotate camera
  rotateX(map(sin(frameCount * (speed * 2)), -1, 1, 0, PI));
  rotateY(map(sin(frameCount * (speed * 2)), -1, 1, 0, PI));

  // Styling
  fill(...colours.fill);
  stroke(...colours.stroke);
  strokeWeight(2);

  // Animate cubes
  let phaseX = easeOutElastic(map(constrain(timer, 0, 0.2), 0, 0.2, 0, 1), 0, 1, 1);
  let phaseY = easeOutElastic(map(constrain(timer, 0.2, 0.4), 0.2, 0.4, 0, 1), 0, 1, 1);
  let phaseZ = easeOutElastic(map(constrain(timer, 0.4, 0.6), 0.4, 0.6, 0, 1), 0, 1, 1);

  // Reverse
  if (timer > 0.8) {
    phaseX = easeOutElastic(map(constrain(timer, 0.8, 0.9), 0.8, 0.9, 1, 0), 0, 1, 1);
    phaseY = phaseX;
    phaseZ = phaseX;
  }

  // Build grid
  for (let x = 0; x < cubes; x++) {
    for (let y = 0; y < cubes; y++) {
      for (let z = 0; z < cubes; z++) {
        const posX = ((x * cubeOuterSize) - cubeOffset) * phaseX;
        const posY = ((y * cubeOuterSize) - cubeOffset) * phaseY;
        const posZ = ((z * cubeOuterSize) - cubeOffset) * phaseZ;

        push();
        translate(
          posX,
          posY,
          posZ,
        );
        box(cubeSize);
        pop();
      }
    }
  }

  // Timer
  timer += speed;
  if (timer >= 1) {
    timer = 0;
  }
}


// Eas out Elastic
function easeOutElastic(t, b, c, d) {
  let s = 1.70158;
  let p = 0;
  let a = c;
  if (t === 0) return b;
  if ((t /= d) == 1) return b + c;
  if (!p) p = d * 0.3;
  if (a < Math.abs(c)) {
    a = c;
    s = p / 4;
  } else s = p / (2 * Math.PI) * Math.asin(c / a);
  return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
}
