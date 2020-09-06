function Explosion() {
  // camera.position.y = 2;
  // camera.position.z = 3;
  var bodyDef = new b2BodyDef();
  var ground = world.CreateBody(bodyDef);

  var chainShape = new b2ChainShape();
  chainShape.vertices.push(new b2Vec2(-2, -2));
  chainShape.vertices.push(new b2Vec2(2, -2));
  chainShape.vertices.push(new b2Vec2(2, 2));
  chainShape.vertices.push(new b2Vec2(-2, 2));

  chainShape.CreateLoop();
  ground.CreateFixtureFromShape(chainShape, 0);

  var shape = new b2PolygonShape;
  shape.SetAsBoxXYCenterAngle(2, 1, new b2Vec2(0, 1), 0);

  var psd = new b2ParticleSystemDef();
  psd.radius = particleSize/4;
  psd.dampingStrength = 0.82;

  // this.particleSystem = world.CreateParticleSystem(psd);

  // var pd = new b2ParticleGroupDef();
  // pd.shape = shape;
  // var group = this.particleSystem.CreateParticleGroup(pd);

  var psd = new b2ParticleSystemDef();
  psd.radius = 0.035;
  var particleSystem = world.CreateParticleSystem(psd);

  // one group
  var circle = new b2CircleShape();
  circle.position.Set(0, 0);
  circle.radius = 1;
  var pgd = new b2ParticleGroupDef();
  pgd.shape = circle;
  pgd.color.Set(255, 0, 0, 255);
  particleSystem.CreateParticleGroup(pgd);

  // circle
  bd = new b2BodyDef()
  var circle = new b2CircleShape();
  bd.type = b2_dynamicBody;
  var body = world.CreateBody(bd);
  circle.position.Set(0, 0);
  circle.radius = 0.5;
  body.CreateFixtureFromShape(circle, 0.5);
}

// Step
Explosion.prototype.Step = function() {
  world.Step(timeStep, velocityIterations, positionIterations);

  // Drop block
  if (frameCount === fps * 5) {
  }
}

