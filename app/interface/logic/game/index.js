const Cards = require('../cards/index')
const Player = require('../players/index')

const Game = function () {
  this.cards = new Cards()
  this.players = []
  this.currentPlayers = 0
  this.currentDealer = 0 // 庄家
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

Game.prototype.dealCard = function (playerIndex) {
  let card = this.cards.dealCard()
  card.assignPlayer(this.players[playerIndex].dealCard(card))
}

Game.prototype.export = function () {
  return {
    id: this.id,
    cards: this.cards.export(),
    players: this.players,
    currentPlayers: this.currentPlayers
  }
}

Game.prototype.stop = function () {
  // to do
}

Game.prototype.start = function () {
  this.cards.shuffle() // 重新洗牌
  for (let i = 0; i < 13; i++) {
    this.dealCard(0)
    this.dealCard(1)
    this.dealCard(2)
  }

  this.dealCard(this.currentDealer)
  this.currentPlayers = this.currentDealer
}

module.exports = Game
