var game = {};

// Classes
var player = require('./player');
var dinodude = require('./dinodude');
var clouds = require('./clouds');

game.preload = function () {
  game.load.image('background', 'images/sky.png');
  game.load.image('floor', 'images/Tile1.png');
  game.physics.setBoundsToWorld();
  clouds.preload(this.game);
  dinodude.preload(this.game);
  player.preload(this.game);
};

game.create = function () {
  game.add.tileSprite(0, 0, 1200, 1920, 'background');
  game.add.tileSprite(0, 1720, 1200, 200, 'floor');
  game.world.setBounds(0, 0, 1200, 1920);
  clouds.create(this.game);
  dinodude.create(this.game);
  player.create(this.game);
};

game.update = function () {
  clouds.update(this.game);
  dinodude.update(this.game);
  player.update(this.game);
};

module.exports = game;
