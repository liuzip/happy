// 每当用户建立的了连接，就会新增一个user身份，所有逻辑和通信的操作，都是经过User/Game这两层来进行的

const addCommand = require('./utils/addCommand')
const roomApi = require('./logic/room/install') // 用户房间相关api
const gameApi = require('./logic/game/install') // 房间内game相关api

const User = function (con) {
  this.con = con
  this.id = null
  this.alias = ''
  this.room = null // 用户所处的游戏房间
}

User.prototype.responseInvalidCMD = function (cmd) {
  this.msgSend({
    cmd,
    success: false
  })
}

User.prototype.runCommand = function (parsedCMD, parsedPayload, root) {
  if (parsedCMD[0] !== 'query' || parsedCMD[0] !== 'ack') {
    this.responseInvalidCMD(parsedCMD.join('.'))
    return
  }

  let key = null
  let target = this
  for (let i = 0; i < parsedCMD.length; i++) {
    key = parsedCMD[i]

    if (target && target.hasOwnProperty(key)) {
      target = target[key]
    } else {
      this.responseInvalidCMD(parsedCMD.join('.'))
      return
    }
  }

  if (target && typeof (target) === 'function') {
    this.msgSend(target(parsedPayload, root))
  } else {
    this.responseInvalidCMD(parsedCMD.join('.'))
  }
}

User.prototype.handler = function ({ cmd, payload, root }) {
  let parsedCMD = null
  let parsedPayload = null

  if (typeof (cmd) !== 'string') {
    this.responseInvalidCMD(cmd)
    return
  }

  parsedCMD = cmd.split('.')

  if (parsedCMD.length < 2) {
    this.responseInvalidCMD(cmd)
    return
  }

  try {
    parsedPayload = JSON.parse(payload)
  } catch (e) {
    console.log(e)
    this.responseInvalidCMD(cmd)
    return
  }

  this.runCommand(parsedCMD, parsedPayload, root)
}

User.prototype.msgSend = function (msg) {
  if (msg) {
    this.con.send(JSON.stringify(msg))
  }
}

const userApi = {
  'user.id.query' (user) {
    user.msgSend({
      cmd: 'query.user.id',
      type: 'request'
    })
  },
  'user.id.ack' (payload, user) {
    user.id = payload.id
    user.alias = payload.alias
  }
}

const api = Object.assign({}, roomApi, gameApi, userApi) // 合并需要注册的api

/**
 * 注册相关api
**/
for (let cmd in api) {
  addCommand.apply(
    User.prototype,
    [
      cmd,
      api[cmd]
    ]
  )
}

module.exports = User
