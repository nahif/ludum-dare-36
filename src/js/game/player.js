var player = {
  x: 100,
  y: 1000
};
var keyboard = {
  LEFT: Phaser.Keyboard.LEFT,
  RIGHT: Phaser.Keyboard.RIGHT,
  SPACE: Phaser.Keyboard.SPACEBAR
};
var tag = 'player';
var imagePath = 'images/player.png';
var beforeTime = 0;

// Public
player.preload = function (game) {
  game.load.image(tag, imagePath);
};

player.create = function (game) {
  player.sprite = game.add.sprite(player.x, player.y, tag);
  game.physics.arcade.enable(player.sprite);
  player.sprite.anchor.setTo(0.5);
  player.sprite.body.gravity.y = 200;
  game.camera.follow(player.sprite);
  player.sprite.body.velocity.x = 300;
};

player.update = function (game) {
  move(game);
  game.debug.cameraInfo(game.camera, 32, 32);
  game.debug.bodyInfo(player.sprite, 32, 500);
};

// Private

function move (game) {
  var delta = game.time.elapsedSince(beforeTime);
  beforeTime = beforeTime + delta;
  if (game.input.keyboard.isDown(keyboard.LEFT)) {
    player.sprite.angle += 1;
  }
  if (game.input.keyboard.isDown(keyboard.RIGHT)) {
    player.sprite.angle -= 1;
  }
  if (game.input.keyboard.isDown(keyboard.SPACE)) {
    player.sprite.body.acceleration.y = -300;
    player.sprite.body.velocity.x += 1;
  } else {
    player.sprite.body.acceleration.y = 0;
  }
  player.sprite.body.velocity.x -= player.sprite.body.velocity.x * 0.01;
  game.debug.text(delta,100,300);
}


module.exports = player;
