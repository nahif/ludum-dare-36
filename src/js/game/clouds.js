var clouds = {
};

var count = 5;
var imagePath = 'images/cloud.png';
var tag = 'cloud';

clouds.preload = function (game) {
  game.load.image(tag, imagePath);
};

clouds.create = function (game) {
  // Create empty group of clouds
  clouds = game.add.group();

  // Enable body
  clouds.enableBody = true;
  clouds.physicsBodyType = Phaser.Physics.ARCADE;

  // Iteration for clouds creation
  for (var i = 0; i < count; i++) {
    // Create cloud in random positions
    var rand = game.rnd.realInRange(300, 1000);
    var cloud = clouds.create(100 * i, rand, tag);
    cloud.name = 'cloud ' + i;
    cloud.checkWorldBounds = true;

    // Give random scale
    rand = game.rnd.realInRange(-4,3);
    cloud.scale.setTo(rand, rand);

    // Support out of bound event to reset the position
    cloud.events.onOutOfBounds.add(cloudOut, this);

    // Set cloud velocity
    cloud.body.velocity.x = 10 + Math.random() * 90;
  }
};

clouds.update = function (game) {

};

function cloudOut(cloud) {
  // Reset position
  cloud.reset(0, cloud.y);

  // Give new velocity
  cloud.body.velocity.x = 10 + Math.random() * 90;
}

module.exports = clouds;
