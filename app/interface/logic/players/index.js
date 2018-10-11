// 当用户加入游戏后，会额外新增出来一个player的身份
const Player = function (id, alias) {
  this.id = id
  this.alias = alias
  this.cards = []
}

Player.prototype.dealCard = function (card) {
  this.cards.push(card)
  return this
}

module.export = Player
