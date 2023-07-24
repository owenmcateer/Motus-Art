const bpm = new BpmTapper(60, 120);

const PRAMAS = {
  numOfLines: 0,
  freq: 4,
  speed: 0.04,
};
let phase = 1;

function setup() {
  createCanvas(1080, 1080);
  frameRate(60);

  PRAMAS.numOfLines = round(random(150, 250));
  PRAMAS.freq = random(4, 8);
  PRAMAS.offset = random(10000);
  PRAMAS.lineRadius = new Array(PRAMAS.numOfLines).fill(0);
  PRAMAS.lineTarget = new Array(PRAMAS.numOfLines).fill(0);

  newRadiuses();
  PRAMAS.speed = 1 / bpm.getBpmFps();
}

function draw() {

  background(39);
  stroke(239);
  strokeWeight(2);

  translate(width / 2, height / 2);

  const rotatePhase = frameCount  * 0.0025;

  for (let i = 0; i < PRAMAS.numOfLines; i++) {
    const a = i * (TWO_PI / PRAMAS.numOfLines) + rotatePhase;

    const easedPhase = easeInOutQuart(constrain(phase * 1.5, 0, 1), 0, 1, 1);
    const radius = lerp(PRAMAS.lineRadius[i],  PRAMAS.lineTarget[i], easedPhase);
    line(
      0,
      0,
      cos(a) * radius,
      sin(a) * radius,
    );
  }

  // Beat change
  if (frameCount % round(bpm.getBpmFps()) === 0) {
    newRadiuses();
  }

  // Speed control
  if (phase < 1) {
    phase += PRAMAS.speed;
  }
}



function newRadiuses() {
  phase = 0;

  // Copy old values
  PRAMAS.lineRadius = [...PRAMAS.lineTarget];

  // Set new values
  for (let i = 0; i < PRAMAS.numOfLines; i++) {
    const a = i * (TWO_PI / PRAMAS.numOfLines);
    const radius = noise(cos(a * PRAMAS.freq)+ PRAMAS.offset, sin(a * PRAMAS.freq) + PRAMAS.offset, frameCount) * width * 0.5;
    PRAMAS.lineTarget[i] = radius;
  }
}

function easeInOutQuart(t) {
  if ((t/=0.5) < 1) return 0.5*t*t*t*t;
  return -0.5 * ((t-=2)*t*t*t - 2);
}
