/**
 * Motus: Detention forcefield
 * https://owenmcateer.github.io/Motus-Art
 *
 * 35,000 prime numbers mapped into a piece of art.
 * Inspired by 3blue1brown https://www.3blue1brown.com
 * Video on prime numbers creating spirals
 * I had a go at recreating it.
 * https://www.youtube.com/watch?v=EK32jo7i5LQ&t=180s
 */
const canvasSize = 1080;
const cx = canvasSize / 2;

let primes;
const colour = {};


function preload() {
  primes = loadStrings('../assets/data/primes-35k.txt');
}


function setup() {
  createCanvas(canvasSize, canvasSize);
  colour.blue = color(49, 222, 209, 150);
  colour.purple = color(181, 27, 226, 150);
}


function draw() {
  background(40);
  strokeWeight(4);

  translate(cx, cx);
  rotate(-HALF_PI);
  for (let i = 1; i < 35000; i++) {
    const phase = (sin(primes[i]) + 1) / 2;
    stroke(lerpColor(colour.blue, colour.purple, phase));

    point(
      sin(primes[i]) * (primes[i] * 0.00125),
      cos(primes[i]) * (primes[i] * 0.00125),
    );
  }

  // Don't loop
  noLoop();
}


/**
 * The following code was used to find the primes.
 *
const isPrime = num => {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false;
    return num > 1;
}

// Find prime numbers
let primeCount = 0;
let num = 1;
while (primeCount < 35000) {
  if(isPrime(num)) {
    console.log(num);
    primeCount++;
  }
  num++;
}
*/
