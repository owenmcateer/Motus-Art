/**
 * Genuary 2025: Day 07
 * "Use software that is not intended to create art or images."
 *
 * Orgional author of the 3D cube code unknown. Rewritten, patched, hacked together over many years.
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
console.log('Look at the DOM inspector');

// Create comment node
const commentNode = document.createComment('');
document.insertBefore(commentNode, document.firstChild);

// Config
let xRot = 1;
let yRot = 1;

const ScreenX = 26;
const ScreenY = 26;
const boxSize = 6;

const xCenter = Math.round(ScreenX / 2);
const yCenter = Math.round(ScreenY / 2);
const zCenter = 256;

// Build screen array
const AsciiArray = [];
for (let y = 1; y <= ScreenY; y++) {
  AsciiArray[y] = [];
  AsciiArray[y].length = ScreenX + 1;
}

// Main loop:
function RenderLoop() {
  for (let y = 1; y < ScreenY; y++) {
    for (let x = 1; x < ScreenX; x++) {
      AsciiArray[x][y] = 0;
    }
  }

  xRot += 0.01;
  yRot += 0.03;

  draw3Dline(-boxSize, boxSize, boxSize, boxSize, boxSize, boxSize, 1);
  draw3Dline(boxSize, -boxSize, boxSize, boxSize, boxSize, boxSize, 1);
  draw3Dline(boxSize, boxSize, -boxSize, boxSize, boxSize, boxSize, 1);
  draw3Dline(-boxSize, -boxSize, boxSize, -boxSize, boxSize, boxSize, 1);
  draw3Dline(-boxSize, boxSize, -boxSize, -boxSize, boxSize, boxSize, 1);
  draw3Dline(-boxSize, -boxSize, boxSize, boxSize, -boxSize, boxSize, 1);
  draw3Dline(-boxSize, boxSize, -boxSize, boxSize, boxSize, -boxSize, 1);
  draw3Dline(-boxSize, -boxSize, -boxSize, boxSize, -boxSize, -boxSize, 1);
  draw3Dline(-boxSize, -boxSize, -boxSize, -boxSize, boxSize, -boxSize, 1);
  draw3Dline(boxSize, -boxSize, -boxSize, boxSize, -boxSize, boxSize, 1);
  draw3Dline(boxSize, -boxSize, -boxSize, boxSize, boxSize, -boxSize, 1);
  draw3Dline(-boxSize, -boxSize, -boxSize, -boxSize, -boxSize, boxSize, 1);

  let cubeText = '';

  for (let y = 1; y < ScreenY; y++) {
    for (let x = 1; x < ScreenX; x++) {
      if (AsciiArray[x][y] === 0) {
        cubeText += '  ';
      } else {
        cubeText += '%%';
      }
    }
    cubeText += "\n";
  }

  cubeText += "Genuary 2025: Day 07\nUse software that is not intended to create art or images.\n";

  // Output 3D cube
  commentNode.nodeValue = cubeText;

  // Render tick
  requestAnimationFrame(RenderLoop);
}

// General routines: (pixel-plotting and so on).
// Orgional author unknown. Patched together over many years.
function draw3Dline(x1, y1, z1, x2, y2, z2, Colour) {
  var scrX1 = 0;
  var scrY1 = 0;
  var scrX2 = 0;
  var scrY2 = 0;

  var rotX1 = 0;
  var rotY1 = 0;
  var rotZ1 = 0;
  var rotX2 = 0;
  var rotY2 = 0;
  var rotZ2 = 0;

  // 3D rotation:
  rotX1 = -x1 * Math.sin(xRot) + y1 * Math.cos(xRot);
  rotY1 =
    -x1 * Math.cos(xRot) * Math.sin(yRot) -
    y1 * Math.sin(xRot) * Math.sin(yRot) -
    z1 * Math.cos(yRot); //+ p
  rotZ1 =
    -x1 * Math.cos(xRot) * Math.cos(yRot) -
    y1 * Math.sin(xRot) * Math.cos(yRot) +
    z1 * Math.sin(yRot);
  rotX2 = -x2 * Math.sin(xRot) + y2 * Math.cos(xRot);
  rotY2 =
    -x2 * Math.cos(xRot) * Math.sin(yRot) -
    y2 * Math.sin(xRot) * Math.sin(yRot) -
    z2 * Math.cos(yRot); //+ p
  rotZ2 =
    -x2 * Math.cos(xRot) * Math.cos(yRot) -
    y2 * Math.sin(xRot) * Math.cos(yRot) +
    z2 * Math.sin(yRot);

  // Convert to 2D line:
  scrX1 = Math.round(256 * (rotX1 / (rotZ1 + zCenter)) + xCenter);
  scrY1 = Math.round(256 * (rotY1 / (rotZ1 + zCenter)) + yCenter);
  scrX2 = Math.round(256 * (rotX2 / (rotZ2 + zCenter)) + xCenter);
  scrY2 = Math.round(256 * (rotY2 / (rotZ2 + zCenter)) + yCenter);

  // ...and draw it!
  drawLine(scrX1, scrY1, scrX2, scrY2, Colour);
}

function putPixel(x, y, Colour) {
  if (x > 0 && x <= ScreenX && y > 0 && y <= ScreenY) {
    AsciiArray[x][y] = Colour;
  }
}

function drawLine(x1, y1, x2, y2, Colour) {
  deltax = Math.abs(x2 - x1); // The difference between the x's
  deltay = Math.abs(y2 - y1); // The difference between the y's
  x = x1; // Start x off at the first pixel
  y = y1; // Start y off at the first pixel

  if (x2 >= x1) {
    // The x-values are increasing
    xinc1 = 1;
    xinc2 = 1;
  } // The x-values are decreasing
  else {
    xinc1 = -1;
    xinc2 = -1;
  }

  if (y2 >= y1) {
    // The y-values are increasing
    yinc1 = 1;
    yinc2 = 1;
  } // The y-values are decreasing
  else {
    yinc1 = -1;
    yinc2 = -1;
  }

  if (deltax >= deltay) {
    // There is at least one x-value for every y-value
    xinc1 = 0; // Don't change the x when numerator >= denominator
    yinc2 = 0; // Don't change the y for every iteration
    den = deltax;
    num = deltax / 2;
    numadd = deltay;
    numpixels = deltax; // There are more x-values than y-values
  } // There is at least one y-value for every x-value
  else {
    xinc2 = 0; // Don't change the x for every iteration
    yinc1 = 0; // Don't change the y when numerator >= denominator
    den = deltay;
    num = deltay / 2;
    numadd = deltax;
    numpixels = deltay; // There are more y-values than x-values
  }

  for (curpixel = 0; curpixel <= numpixels; curpixel++) {
    putPixel(x, y, Colour); // Draw the current pixel
    num += numadd; // Increase the numerator by the top of the fraction
    if (num >= den) {
      // Check if numerator >= denominator
      num -= den; // Calculate the new numerator value
      x += xinc1; // Change the x as appropriate
      y += yinc1; // Change the y as appropriate
    }
    x += xinc2; // Change the x as appropriate
    y += yinc2; // Change the y as appropriate
  }
}

// Go!
requestAnimationFrame(RenderLoop);
