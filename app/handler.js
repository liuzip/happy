const game = require('./logic/require')

const HANDLER_TBL = {
  'newRoom': game.newRoom,
  'joinRoom': game.joinRoom,
  'queryUserId': (user, payload) => {
    user.queryUserIdHandler(payload)
  }
}

const handler = function ({ user, cmd, payload }) {
  let rsp = HANDLER_TBL[cmd](user, payload)
  if (rsp) {
    let single = rsp.single
    delete (rsp.single)
    if (single) {
      user.con.send(JSON.strinfigy(rsp))
    } else {
      let list = game.getUserList(user.roomid)
      for (let p in list) {
        list[p].con.send(JSON.strinfigy(rsp))
      }
    }
  }
}

module.export = handler
