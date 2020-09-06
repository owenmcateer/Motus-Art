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

  // Left
  const shapeLeft = new b2PolygonShape;
  shapeLeft.SetAsBoxXYCenterAngle(0.05, 0.1, new b2Vec2(random(-1.7, -1.9), 1.9), 0);
  const pdLeft = new b2ParticleGroupDef;
  shapeLeft.position = new b2Vec2(1, 1);
  pdLeft.shape = shapeLeft;
  this.particleSystem.CreateParticleGroup(pdLeft);

  // Right
  const shapeRight = new b2PolygonShape;
  shapeRight.SetAsBoxXYCenterAngle(0.05, 0.1, new b2Vec2(random(1.7, 1.9), 1.9), 0);
  const pdRight = new b2ParticleGroupDef;
  shapeRight.position = new b2Vec2(1, 1);
  pdRight.shape = shapeRight;
  this.particleSystem.CreateParticleGroup(pdRight);


  if (frameCount === 150) {
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
