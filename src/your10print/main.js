/**
 * Motus Art: Your 10 PRINT
 * https://owenmcateer.github.io/Motus-Art
 */
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const handle = urlParams.get('handle');

const canvasSize = 540;
const border = 50;

// Setup
function setup() {
  //
  if (handle === null) {
    document.getElementById('result').remove();
    return;
  }

  // Remove handle form
  document.getElementById('enterHandle').remove();

  // Canvas setup
  const canvas = createCanvas(canvasSize, canvasSize + 20);
  canvas.parent('your10printCanvas');
  displayDensity(2);

  // Set user handle seed
  randomSeed(processSeed(handle));

  // Randomness
  const gridCount = round(random(9, 16));
  const gridSize = (canvasSize - border) / (gridCount);
  const borderOffset = (border / 2) + (gridSize / 2);
  const half = gridSize / 2;

  // Style
  background(249);
  const colourPallet = random(colours);

  // Build grid
  for (let x = 0; x < gridCount; x++) {
    for (let y = 0; y < gridCount; y++) {
      // Colour
      const randColour = random(colourPallet.slice(0, 3));
      fill(randColour);
      stroke(randColour);

      // Filled Diagonals
      push();
      const offset = floor(random(4)) * HALF_PI;
      translate(x * gridSize + borderOffset, y * gridSize + borderOffset);
      rotate(offset);
      triangle(-half, -half, half, -half, half, half);
      pop();
    }
  }

  // Text
  fill(0);
  noStroke();
  textFont('Lucida Grande');
  textSize(15);
  textAlign(RIGHT);
  text(`For @${handle} by @motus_art`, width - 25, height - 17);
}


// Convert user handle to their seed.
function processSeed(str) {
  let seed = 0;
  for (let i = 0; i < str.length; i++) {
    seed += str.charCodeAt(i);
  }
  return seed;
}
