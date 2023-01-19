/**
 * Genuary 2023: Day 18
 * "Definitely not a grid"
 *
 * @motus_art
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const cx = canvas / 2;

// module aliases
const {
  Engine,
  Render,
  Runner,
  Composites,
  Common,
  World,
  Bodies,
} = Matter;

const colourPallet = [
  '#b83556',
  '#80a281',
  '#e1a253',
  '#4d7c9c',
  '#f07c31',
  '#c28f99',
  '#5a4a7b',
  '#916f41',
  '#947244',
  '#d0191d',
  '#aebdc2',
];

function randomColour() {
  return colourPallet[Math.floor(Math.random() * colourPallet.length)];
}

// Create engine
const engine = Engine.create();
const { world } = engine;

// Create renderer
const render = Render.create({
  element: document.body,
  engine,
  options: {
    width: canvas,
    height: canvas,
    wireframes: false,
    background: '#FBF5E4',
  },
});
Render.run(render);

// Start running
const runner = Runner.create();
Runner.run(runner, engine);

const stack = Composites.stack(
  40,
  50,
  11,
  11,
  30,
  30,
  (x, y) => (
    Bodies.rectangle(x + Common.random(4), y + Common.random(4), 60, 60, {
      render: {
        fillStyle: randomColour(),
      },
      angle: Common.random(0, 0.01),
      angularSpeed: Common.random(100),
      angularVelocity: Common.random(100),
    })
  ),
);

const wallStyle = {
  fillStyle: '#FBF5E4',
  lineWidth: 0,
};
World.add(world, [
  // Stack
  stack,
  // Outer walls
  Bodies.rectangle(cx, 0, canvas, 50, { isStatic: true, render: wallStyle }),
  Bodies.rectangle(canvas, cx, 50, canvas, { isStatic: true, render: wallStyle }),
  Bodies.rectangle(0, cx, 50, canvas, { isStatic: true, render: wallStyle }),
  Bodies.rectangle(cx, canvas, canvas, 50, { isStatic: true, render: wallStyle }),
]);

// fit the render viewport to the scene
Render.lookAt(render, {
  min: { x: 0, y: 0 },
  max: { x: 1080, y: 1080 },
});

// Shift gravity
let gravity = 0;
const gravityDir = [
  { x: 0, y: 2 },
  { x: 2, y: 0 },
  { x: 0, y: -2 },
  { x: -2, y: 0 },
];
function rotate() {
  engine.world.gravity.x = gravityDir[gravity].x;
  engine.world.gravity.y = gravityDir[gravity].y;

  // Next
  gravity = Math.floor(Common.random(gravityDir.length));
  setTimeout(rotate, 2000);
}
rotate();
