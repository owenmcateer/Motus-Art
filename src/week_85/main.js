/**
 * MotusArt: Coding
 * https://owenmcateer.github.io/Motus-Art
 */
const canvasSize = 1080;
const colours = [
  // Pink
  [226, 76, 142],
  // Green
  [54, 179, 126],
  // Purple
  [101, 84, 192],
  // Blue
  [0, 147, 234],
  // Yellow
  // [244, 165, 83]
  // Grey
  [150],
];

const code = [];
const chance = {
  indent: 0.4,
  indent_reset: 0.15,
  line_break: 0.08,
  change_colour: 0.4,
};
const settings = {
  speed_min: 0.05,
  speed_max: 0.1,
  scroll_speed: 0.3,
};
const indentSize = 50;
const lineHeight = 50;
const characterSize = 32;
const space = characterSize * 1.5;

let currentIndent = 0;
let currentLine = 0;
let currentColour = null;
let scrollOffset = 0;


function setup() {
  createCanvas(canvasSize, canvasSize);

  // Global styles
  strokeWeight(characterSize);
  strokeCap(ROUND);
  noFill();
  setRandomColour();

  // Create first line
  code.push(new Line());
}


function draw() {
  background(39);

  // Scroll page
  translate(0, scrollOffset);

  // Draw code
  for (let i = 0; i < code.length; i++) {
    const codeLine = code[i];
    codeLine.render();

    // If completed add a new line
    if (i === code.length - 1 && codeLine.isFinished()) {
      currentLine++;
      code.push(new Line());
      // Update scroll position before next render
      translate(0, scrollOffset);
    }
  }
}


function setRandomColour() {
  currentColour = random(colours);
  return currentColour;
}

function lineBreak() {
  return (random() < 0.2 && currentLine > 0);
}

function isPushingPage() {
  return (code.length * lineHeight > height - (lineHeight * 2));
}

function scrollPage() {
  if (this.isPushingPage()) {
    scrollOffset -= lineHeight;
  }
}

function deleteOldLines() {
  if (this.isPushingPage()) {
    // Remove first line
    code.shift();
  }
}