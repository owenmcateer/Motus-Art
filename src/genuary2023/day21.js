/**
 * Genuary 2023: Day 21
 * "Persian Rug"
 *
 * Collab with artist duo DistC. & Motus Art
 * https://twitter.com/distcollective
 * https://twitter.com/motus_art
 */
let particles = [],
   particles2 = [],
   particles3 = [];
let noiseMult = 0.003;
let vec, vec2, vec3;

let rSeed
let nSeed
let arMult = 3 / 4
let noiseC1, noiseC2, noiseC3

let sw
let flag1 = false;
let flag2 = false;
let flag3 = false;
let flag4 = false;
let bolBol = false;
let bol1, bol2, bol3
let pg
let noiseRandom1, noiseRandom2, noiseRandom3
let max
let wi

let col1, col2, col3
let col1Smin, col1Smax
let col2Smin, col2Smax
let col3Smin, col3Smax

let col1Bmin, col1Bmax
let col2Bmin, col2Bmax
let col3Bmin, col3Bmax

let pix = 2;

let randomMag1,randomMag2,randomMag3


function setup() {
  let ar = 4 / 3
  createCanvas(1000, 1000 * ar);
  pg = createGraphics(1000, 1000 * ar)

  pixelDensity(pix)
  colorMode(HSB, 360, 100, 100, 1);
  background(20, 10, 80);
  rectMode(CENTER)

  pg.pixelDensity(pix)
  pg.colorMode(HSB, 360, 100, 100, 1);
  pg.background(20, 10, 80);
  pg.rectMode(CENTER);


  rSeed = random() * 999999
  nSeed = random() * 999999

  randomSeed(rSeed)
  noiseSeed(nSeed)


  ////////////////////////////////////-------------------------Colors

  let colSel = random(1)

  arMult = random([3 / 4 / 2, 3 / 4, 3 / 4, 2 / 4, 3 / 4])

  let hues = [10,190,30]

  if (colSel > 0.66) {///cycling same colors between particle systems
    col1 = hues[0];
    col1Smin = 60
    col1Smax = 80
    col1Bmin = 30
    col1Bmax = 50

    col2 = hues[1];
    col2Smin = 10
    col2Smax = 40
    col2Bmin = 5
    col2Bmax = 20

    col3 = hues[2];
    col3Smin = 60
    col3Smax = 80
    col3Bmin = 40
    col3Bmax = 80

  } else if (colSel > 0.33) {

    col1 = hues[2];
    col1Smin = 60
    col1Smax = 80
    col1Bmin = 40
    col1Bmax = 80

    col2 = hues[0];
    col2Smin = 60
    col2Smax = 80
    col2Bmin = 30
    col2Bmax = 50

    col3 = hues[1];
    col3Smin = 10
    col3Smax = 40
    col3Bmin = 5
    col3Bmax = 20

  } else {
    col1 = hues[1];
    col1Smin = 10
    col1Smax = 40
    col1Bmin = 5
    col1Bmax = 20

    col2 = hues[2];
    col2Smin = 60
    col2Smax = 80
    col2Bmin = 40
    col2Bmax = 80

    col3 = hues[0];
    col3Smin = 60
    col3Smax = 80
    col3Bmin = 30
    col3Bmax = 50

  }
  //////////////////////////////////////////////////



  sw = map(pix, 1, 7, 2, 2.35) * 1.5 //strokeWeight relative to pixelDensity

  noiseRandom1 = random(45, 55)
  noiseRandom2 = random(45, 55)
  noiseRandom3 = random(45, 55)


  max = random(0.1, 0.3);
  colPic2 = random(1)

  placements();///Particle systems starting points
}

