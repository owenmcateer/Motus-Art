/**
 * Motus: X-Wing HUD
 * May the 4th be with you
 * https://owenmcateer.github.io/Motus-Art
 *
 * Star Wars copyright Lucasfilm Ltd.
 */
const canvas = 1080;
const colours = [];
let xWingFont;
let countdown;
const countdownSpeed = 53;
const cx = canvas / 2;
let speed;
let scene = 'RESET';
let targetLockShow;
const targetLockHold = 3;
const countdown2target = 10000;
let canvasStars;
let explodeTimer;
let linesAnimastion;

// hud console
const hud = {
  x: 50,
  y: 100,
  h: 700,
  r: 60,
  b: 12,
};
hud.w = canvas - (hud.x * 2);
hud.cx = (hud.w / 2) + hud.x;
hud.cy = (hud.h / 2) + hud.y;

const fixedLines = [
  {
    x: 294,
    y: 100,
    wall: 0,
  },
  {
    x: 141,
    y: 100,
    wall: 0,
  },
  {
    x: 50,
    y: 283,
    wall: 1,
  },
  {
    x: 50,
    y: 548,
    wall: 1,
  },
  {
    x: 110,
    y: 800,
    wall: 0,
  },
  {
    x: 294,
    y: 800,
    wall: 0,
  },
];
// Duplicate for right side.
const fixedLinesRight = fixedLines.map((pos) => {
  return Object.assign({}, pos, {
    x: canvas - pos.x,
  });
});
fixedLines.push(...fixedLinesRight);

// Preload
function preload() {
  // X-wing HUD font by 2bndy5 (https://2bndy5.deviantart.com)
  xWingFont = loadFont('../assets/img/week_13/XWingTargetingComputer.otf');
}

// Setup
function setup() {
  createCanvas(canvas, canvas);
  pixelDensity(1);
  colorMode(RGB, 255, 255, 255, 1);
  angleMode(DEGREES);

  // Colours
  colours.bg = 0;
  colours.yellow = [229, 195, 78];
  colours.text = [185, 54, 35];
  colours.red = [185, 54, 35];
  colours.gray = [100];

  canvasStars = drawStars();
}

function draw() {
  background(colours.bg);

  // Reset
  if (scene === 'RESET') {
    countdown = 21512;
    speed = 0.07;
    scene = 'FLYING';
    targetLockShow = 0;
    explodeTimer = 0;
    linesAnimastion = 0;
  }

  if (scene === 'FLYING' || scene === 'TARGET') {
    // Fixed lines
    drawFixedLines();

    // Moving lines
    for (let i = 0; i < 10; i += 2) {
      drawLine(linesAnimastion + i);
    }
    // Render Thermal exhaust port?
    if (scene === 'TARGET') {
      drawLine(linesAnimastion, true);
    }
    linesAnimastion += speed;
    if (linesAnimastion > 10) {
      linesAnimastion = 0;
    }

    // Target lines
    if (countdown < countdown2target) {
      drawTargetLines();
    }

    // Change scene to target
    if (countdown <= countdown2target && linesAnimastion === 0) {
      scene = 'TARGET';
    }
  }
  else if (scene === 'LOCKED') {
    // Target locked
    drawTargetLock();
  }
  else if (scene === 'EXPLODE') {
    explode();
  }

  if (scene !== 'EXPLODE') {
    // Draw UI mask
    drawUImask();

    // Draw UI
    drawUI();

    // Draw countdown
    drawCountdown();

    // End countdown
    countdown -= countdownSpeed;
  }
}

// Render fixed lines
function drawFixedLines() {
  stroke(colours.yellow);
  fill(colours.yellow);
  strokeWeight(4);
  fixedLines.forEach((pos) => {
    // The lines are drawn as triangles to add depth of field
    if (pos.wall === 0) {
      triangle(pos.x, pos.y, pos.x + 12, pos.y, hud.cx, hud.cy);
    }
    else {
      triangle(pos.x, pos.y, pos.x, pos.y + 12, hud.cx, hud.cy);
    }
  });
}

// HUD lines mask
function drawUImask() {
  stroke(colours.bg);
  strokeWeight(36);
  noFill();
  rect(hud.x - hud.b, hud.y - hud.b, hud.w + hud.b + hud.b, hud.h + hud.b + hud.b, 48);
}

// Render UI
function drawUI() {
  stroke(colours.yellow);
  strokeWeight(hud.b);
  noFill();
  rect(hud.x, hud.y, hud.w, hud.h, hud.r);
  rect(230, 840, canvas - 460, 150, 30);
}

// Countdown
function drawCountdown() {
  let txt;
  if (countdown > 0) {
    const leadingZeros = 5 - countdown.toString().length;
    txt = '0'.repeat(leadingZeros) + countdown;
  }
  else {
    txt = '00000';
  }

  noStroke();
  fill(colours.text);
  textFont(xWingFont);
  textSize(130);
  textAlign(LEFT);
  text(txt, 270, 968);
}

