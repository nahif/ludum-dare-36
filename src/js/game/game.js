var game = {};

// Classes
var player = require('./player');

game.preload = function () {
  game.load.image('background', 'images/fondo.png')
  player.preload(this.game);
};

game.create = function () {
  game.add.tileSprite(0, 0, 1200, 1920, 'background');
  game.world.setBounds(0, 0, 1200, 1920);
  player.create(this.game);
};

game.update = function () {
  player.update(this.game);
};

module.exports = game;
