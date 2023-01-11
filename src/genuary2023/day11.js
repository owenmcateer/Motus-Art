/**
 * Motus: Suprematism
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
  230,
  230,
  Math.round(Math.random() * 2 + 3),
  Math.round(Math.random() * 2 + 3),
  30,
  30,
  (x, y) => {
    const sides = Math.round(Common.random(1, 8));

    // round the edges of some bodies
    let chamfer = null;
    if (sides > 2 && Common.random() > 0.7) {
      chamfer = {
        radius: 10,
      };
    }

    switch (Math.round(Common.random(0, 1))) {
      case 0:
        if (Common.random() < 0.8) {
          return Bodies.rectangle(x, y, Common.random(25, 500), Common.random(25, 200), {
            chamfer,
            render: {
              fillStyle: randomColour(),
            },
          });
        }

        return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(25, 300), {
          chamfer,
          render: {
            fillStyle: randomColour(),
          },
        });

      case 1:
        return Bodies.polygon(x, y, sides, Common.random(25, 100), {
          chamfer,
          render: {
            fillStyle: randomColour(),
          },
        });

      default:
    }
  },
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
  gravity++;
  if (gravity >= 4) {
    gravity = 0;
  }
  setTimeout(rotate, 3000);
}
rotate();