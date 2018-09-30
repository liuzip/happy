const Cards = require('./cards')

const Room = function (id) {
  this.id = id
  this.cards = new Cards()
}

module.export = Room
