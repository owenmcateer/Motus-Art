/**
 * Motus: Shifting forces
 * https://owenmcateer.github.io/Motus-Art
 */
const canvas = 1080;
const cx = canvas / 2;

// module aliases
const {
  Engine,
  Render,
  Runner,
  Body,
  Composites,
  Common,
  World,
  Bodies,
} = Matter;

// Create engine
const engine = Engine.create();
const world = engine.world;

// Create renderer
const render = Render.create({
  element: document.body,
  engine,
  options: {
    width: canvas,
    height: canvas,
    wireframes: false,
    background: '#344969',
  },
});
Render.run(render);

// Start running
const runner = Runner.create();
Runner.run(runner, engine);

// add bodies
const size = 200;
const stroke = 10;
const chamfer = {
  radius: 10,
};

const stack = Composites.stack(130, 130, 4, 4, 10, 10, (x, y) => {
  const angle = Common.random(0, 45);

  const outlineA = Bodies.rectangle(x, y, size + stroke, (size / 4) + stroke, {
    angle,
    chamfer,
    render: {
      fillStyle: '#CB6A05',
      lineWidth: 0,
    },
  });
  const outlineB = Bodies.rectangle(x, y, (size / 4) + stroke, size + stroke, {
    angle,
    chamfer,
    render: outlineA.render,
  });

  const topA = Bodies.rectangle(x, y, size, size / 4, {
    angle,
    chamfer: 30,
    render: {
      fillStyle: '#E98C21',
      lineWidth: 0,
    },
  });
  const topB = Bodies.rectangle(x, y, size / 4, size, {
    angle,
    chamfer,
    render: topA.render,
  });

  return Body.create({
    parts: [outlineA, outlineB, topA, topB],
  });
});

const wallStyle = {
  fillStyle: '#283A5A',
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
  { x: 0, y: 4 },
  { x: 4, y: 0 },
  { x: 0, y: -4 },
  { x: -4, y: 0 },
];
function rotate() {
  engine.world.gravity.x = gravityDir[gravity].x;
  engine.world.gravity.y = gravityDir[gravity].y;
  // Next
  gravity++;
  if (gravity >= 4) {
    gravity = 0;
  }
  setTimeout(rotate, 2000);
}
rotate();
