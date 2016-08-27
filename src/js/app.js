var properties = require('./properties')
var main = require('./game/game')

var game = new Phaser.Game(properties.size.x, properties.size.y, Phaser.AUTO, 'game')

game.state.add('mainGame', main)
game.state.start('mainGame')
