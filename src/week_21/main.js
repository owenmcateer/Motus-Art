/**
 * Motus: L-System
 * https://owenmcateer.github.io/Motus-Art
 *
 * Inspired by R. Luke DuBois http://lukedubois.com/
 * L-system: https://en.wikipedia.org/wiki/L-system
 */
const canvas = 1080;
const colours = [];
const cx = canvas / 2;

const step = canvas / 16;
let currentangle;
let angle;
let x;
let y;
const dotSize = 22;


// LINDENMAYER STUFF (L-SYSTEMS)
// Credit R. Luke DuBois
var thestring = 'A'; // "axiom" or start of the string
var numloops = 5; // how many iterations to pre-compute
var therules = []; // array for rules
therules[0] = ['A', '-BF+AFA+FB-']; // first rule
therules[1] = ['B', '+AF-BFB-FA+']; // second rule
let whereinstring = 0; // where in the L-system are we?


// Setup
function setup() {

  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);

  // Colours
  colours.bg = [30];
  colours.lines = [58, 105, 67];
  colours.dot = colours.lines;

  // Styling
  background(...colours.bg);
  fill(...colours.dot);  
  stroke(...colours.lines);
  strokeWeight(7);

  // Setup L-System
  init();
}


function draw() {
  // Draw current character
  render(thestring[whereinstring]); 
  
  // console.log(whereinstring);
  whereinstring++;
  if (whereinstring > 850) {
    background(...colours.bg);
    init();
  }
}

function init() {
  whereinstring = 0;
  x = step / 2;
  y = canvas - (step / 2);
  currentangle = 0;
  angle = 90;

  // Compute the L-system  
  thestring = 'A';
  for (var i = 0; i < numloops; i++) {
    thestring = lindenmayer(thestring);
  }

  // Draw first dot.
  ellipse(x, y, dotSize, dotSize);  
  ellipse(x, y, dotSize, dotSize);  
}

/**
 * Interpret an L-system
 * Credit R. Luke DuBois
 */
function lindenmayer(s) {
  var outputstring = ''; // start a blank output string
  
  // iterate through 'therules' looking for symbol matches:
  for (var i = 0; i < s.length; i++) {
    var ismatch = 0; // by default, no match
    for (var j = 0; j < therules.length; j++) {
      if (s[i] == therules[j][0])  {
        outputstring += therules[j][1]; // write substitution
        ismatch = 1; // we have a match, so don't copy over symbol
        break; // get outta this for() loop
      }
    }
    // if nothing matches, just copy the symbol over.
    if (ismatch == 0) outputstring+= s[i]; 
  }
  return outputstring; // send out the modified string
}

// Render
function render(k) {

  // Forward
  if (k=='F') {
    var x1 = x + step * cos(radians(currentangle));
    var y1 = y + step * sin(radians(currentangle));
    // Connecting lne
    line(x, y, x1, y1);

    // Update turtle's position
    x = x1;
    y = y1;
		
		// Draw
		ellipse(x, y, dotSize, dotSize);
		
  }
  else if (k == '+') {
    // Left
    currentangle += angle;
  }
  else if (k == '-') {
    // Right
    currentangle -= angle;
  }
}
