function Simulation() {
  const bodyDef = new b2BodyDef();
  const ground = world.CreateBody(bodyDef);

  const chainShape = new b2ChainShape();
  chainShape.vertices.push(new b2Vec2(-2, -2));
  chainShape.vertices.push(new b2Vec2(2, -2));
  chainShape.vertices.push(new b2Vec2(2, 2));
  chainShape.vertices.push(new b2Vec2(-2, 2));

  chainShape.CreateLoop();
  ground.CreateFixtureFromShape(chainShape, 0);

  const psd = new b2ParticleSystemDef();
  psd.radius = particleSize / 4;
  psd.dampingStrength = 0.2;

  this.particleSystem = world.CreateParticleSystem(psd);
  this.lastGroup = null;

  this.particleFlags = 0;
  this.groupFlags = 0;
}


// Render tick
Simulation.prototype.Step = function() {
  // Drain particles
  const p = new b2Vec2(2.25, -2.25);
  const shape = new b2CircleShape;
  shape.position = p;
  shape.radius = 0.5;
  const xf = new b2Transform;
  xf.SetIdentity();
  world.particleSystems[0].DestroyParticlesInShape(shape, xf);

  // Pour water
  this.Pour();

  // Run sim tick
  world.Step(timeStep, velocityIterations, positionIterations);
};

// Pour more water into sim
Simulation.prototype.Pour = function() {
  // Map mouse position
  const p = new b2Vec2(
    map(sin(frameCount / 14), -1, 1, -1.7, 1.7),
    1.25,
  );

  const shape = new b2CircleShape;
  shape.position = p;
  shape.radius = 0.4;
  const xf = new b2Transform;
  xf.SetIdentity();
  this.particleSystem.DestroyParticlesInShape(shape, xf);

  const pd = new b2ParticleGroupDef;
  shape.position = new b2Vec2(
    map(sin(frameCount / 14), -1, 1, -1.7, 1.7),
    1.35,
  );
  pd.shape = shape;

  this.lastGroup = this.particleSystem.CreateParticleGroup(pd);
};
