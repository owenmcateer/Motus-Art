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

  // Inflow
  const psd = new b2ParticleSystemDef();
  psd.radius = particleSize / 4;
  psd.dampingStrength = 1.82;
  this.particleSystem = world.CreateParticleSystem(psd);

  // The void
  const bd = new b2BodyDef();
  const circle = new b2CircleShape();
  bd.type = b2_staticBody;
  const body = world.CreateBody(bd);
  circle.position.Set(0, 0);
  circle.radius = 1.2;
  body.CreateFixtureFromShape(circle, 0);
}

// Render tick
Simulation.prototype.Step = function() {
  world.Step(timeStep, velocityIterations, positionIterations);
  // Timing actions
  if (frameCount < 270) {
    const shape = new b2PolygonShape;
    shape.SetAsBoxXYCenterAngle(0.15, 0.25, new b2Vec2(1.85, 1.85), 0);

    const pd = new b2ParticleGroupDef;
    shape.position = new b2Vec2(1, 1);
    pd.shape = shape;
    this.particleSystem.CreateParticleGroup(pd);
  } else if (frameCount > 300 && frameCount < 390) {
    // Sink drain
    const drain = new b2PolygonShape;
    drain.SetAsBoxXYCenterAngle(4, 0.1, new b2Vec2(-2, -1.9), 0);

    const pd = new b2ParticleGroupDef;
    pd.shape = drain;

    const xf = new b2Transform;
    xf.SetIdentity();
    world.particleSystems[0].DestroyParticlesInShape(drain, xf);
  }
  else if (frameCount > 390) {
    // Restart
    window.location.reload();
  }
};
