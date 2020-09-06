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
  shape.SetAsBoxXYCenterAngle(2, 2, new b2Vec2(0, 1), 0);

  const psd = new b2ParticleSystemDef();
  psd.radius = particleSize / 4;
  psd.dampingStrength = 0.82;

  this.particleSystem = world.CreateParticleSystem(psd);

  const pd = new b2ParticleGroupDef();
  pd.shape = shape;
  this.particleSystem.CreateParticleGroup(pd);
}

// Step
Simulation.prototype.Step = function() {
  world.Step(timeStep, velocityIterations, positionIterations);

  // Drop block
  if (frameCount === fps * 6 || frameCount === fps * 8 || frameCount === fps * 12) {
    // circle
    const bd = new b2BodyDef();
    const circle = new b2CircleShape();
    bd.type = b2_dynamicBody;
    const body = world.CreateBody(bd);
    circle.position.Set(random(-1, 1), 0);
    circle.radius = 0.75;
    body.CreateFixtureFromShape(circle, 10);
  }
};
