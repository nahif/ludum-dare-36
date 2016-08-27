(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var properties = require('./properties')
var main = require('./game/game')

var game = new Phaser.Game(properties.size.x, properties.size.y, Phaser.AUTO, 'game')

game.state.add('mainGame', main)
game.state.start('mainGame')

},{"./game/game":2,"./properties":3}],2:[function(require,module,exports){
var game = {}

// Classes

game.preload = function () {
}

game.create = function () {
}

game.update = function () {
}

module.exports = game

},{}],3:[function(require,module,exports){
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
