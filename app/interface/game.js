const Room = require('./room')

const roomList = {}
const roomIdGenerator = function (phoneid) {
  return phoneid + (new Date()).getTime()
}

const newRoom = function (user, payload) {
  let phoneid = payload.phoneid
  let id = roomIdGenerator(phoneid)
  let room = new Room(id)
  roomList[id] = room

  joinRoom(user, {
    roomid: room.id
  })

  return room
}

const joinRoom = function (user, payload) {
  let roomid = payload.roomid
  roomList[roomid].joinPlayer(user)

  return JSON.stringify({ success: true })
}

module.export = {
  newRoom,
  joinRoom
}
