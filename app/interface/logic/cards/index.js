// http://www.xqbase.com/other/mahjongg_english.htm 麻将术语翻译

const Card = function (type, num) {
  this.type = type // bamboo -> 条， pin -> 饼， wind -> 风， dragon -> 中、发、白
  this.num = num
  this.player = null // 隶属于那个玩家
  this.shown = false // 是否已经被翻出来
  this.konged = 0 // 0 -> 未被杠， 1 -> 被明杠， 2-> 被暗杠
  this.ponged = false // 是否被碰了
}

Card.prototype.cleanState = function () {
  this.player = null
  this.shown = false
}

Card.prototype.assignPlayer = function (player) {
  this.player = player
  this.shown = true
}

const Cards = function () {
  this.list = []
  this.dealIndex = 0
  this.kongIndex = 0
}

Cards.prototype.init = function () {
  for (let i = 1; i <= 10; i++) {
    for (let j = 0; j < 4; j++) {
      this.list.push(new Card('bamboo', i.toString())) // 条一色
      this.list.push(new Card('pin', i.toString())) // 饼一色
    }
  }

  for (let j = 0; j < 4; j++) {
    this.list.push(new Card('wind', 'east')) // 东风
    this.list.push(new Card('wind', 'north')) // 北风
    this.list.push(new Card('wind', 'south')) // 南风
    this.list.push(new Card('wind', 'west')) // 西风

    this.list.push(new Card('dragon', 'chun')) // 红中
    this.list.push(new Card('dragon', 'green')) // 发财
    this.list.push(new Card('dragon', 'haku')) // 白板
  }
}

// 洗牌
Cards.prototype.shuffle = function () {
  let list = [...this.list]
  this.list = []
  while (list.length > 0) {
    let i = Math.floor(Math.random() * list.length)
    let card = this.list.splice(i, 1)
    card.cleanState()
    this.list.push(card)
  }

  this.dealIndex = 0
  this.kongIndex = this.list.length - 1
}

// 发牌
Cards.prototype.dealCard = function () {
  let card = this.list[this.dealIndex]
  this.dealIndex++

  return card
}

// 杠牌
Cards.prototype.kongCard = function () {
  let card = this.list[this.kongIndex]
  this.kongIndex--

  return card
}

Cards.prototype.export = function () {
  let leftCards = this.list.filter(c => {
    return c.shown === false
  })

  let cardsInPool = this.list.filter(c => {
    return c.shown === true && c.player === null
  })

  let kongedCards = this.list.filter(c => {
    return c.konged !== 0 && c.player !== null
  })

  let pongedCards = this.list.filter(c => {
    return c.ponged !== 0 && c.player !== null
  })

  return {
    cardsInPool, // 翻出来并被打出的牌
    kongedCards, // 被杠出来的牌，包括明杠和暗杠
    pongedCards, // 被碰了的牌
    leftCards: leftCards.length // 剩余多少张牌没有被翻出
  }
}

module.export = Cards
