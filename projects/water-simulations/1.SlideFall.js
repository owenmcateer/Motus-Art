function Simulation() {
  const bodyDef = new b2BodyDef();
  const ground = world.CreateBody(bodyDef);

  // Boundaries
  const chainShape = new b2ChainShape();
  chainShape.vertices.push(new b2Vec2(-2, -2));
  chainShape.vertices.push(new b2Vec2(2, -2));
  chainShape.vertices.push(new b2Vec2(2, 2));
  chainShape.vertices.push(new b2Vec2(-2, 2));

  chainShape.CreateLoop();
  ground.CreateFixtureFromShape(chainShape, 0);

  const shape = new b2PolygonShape;
  shape.SetAsBoxXYCenterAngle(1, 1.99, new b2Vec2(-1.5, 0.01), 0);

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

  if (frameCount === fps * 2
    || frameCount === fps * 5
    || frameCount === fps * 7
    || frameCount === fps * 9
    || frameCount === fps * 11
  ) {
    const shape = new b2PolygonShape;
    shape.SetAsBoxXYCenterAngle(1, 1.99, new b2Vec2(-1.5, 0.01), 0);
    const xf = new b2Transform;
    xf.SetIdentity();
    this.particleSystem.DestroyParticlesInShape(shape, xf);

    const pd = new b2ParticleGroupDef;
    shape.position = new b2Vec2(
      map(sin(frameCount / 14), -1, 1, -1.7, 1.7),
      1.2,
    );
    pd.shape = shape;

    this.particleSystem.CreateParticleGroup(pd);


    /*
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
    */
  }
};
