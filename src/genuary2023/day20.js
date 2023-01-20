/**
 * Genuary 2023: Day 20
 * "Art Deco"
 *
 * Collab with Julian Hespenheide & Motus Art
 * https://twitter.com/nodashNET
 * https://twitter.com/motus_art
 */
const gold = '#E6BA6F';
const black = '#000D0B';

const states = {
  FanArcs: 0,
  OverlappingSquares: 1,
  PalmTreeLeaves: 2,
  ArcBricks: 3,
  Palms: 4,
  Spotlights: 5,
};
let mode = 5;
let amount = 6; // how many patterns / states do we have?
let animation = 1;
let moveX = 1;
let moveY = 4;

let maximaX = [5,7,6,5,7,6];
let maximaY = [9,12,12,8,12,10];
let sizes = [200,110,110,200,150,150];

let timestamp = 0;
let interval = 2000;
let changeMode = false;
let autoCycling = true; // turn this on to enable cycling through the modes

function setup() {
  createCanvas(784, 784);

  // Styles
  background(black);
  stroke(gold);
  strokeWeight(4);
  noFill();
}

function draw() {
  if(millis() - timestamp > interval && autoCycling) {
    timestamp = millis();
    changeMode = true;
    mode++;
    mode %= amount;
  }

  moveX = maximaX[mode];
  moveY = maximaY[mode];
  background(black);

  let mySize = sizes[mode];
  switch(mode) {
    case states.FanArcs: // Fan arcs
      for (let x = 0; x < moveX; x++) {
        for (let y = 0; y < moveY; y++) {

          const xx = (x * mySize) + ((y % 2 === 0) ? 0 : mySize / 2);
          let m = map(sin(frameCount*0.015 + ((x+1)*(y+1))), -1, 1, 0.0, 1.0);
          arcFan(xx, y * (mySize / 2), mySize, m);
        }
      }
    break;

    case states.ArcBricks: // Arc Bricks
      //const arcSize = 200;
      for (let x = 0; x < moveX; x++) {
        for (let y = 0; y < moveY; y++) {
          const xx = (x * mySize) + ((y % 2 === 0) ? 0 : -mySize / 2);
          let m = map(sin(frameCount*0.025 + ((x+1)*(y+1))), -1, 1, 0.0, 1.0);
          arcBrick(xx - 2, y * (mySize / 2) - 2, mySize, m);
        }
      }
    break;

    case states.PalmTreeLeaves: // Palm tree leaves
      //const palmSize = 110;
      dig = sqrt(mySize*mySize + mySize*mySize);
      for (let x = 0; x < moveX; x++) {
        for (let y = 0; y < moveY; y++) {
          const xx = (x * dig) + ((y % 2 === 0) ? 0 : dig / 2);
          let m = map(sin(frameCount*0.05 + ((x+1)*(y+1))), -1, 1, 0.0, 1.0);
          palm(xx + 3, y * (dig / 2) - 3, mySize * 0.9, y, m);
        }
      }
    break;

    case states.OverlappingSquares: // Overlapping squares
      dig = sqrt(mySize*mySize + mySize*mySize);
        for (let x = 0; x < moveX; x++) {
          for (let y = 0; y < moveY; y++) {
            const xx = (x * dig);
            let m = map(sin(frameCount*0.025 + ((x+1)*(y+1))), -1, 1, 0.0, 1.0);
            overlappingSquares(xx + 3, y * (dig / 2) + 3, mySize * 0.9, m);
          }
        }
    break;

    case states.Palms:
      push();
      dig = sqrt(mySize*mySize + mySize*mySize);
      for (let x = 0; x < moveX; x++) {
        for (let y = 0; y < moveY; y++) {
          const xx = (x * mySize) + ((y % 2 === 0) ? 0 : -mySize / 2);
          let m = map(sin(frameCount*0.025 + ((x+1)*(y+1))), -1, 1, 0.0, 1.0);
          palms(xx - dig / 2, y * (mySize / 2), mySize, m);
        }
      }
      pop();

    break;

    case states.Spotlights:
      push();
      dig = sqrt(mySize*mySize + mySize*mySize);
      for (let y = -2; y < moveY; y++) {
         for (let x = 0; x < moveX; x++) {
           const xx = (x * mySize) + ((y % 2 === 0) ? 0 : mySize / 2);
           let m = map(sin(frameCount*0.025 + ((x+1)*(y+1))), -1, 1, 0.0, 1.0);
           spotlight(xx - 20, y * (mySize / 2), mySize, m);
         }
      }
      pop();
    break;
  }
}


/**
 * Arc Fans
 */
