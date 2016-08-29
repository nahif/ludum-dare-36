var dinodude = {
  x: 0,
  y: 1720
};

var imagePath = 'images/dinodude.png';
var tag = 'dinodude';

// Public Methods
dinodude.preload = function (game) {
  game.load.spritesheet(tag, imagePath, 400, 200);
};

dinodude.create = function (game) {
  // Add sprite to game
  dinodude.sprite = game.add.sprite(dinodude.x, dinodude.y, tag);

  // Add tail animation
  dinodude.animation = dinodude.sprite.animations.add('tail');
  dinodude.sprite.animations.play('tail', 15, false);
};

dinodude.update = function (game) {
  game.debug.bodyInfo(dinodude.sprite, 32, 500);
};

module.exports = dinodude;
