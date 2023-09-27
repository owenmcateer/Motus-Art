/**
 * Sinking floor
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
let t = 0.245;
const speed = 0.005;
const canvasSize = 1080;
const cx = canvasSize / 2;
let magicAngle;
const gridCount = 11;
const gridMidPoint = Math.floor(gridCount / 2);


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  smooth();

  // The magic angle
  magicAngle = atan(1 / sqrt(2));

  // Isometric projection
  ortho(-cx, cx, cx, -cx, -1000, canvasSize * 3);
}

// Draw tick
function draw() {
  // Set viewing angle
  rotateX(magicAngle);
  rotateY(-QUARTER_PI);
  
  // Styling
  background(15);
  noStroke();
  fill(239);
  stroke(0);
  strokeWeight(1);

  const s = 65;
  translate(s * -gridMidPoint, 0, s * -gridMidPoint);
  
  // Draw boxes
  for (let x = 0; x < gridCount; x++) {
    for (let y = 0; y < gridCount; y++) {
      let p = phaseCalc(x, y);
      p = easeInOutCirc(p, 0, 1, 1);
      
      const z = p * s * (1-dist(0.5, 0.5, x/gridCount, y/gridCount))*3;
  
      push();
      translate(x * s, z, y * s);
      rotateY(p * HALF_PI);
      box(s * 0.8, 10, s * 0.8);
      pop();
    }
  }

  // Timer
  t += speed;
  if (t >= 1) {
    t = 0;
  }
}

function phaseCalc(x, y) {  
  // const tt = constrain(t * 2, 0, 1);
  // let c = sin(tt * PI + dist(gridMidPoint, gridMidPoint, x, y) / 3);
  // return c = c / 2 + 0.5;
  
  const distance = gridMidPoint - dist(gridMidPoint, gridMidPoint, x, y);
  let c = sin(t * TWO_PI + distance/10);  
  c = constrain(c, 0, 1);
    
  return c;
}

// Easing
function easeInOutCirc(t, b, c, d) {
  if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
  return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
}
