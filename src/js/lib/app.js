(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var properties = require('./properties')
var main = require('./game/game')

var game = new Phaser.Game(properties.size.x, properties.size.y, Phaser.AUTO, 'game')

game.state.add('mainGame', main)
game.state.start('mainGame')

},{"./game/game":4,"./properties":6}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"./clouds":2,"./dinodude":3,"./player":5}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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