// Render lines
function drawLine(i, exhaustPort) {
  if (i > 10) {
    i -= 10;
  }

  // Moving lines
  stroke(colours.yellow);

  const zPos = easeInExpo(i, 0, 1, 10);
  const yPos = hud.h * zPos;
  const zOffset = (zPos * hud.w / 2) + hud.cx;

  const top = Math.max(hud.y, hud.cy - yPos);
  const bottom = Math.min(hud.y + hud.h, hud.cy + yPos);
  strokeCap(SQUARE);
  strokeWeight(map(zPos, 0, 1, 4, 12));
  noFill();

  // Draw shape
  strokeJoin(MITER);
  beginShape();
  vertex(zOffset, top);
  vertex(zOffset, bottom);
  vertex(hud.cx - (zOffset - hud.cx), bottom);
  vertex(hud.cx - (zOffset - hud.cx), top);

  // Thermal exhaust port?
  if (exhaustPort && i >= 9.9) {
    speed = 0;
    scene = 'LOCKED';
  }
  if (exhaustPort) {
    fill(colours.bg);
    endShape(CLOSE);

    // Exhaust port
    strokeWeight(map(zPos, 0, 1, 1, 12));
    const portSize = map(zPos, 0, 1, 1, 600);
    ellipse(hud.cx, hud.cy, portSize, portSize);
    line(hud.cx, top, hud.cx, bottom);
    line(hud.cx - (zOffset - hud.cx), hud.cy, zOffset, hud.cy);
  }
  else {
    endShape();
  }
}

// Render targeting lines
function drawTargetLines() {
  strokeWeight(10);
  stroke(colours.red);
  let offset = map(countdown, countdown2target, 0, hud.x + hud.r, hud.w / 2);
  offset = Math.min(hud.cx - hud.x, offset);
  const x = hud.x + offset;
  line(x, hud.y, x, hud.y + hud.h);
  const x2 = hud.w + hud.r + hud.x - hud.b - x;
  line(x2, hud.y, x2, hud.y + hud.h);
}

// Render target lock
function drawTargetLock() {
  targetLockShow++;
  if (targetLockShow % targetLockHold === 0) return;
  if (targetLockShow > (targetLockHold * 12)) {
    scene = 'EXPLODE';
  }

  stroke(colours.red);
  strokeWeight(12);
  noFill();
  line(hud.x, hud.cy, hud.w + hud.x, hud.cy);
  line(hud.cx, hud.y, hud.cx, hud.h + hud.y);

  fill(colours.red);
  stroke(colours.red);
  strokeWeight(14);
  strokeJoin(ROUND);

  resetMatrix();
  translate(649, 284);
  rotate(40);
  quad(0, 0, 35, 24, 70, 0, 35, 110);

  resetMatrix();
  translate(702, 561);
  rotate(140);
  quad(0, 0, 35, 24, 70, 0, 35, 110);

  resetMatrix();
  translate(429, 607);
  rotate(220);
  quad(0, 0, 35, 24, 70, 0, 35, 110);

  resetMatrix();
  translate(375, 329);
  rotate(320);
  quad(0, 0, 35, 24, 70, 0, 35, 110);
  resetMatrix();
}

function explode() {
  // Add stars
  image(canvasStars, 0, 0);

  if (explodeTimer <= 60) {
    // Draw death star
    fill(90);
    noStroke();
    ellipse(cx, cx, 190, 190);
    fill(60);
    ellipse(cx + 15, cx - 20, 47, 50);
  }
  else if (explodeTimer > 180) {
    scene = 'RESET';
  }
  else if (explodeTimer > 120) {
    fill(0);
    rect(0, 0, width, height);
  }
  // Boom
  else if (explodeTimer > 40) {
    // Mult
    const mult = (explodeTimer - 40) / 80;

    // Flair
    if (explodeTimer > 60) {
      const h = (mult * 1000) + 220;
      const w = (mult * 60) + 30;
      const s = (mult * 25) + 15;
      const t = map(mult, 0, 1, 0.9, 0.6);
      const top = (mult * 11) + 280;
      const bottom = (mult * -8) + 81;
      const x = (mult * -20) + cx;
      noFill();
      stroke(255, 255, 255, t);
      strokeWeight(s);
      rotate(-5);
      arc(x - 55, cx + 40, w, h, bottom, top);
      rotate(5);
    }

    // Explosions (lazy but quick coding)
    noStroke();
    fill(255, 250 ,255, random(0.3, 0.4));
    ellipse(cx, cx, (mult * 600) + 80 + random(20), (mult * 250) + 110 + random(20));
    fill(255, 230 ,255, random(0.3, 0.4));
    ellipse(cx, cx, (mult * 550) + 60 + random(20), (mult * 210) + 90 + random(20));
    fill(255, 250 ,255, random(0.3, 0.4));
    ellipse(cx, cx, (mult * 520) + 70 + random(20), (mult * 190) + 80 + random(20));
    fill(255, 237 ,255, random(0.3, 0.4));
    ellipse(cx, cx, (mult * 620) + 80 + random(20), (mult * 260) + 95 + random(20));
  }

  // Timer
  explodeTimer++;
}

function drawStars() {
  const sky = createGraphics(width, height);
  sky.fill(colours.bg);

  // Add some stars
  sky.noStroke();
  sky.fill(255, 255, 255, random(60, 150));
  for (let i = 0; i < 1000; i++) {
    sky.ellipse(random(0, width), random(0, height), random(1, 4));
  }

  return sky;
}

function easeInExpo(t, b, c, d) {
  return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
};
