module.exports = {
  'game.new.query' (_payload, user) {
    let room = user.room
    if (room.game) {
      room.game.stop() // 关闭上个游戏，销毁相应资源
    }
    room.newGame()
    room.game.start() // 开启新的游戏逻辑
    room.game.currentDealer++ // 轮流坐庄
    return {
      cmd: 'game.new.ack',
      success: true
    }
  }
}
