const roomList = {}
const Room = require('./index')

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
