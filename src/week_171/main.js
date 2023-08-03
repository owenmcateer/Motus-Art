/**
 * Motus: Life timeline
 * How I imagine my age.
 * https://owenmcateer.github.io/Motus-Art
 */
const lifeHeight = 272;
const border = 40;
let lifeWidth;
const feelsLike = 0.7;
const lifeExpectancy = 82;
const myAge = 37;
const age = (myAge / lifeExpectancy) * feelsLike;

let t = 0;
const speed = 0.01;

// Setup
function setup() {
  createCanvas(1920, 720);
  lifeWidth = width - (border * 2);
}

// Draw tick
function draw() {
  // Styles
  background(24);
  stroke(215);
  strokeWeight(2);
  noFill();

  // Position
  const yOffset = (height - lifeHeight) / 2;
  translate(border, yOffset);

  // Life
  rect(0, 0, lifeWidth, lifeHeight);

  // Young life
  for (let y = 0; y < myAge; y++) {
    let yearsOld = map(y, 0, myAge, 0, lifeWidth * age);
    const oneYear = (lifeWidth * age) / myAge;
    yearsOld -= (frameCount) % oneYear;
    yearsOld = constrain(yearsOld, 0, lifeWidth * age);

    line(yearsOld, 0, yearsOld, lifeHeight);
  }

  // Future life
  for (let y = myAge; y < lifeExpectancy; y++) {
    let yearsOld = map(y, myAge, lifeExpectancy, lifeWidth * age, lifeWidth);
    const oneYear = (lifeWidth - (lifeWidth * age)) / (lifeExpectancy - myAge);
    yearsOld -= t * oneYear;
    yearsOld = constrain(yearsOld, lifeWidth * age, lifeWidth);
    line(yearsOld, 0, yearsOld, lifeHeight);
  }

  // Current age
  strokeWeight(16);
  stroke(200 + (sin(t * TWO_PI * 2) * 39));
  rect(lifeWidth * age, 0, 0, lifeHeight);

  // Distance fade overlay
  resetMatrix();
  const distanceOverlay = drawingContext.createLinearGradient(border, 0, lifeWidth, 0);
  distanceOverlay.addColorStop(0, 'rgba(24, 24, 24, 0.9)');
  distanceOverlay.addColorStop(0.02, 'rgba(24, 24, 24, 0)');
  distanceOverlay.addColorStop(0.98, 'rgba(24, 24, 24 ,0)');
  distanceOverlay.addColorStop(1, 'rgba(24, 24, 24, 0.9)');
  fill(255);
  drawingContext.fillStyle = distanceOverlay;
  noStroke();
  rect(0, 0, width, height);

  // Timer
  t += speed;
  if (t >= 1) {
    t = 0;
  }
}
