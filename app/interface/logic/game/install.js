module.exports = {
  'game.new.query' (_payload, user) {
    let room = user.room
    room.newGame()
    return {
      cmd: 'game.new.ack',
      success: true
    }
  }
}
