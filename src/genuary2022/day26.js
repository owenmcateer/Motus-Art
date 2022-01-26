const canvasSize = 540;
let cellCount;
let cellSize;

const pallet = [
  [7, 36, 70],
  [7, 58, 103],
  [225, 170, 18],
  [0, 128, 137],
  [5, 93, 107],
];
let carpetTexture;

function preload() {
  carpetTexture = loadImage('../../assets/img/textures/carpet.png');
}

function setup() {
  createCanvas(canvasSize, canvasSize);
  frameRate(1);
}

function draw() {
  // Math
  cellCount = round(random(5, 11));
  cellSize = canvasSize / cellCount;

  // Rotate
  translate(cellSize * cellCount * 0.5, cellSize * cellCount * -0.5);
  rotate(PI / 4);
  scale(1.4);


  // Styles
  background(0, 176, 166);
  noStroke();

  // Make that carpet
  for (let x = 0; x < cellCount; x++) {
    for (let y = 0; y < cellCount; y++) {
      push();
      translate(x * cellSize, y * cellSize);
      cell();
      pop();
    }
  }
}


function cell() {
  const split = round(random(10, 16));
  const dir = random([0, HALF_PI]);
  const size = cellSize / split;

  for (let i = 0; i < split; i++) {
    fill(random(pallet));
    if (dir < QUARTER_PI) {
      rect(size * i, 0, size, cellSize);
    }
    else {
      rect(0, size * i, cellSize, size);
    }
  }

  // Texture
  tint(255, 70);
  if (dir < QUARTER_PI) {
    image(carpetTexture, 0, 0, cellSize, cellSize);
  }
  else {
    push();
    rotate(dir);
    image(carpetTexture, 0, -cellSize, cellSize, cellSize);
    pop();
  }
}