function arcFan(x, y, size, progress) {
  push();
  translate(x, y);

  const arcOuter = size;
  const arcInner = size * 0.6;
  arc(0, 0, arcOuter, arcOuter, PI, TWO_PI, OPEN);
  arc(0, 0, arcInner, arcInner, PI, TWO_PI, OPEN);
  let mapped = map(progress, 0.0, 1.0, 0, 10); // how many lines
  const numOfLinks = mapped;
  for (let a = PI; a <= TWO_PI; a += PI / numOfLinks) {
    line(
      cos(a) * arcInner / 2,
      sin(a) * arcInner / 2,
      cos(a) * arcOuter / 2,
      sin(a) * arcOuter / 2,
    );
  }

  fill(gold);
  arc(0, 0, size * 0.45, size * 0.45, PI, TWO_PI, CHORD);
  noFill();
  line(size * -0.5, 0, size * 0.5, 0);

  pop();
}

/**
 * Overlapping squares
 */
function overlappingSquares(x, y, size, progress) {
  const sizeInner = size * 0.8;
  const border = (size - sizeInner) / 2;

  // Position
  push();
  translate(x, y);
  rotate(PI + QUARTER_PI);
  rectMode(CENTER);

  // Squares
  fill(gold);
  let mapped = map(progress, 0.0, 1.0, 0.0, 0.1); // how many lines
  rect(0, 0, size * mapped);
  noFill();
  mapped = map(progress, 0.0, 1.0, 1.4, 0.0); // how many lines
  rect(0, 0, size * mapped);
  pop();
}

/**
 * Palm tree leaves
 */
function palm(x, y, size, odd, progress) {
  let mapped = map(progress, 0.0, 1.0, 0.0, 0.8); // how many lines
  const sizeInner = size * mapped;
  const border = (size - sizeInner) / 2;

  // Position
  push();
  translate(x, y);
  rotate(PI + QUARTER_PI);

  // Border
  if (odd % 2 === 0) {
    rect(0, 0, size, size);
  }

  // Lines
  mapped = map(progress, 0.0, 1.0, 0, 7); // how many lines
  let numOfLines = int(mapped);
  for (let i = 0; i <= numOfLines * 2; i++) {
    let x = y = 1;
    if (i < numOfLines) {
      x = i / numOfLines;
    }
    else {
      y = (i - numOfLines) / numOfLines;
    }
    line(
      border,
      border,
      x * sizeInner + border,
      y * sizeInner + border
    );
  }
  pop();
}

/**
 * Arc bricks
 */
function arcBrick(x, y, size, progress) {
  push();
  translate(x, y);
  rect(0, 0, size, size / 2);
  let mapped = map(progress, 0.0, 1.0, 0, 7); // how many lines
  let numOfArcs = mapped;
  for (let i = 0; i <= numOfArcs; i++) {
    const arcSize = map(i, 0, numOfArcs, size, size * 0.4);
    if (i === 3) {
      fill(gold);
    } else {
      noFill();
    }
    arc(size / 2, size / 2, arcSize, arcSize, PI, TWO_PI, OPEN);
  }
  pop();
}

/**
 * Palms
 */
function palms(x, y, size, progress) {
  push();
  translate(x, y);
  const radius = size / 2;
  const numOfLines = 10;
  for (let i = 0; i <= numOfLines; i++) {
    let a = progress * PI;
    a *= (i / numOfLines) - 0.5;
    a -= HALF_PI;
    bezier(
      0, radius,
      0, radius,
      0, 0,
      cos(a) * radius, sin(a) * radius,
    );
  }

  arc(0, 0, size, size, PI, TWO_PI);

  pop();
}

/**
 * Spotlight
 */
function spotlight(x, y, size, progress) {
  push();
  translate(x, y);
  const radius = size / 2;

  noStroke();
  fill(black);
  beginShape();
  vertex(0, 0);
  vertex(-radius, size * 1.5);
  vertex(radius, size * 1.5);
  endShape(CLOSE);

  stroke(gold);
  //strokeWeight(1);
  //let mapped = map(progress, 0.0, 1.0, 0, 16); // how many lines
  let numOfLines = int(10);
  //const numOfLines = 16;
  for (let i = 0; i < numOfLines; i++) {
    let m = map(i, 0, numOfLines, 0.0, 1.0);
    line(
      0, 0,
      map(i, 0, numOfLines, -radius*progress, radius*progress), size * 1.5
    );
  }
  // Always have first&last line
  line(0, 0, -radius, size * 1.5);
  line(0, 0, radius, size * 1.5);
  pop();
}