function draw() {
  noStroke()
  pg.noStroke();

  frameRate(60);
  image(pg, 0, 0)

  randomMag1 = random(2.3,2.6)
  randomMag2 = random(2.3,2.6)
  randomMag3 = random(2.3,2.6)

  //////Magnite mapped to noise. This determines the speed of each particle system thus chainging the dominant colors
  let magN1 = map(ourNoise(frameCount / (1000 / random(0.80, 1.10)) / 0.5), 0, 1, 0.1, 0.7) * randomMag1;
  let magN2 = map(ourNoise(frameCount / (1050 / random(0.90, 1.20)) / 0.5), 0, 1, 0.1, 0.7) * randomMag2;
  let magN3 = map(ourNoise(frameCount / (950 / random(0.80, 1.20)) / 0.5), 0, 1, 0.1, 0.7) * randomMag3;


  for (let i = 0; i < particles.length; i = i + 1) {

    vec = createVector(0, 1);
    vec2 = createVector(0, 1);
    vec3 = createVector(0, 1);

    vec.setMag(magN1 * (sw / 2));
    vec2.setMag(magN2 * (sw / 2));
    vec3.setMag(magN3 * (sw / 2));

    particles[i].add(vec);
    particles2[i].add(vec2);
    particles3[i].add(vec3);

    let alphaStrength  = 4
    //Mapping alpha to noise to achieve the "old rug" effect - changing alphaStrength between 1 and 4, or changing noiseMult between 0.1 - 0.001 makes some drastic changes
    let alpha1 = map(ourNoise(particles[i].x * noiseMult, particles[i].y * noiseMult * 100),0,1,0,1)/alphaStrength

    let alpha2 = map(ourNoise(particles2[i].x * noiseMult, particles2[i].y * noiseMult * 92),0,1,0,1)/alphaStrength

    let alpha3 = map(ourNoise(particles3[i].x * noiseMult, particles3[i].y * noiseMult * 112),0,1,0,1)/alphaStrength



      pg.fill(col1, randomCol(col1Smin, col1Smax), randomCol(col1Bmin, col1Bmax), alpha1);
      pg.ellipse(particles[i].x + alpha1 * 5 * random(-1, 1) ^ particles3[i].y * arMult, particles[i].y, sw)

      if (particles[i].y >= height - 5) {
        flag1 = true
      }



      pg.fill(col2, randomCol(col2Smin, col2Smax), randomCol(col2Bmin, col2Bmax), alpha2);
      pg.ellipse(particles2[i].x ^ particles2[i].y * arMult, particles2[i].y + alpha2 * 5 * random(-1, 1), sw)

      if (particles2[i].y >= height - 5) {
        flag2 = true
      }



      pg.fill(col3, randomCol(col3Smin, col3Smax), randomCol(col3Bmin, col3Bmax), alpha3);
      pg.ellipse(particles3[i].x, particles3[i].y, sw * 1)

      if (particles3[i].y >= height - 5) {
        flag3 = true
      }

  }


  bolBol = flag1 && flag2 && flag3;

  frame(30)

  if (bolBol) {
    granulate(50);
    noLoop();
  }

}


function placements() {

  let hei = random([10, 20, 50, 100, 50, 50, 20])// starting noiseMap height

  console.log(hei)

  let space = 1
  let x1 = 0
  let x1L = 1000
  let y1 = 2 - hei / 5

  for (let x = x1; x < x1 + x1L; x += space) {
    let y = y1 + noise(x * 0.04, frameCount * 0.02) * hei
    let p = createVector(x, y)
    particles.push(p)
  }

  for (let x = x1; x < x1 + x1L; x += space) {
    let y = y1 + noise(x * 0.08, frameCount * 0.03) * hei
    let p = createVector(x, y)
    particles2.push(p)
  }

  for (let x = x1; x < x1 + x1L; x += space) {
    let y = y1 + noise(x * 0.038, frameCount * 0.01) * hei
    let p = createVector(x, y)
    particles3.push(p)
  }
}

function frame(size) {

  fill(20, 10, 80);
  noStroke();
  rect(size * 0.5, height * 0.5, size, height);
  rect(width - size * 0.5, height  * 0.5, size, height);
}

function granulate(amount) {
  loadPixels();
  const d = pixelDensity();
  const pixelsCount = 4 * (width * d) * (height * d);
  for (let i = 0; i < pixelsCount; i += 4) {
    const grainAmount = random(-amount, amount);
    pixels[i] = pixels[i] + grainAmount;
    pixels[i + 1] = pixels[i + 1] + grainAmount;
    pixels[i + 2] = pixels[i + 2] + grainAmount;
  }
  updatePixels();
}

function ourNoise(x = 0, y = 0, z = 0) {
  // return noise(x, y, z);
  return ((sin(x) * sin(y * y)) + 1) / 2;
  // return (sin(x+y + random()) + 1) / 2;
}

function randomCol(a, b) {
  // return random(a, b);
  return sqrt(a*b + a*b);
}

function keyPressed() {
  if (key == 's') {
    saveCanvas("genuary2023-day21-Persian.Rug", 'png');
  }
}
