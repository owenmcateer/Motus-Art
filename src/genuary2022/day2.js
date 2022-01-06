/**
 * Genuary Day 1
 * "Dithering."
 *
 * Click to destroy.
 * @motus_art
 */
let newImg;
let capture;
let mode = 'video';
let particles = [];

const canvasSize = 540;
const resolution = 200;
const scale = canvasSize / resolution;


function setup() {
  createCanvas(canvasSize, canvasSize);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  frameRate(30);
  pixelDensity(1);
}


function draw() {
  background(39);

  // Scale webcam feed
  newImg = createGraphics(resolution, resolution);
  newImg.image(capture, 0, 0, newImg.width, newImg.height);

  // Modes
  switch (mode) {
    case 'video':
      newImg.loadPixels();
      newImg.filter(INVERT);
      ditherer(newImg.pixels);
      newImg.updatePixels();

      particles = [];
      processPixels();
      //image(newImg, 0, 0, width, height);
      break;

    case 'sim':
      particles.forEach((p) => {
        p.update();
      });
      break;
  }

  // Render pixels
  particles.forEach((p) => {
    p.render();
  });
}


/**
 * Check each pixel and create a particle when needed.
 */
function processPixels() {
  newImg.loadPixels();
  for (let i = 0; i < newImg.pixels.length; i += 4) {
    if (newImg.pixels[i] + newImg.pixels[i + 1] + newImg.pixels[i + 2] < 255 * 3) {
      const x = (i / 4) % resolution;
      const y = floor(i / 4 / resolution);
      particles.push(new Particle(x, y));
    }
  }
}


/**
 * Pressing the mouse triggers the particle to run and reset.
 */
function mouseClicked() {
  if (mode === 'video') {
    mode = 'sim';
  }
  else {
    mode = 'video';
  }
}


// Floyd–Steinberg dithering algorithm
// algorithm lifted from https://github.com/meemoo/meemooapp/blob/main/src/nodes/image-monochrome-worker.js
// By @meemoo https://github.com/meemoo
const lumR = [];
const lumG = [];
const lumB = [];
for (let i = 0; i < 256; i++) {
  lumR[i] = i * 0.299;
  lumG[i] = i * 0.587;
  lumB[i] = i * 0.114;
}

function ditherer(imageData) {
  const imageDataLength = imageData.length;

  // Greyscale luminance
  for (let i = 0; i <= imageDataLength; i += 4) {
    imageData[i] = Math.floor(lumR[imageData[i]] + lumG[imageData[i + 1]] + lumB[imageData[i + 2]]);
  }

  const w = imageData.width;
  let newPixel;
  let err;

  for (var currentPixel = 0; currentPixel <= imageDataLength; currentPixel += 4) {
    newPixel = imageData[currentPixel] < 129 ? 0 : 255;
    err = Math.floor((imageData[currentPixel] - newPixel) / 16);
    imageData[currentPixel] = newPixel;

    imageData[currentPixel + 4] += err * 7;
    imageData[currentPixel + 4 * w - 4] += err * 3;
    imageData[currentPixel + 4 * w] += err * 5;
    imageData[currentPixel + 4 * w + 4] += err * 1;

    // Set g and b pixels equal to r
    imageData[currentPixel + 1] = imageData[currentPixel + 2] = imageData[currentPixel];
  }

  return imageData;
}
