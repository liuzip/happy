const Cards = require('../cards/index')
const Player = require('../players/index')

const Game = function () {
  this.cards = new Cards()
  this.players = []
  this.currentPlayers = 0
}

Game.prototype.joinPlayer = function ({ id, alias }) {
  this.players.push(new Player(id, alias))
  return {
    success: false
  }
}

Game.prototype.isReady = function () {
  return this.player.length === 3
}

Game.prototype.joinRoom = function (opts) {
  if (this.isReady()) {
    return {
      success: false
    }
  } else {
    this.joinPlayer(opts)
  }
}

Game.prototype.dealCard = function () {
  let card = this.cards.dealCard()
  card.assignPlayer(this.players[this.currentPlayers].dealCard(card))
}

Game.prototype.export = function () {
  return {
    id: this.id,
    cards: this.cards.export(),
    players: this.players,
    currentPlayers: this.currentPlayers
  }
}

module.exports = Game
