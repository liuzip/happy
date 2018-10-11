const roomList = {} // 所有的房间列表
const Room = require('./index')

module.exports = {
  'room.create.query' (_payload, user) {
    let id = user.id + (new Date()).getTime()
    roomList[id] = new Room(id)
    user.room = roomList[id]
    return {
      cmd: 'room.create.ack',
      success: true,
      payload: {
        roomid: id
      }
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
  },
  'room.currentState.query' (payload) {
    let id = payload.roomid
    if (typeof roomList[id] === 'undefined') {
      return {
        cmd: 'room.currentState.ack',
        success: false
      }
    } else {
      return {
        cmd: 'room.currentState.ack',
        success: true,
        payload: roomList[id].export()
      }
    }
  }
}
