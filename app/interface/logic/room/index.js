const Game = require('../game/index')

const Room = function (id) {
  this.id = id
  this.game = null
}

Room.prototype.newGame = function () {
  this.game = new Game()
}

Room.prototype.export = function () {
  return {
    id: this.id,
    game: this.game ? this.game.export() : null
  }
}

module.exports = Room
