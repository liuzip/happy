const Cards = require('./cards')
const Player = require('./player')

const Room = function (id) {
  this.id = id
  this.cards = new Cards()
  this.players = []
  this.currentPlayers = 0
}

Room.prototype.joinPlayer = function ({ id, alias }) {
  this.players.push(new Player(id, alias))
  return {
    success: false
  }
}

Room.prototype.isReady = function () {
  return this.player.length === 3
}

Room.prototype.joinRoom = function (opts) {
  if (this.isReady()) {
    return {
      success: false
    }
  } else {
    this.joinPlayer(opts)
  }
}

Room.prototype.dealCard = function () {
  let card = this.cards.dealCard()
  card.assignPlayer(this.players.dealCard(card))
}

module.export = Room
