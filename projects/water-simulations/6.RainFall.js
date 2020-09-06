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

  const shape = new b2PolygonShape;
  shape.SetAsBoxXYCenterAngle(1, 2, new b2Vec2(0, 0), 0);

  const psd = new b2ParticleSystemDef();
  psd.radius = particleSize / 4;
  psd.dampingStrength = 0.82;

  this.particleSystem = world.CreateParticleSystem(psd);

  const pd = new b2ParticleGroupDef();
  pd.shape = shape;
}

// Step
Simulation.prototype.Step = function() {
  world.Step(timeStep, velocityIterations, positionIterations);

  // Make it rain
  if (frameCount % round(fps / 3) === 0) {
    const shape = new b2PolygonShape;
    shape.SetAsBoxXYCenterAngle(0.15, 0.45, new b2Vec2(random(-2, 2), 1.7), 0);

    const pd = new b2ParticleGroupDef;
    shape.position = new b2Vec2(
      1,
      1,
    );
    pd.shape = shape;

    this.particleSystem.CreateParticleGroup(pd);
  }
};
