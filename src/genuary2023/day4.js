/**
 * Genuary 2023: Day 4
 * "Intersections"
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
let t = 1000;
const canvasSize = 1080;
const cx = canvasSize / 2;
const numOfLanes = Math.round(Math.random() * 10 + 10);
const lanes = [];
let laneWidth;
let carSize;
let magicAngle;

// Setup tick
function setup() {
  createCanvas(canvasSize, canvasSize, WEBGL);
  smooth();

  // The magic angle
  magicAngle = atan(1 / sqrt(2));

  // Isometric projection
  ortho(-cx, cx, cx, -cx, -1000, canvasSize * 10);

  // Lanes
  for (let i = 0; i < numOfLanes; i++) {
    lanes[i] = i * 2;
  }
  laneWidth = (width * 2) / lanes.length;
  carSize = laneWidth * 0.4;
}

// Draw tick
function draw() {
  // Set viewing angle
  rotateX(magicAngle);
  rotateY(QUARTER_PI);

  // Styling
  background(39);
  stroke(239);
  strokeWeight(1);
  fill(0);

  for (let lane = 0; lane < lanes.length; lane++) {
    push();
    translate(-width, 0, height * 0);
    if (lane % 2 === 0) {
      rotateY(-HALF_PI);
      translate(lane * laneWidth - width, -carSize, -width);
    } else {
      translate(lane * laneWidth, -carSize, 0);
    }
    box(laneWidth * 0.6, 10, width * 2);
    pop();

    for (let car = 0; car < round(noise(lane) * 10); car++) {
      push();
      translate(width * -1, 0, height * -1);
      if (lane % 2 === 0) {
        rotateY(-HALF_PI);
        translate(0, 0, width * -2);
      }

      const drivingSpeed = map(noise(lane, car), 0, 1, 0.2, 1);
      const driving = (t * drivingSpeed * width * 2) % (width * 2);
      translate(lane * laneWidth, carSize * -0.5 + 10, driving);
      box(carSize, carSize, carSize * noise(lane, car) * 4 + 1);
      pop();
    }
  }

  t += 0.005;
}
