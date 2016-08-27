(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var properties = require('./properties')
var main = require('./game/game')

var game = new Phaser.Game(properties.size.x, properties.size.y, Phaser.AUTO, 'game')

game.state.add('mainGame', main)
game.state.start('mainGame')

},{"./game/game":2,"./properties":4}],2:[function(require,module,exports){
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

},{"./player":3}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
module.exports =
  { title: 'Ludum Dare 36',
    mute: false,
    size:
    {
      x: 800,
      y: 600
    }
  }

},{}]},{},[1]);
