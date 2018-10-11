const Cards = require('./cards')
const Player = require('./player')

const roomList = {}

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

module.exports = {
  'room.create.query' (_payload, user) {
    let id = user.phoneid + (new Date()).getTime()
    roomList[id] = new Room(id)
    user.room = roomList[id]
    return {
      cmd: 'room.create.ack',
      success: true
    }
  },
  'room.join.query' (payload, user) {
    let id = payload.roomid
    if (typeof roomList[id] === 'undefined') {
      return {
        cmd: 'room.join.ack',
        success: false
      }
    } else {
      user.room = roomList[id]
      user.room.joinRoom(user)
      return {
        cmd: 'room.join.ack',
        success: true
      }
    }
  }
}
