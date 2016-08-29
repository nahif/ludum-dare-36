var player = {
  x: 375,
  y: 1875
};

// Public atributes
player.floor = false;

// Private atributes
var keyboard = {
  LEFT: Phaser.Keyboard.LEFT,
  RIGHT: Phaser.Keyboard.RIGHT,
  SPACE: Phaser.Keyboard.SPACEBAR
};
var tag = 'player';
var imagePath = 'images/player.png';

// Public
player.preload = function (game) {
  game.load.spritesheet(tag, imagePath, 32, 64);
};

player.create = function (game) {
  // Load sprite
  player.sprite = game.add.sprite(player.x, player.y, tag);

  // Adding animation
  var fly = player.sprite.animations.add('fly');
  player.sprite.animations.play('fly', 5, true);

  // Enable physics
  game.physics.arcade.enable(player.sprite);
  player.sprite.body.gravity.y = 100;

  // Setting rotation point
  player.sprite.anchor.setTo(0.5);

  // Setting follor camera
  game.camera.follow(player.sprite);

  // Add impulse
  player.sprite.body.velocity.y = -500;
};

player.update = function (game) {
  move(game);
  fall(game);

  // Display Debug information
  game.debug.cameraInfo(game.camera, 32, 32);
  game.debug.bodyInfo(player.sprite, 32, 500);

};

// Private

function move (game) {
  if (!player.floor && (game.input.keyboard.isDown(keyboard.LEFT) || game.input.keyboard.isDown(keyboard.RIGHT))) {
    if (game.input.keyboard.isDown(keyboard.LEFT) && player.sprite.x > 18) {
      player.sprite.body.acceleration.x = -100;
    }
    if (game.input.keyboard.isDown(keyboard.RIGHT) && player.sprite.x < 1200 ) {
      player.sprite.body.acceleration.x = 100;
    }
  } else if (player.floor){
    player.sprite.body.acceleration.x = 0;
    player.sprite.body.velocity.x = player.sprite.body.velocity.x * 0.9;
  } else {
    player.sprite.body.acceleration.x = 0;
    player.sprite.body.velocity.x = player.sprite.body.velocity.x * 0.99;
  }
}

function fall (game) {
  if (player.sprite.x <= 18 && player.sprite.body.velocity.x <= 0) {
    player.sprite.body.velocity.x = 0;
  } else if (player.sprite.x >= 1174 && player.sprite.body.velocity.x >= 0) {
    debugger
    player.sprite.body.velocity.x = 0;
  }
  if (player.sprite.y > 1875) {
    player.sprite.body.velocity.y = 0;
    player.sprite.body.gravity.y = 0;
    player.sprite.animations.stop();
    player.floor = true;
  }
}

module.exports = player;
