/**
 * Motus: Grid: Pins
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 540;
const itemCount = 9;
const gridSpacing = canvasSize / (itemCount + 1);
const itemSize = gridSpacing * 0.7;

let timer = 0;
const speed = 0.005;


// Setup
function setup() {
  createCanvas(canvasSize, canvasSize);
  pixelDensity(2);
}


// Draw tick
function draw() {
  background(239);
  noStroke();

  for (let x = 0; x < itemCount; x++) {
    for (let y = 0; y < itemCount; y++) {
      // Base ellipse
      const posX = x * gridSpacing + gridSpacing;
      const posY = y * gridSpacing + gridSpacing;
      fill(39);
      ellipse(
        posX,
        posY,
        itemSize,
      );

      // Plasma effect
      const s1 = sin(x + (timer * 5));
      const s2 = sin(y + (timer * 10));
      const s3 = sin(x + y + timer);
      const s = (s1 + s2 + s3) / 3;
      const c = constrain(map(s, -1, 1, 0, 0.33) - 0.05, 0, 0.25);
      const offset = itemSize * c;

      fill(239);
      ellipse(
        posX - offset,
        posY - offset,
        itemSize + 2,
      );
    }
  }

  // Timer
  timer += speed;
  if (timer >= TWO_PI) {
    timer = 0;
  }
}
