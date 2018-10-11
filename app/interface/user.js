// 每当用户建立的了连接，就会新增一个user身份，所有逻辑和通信的操作，都是经过User/Game这两层来进行的

const addCommand = require('./utils/addCommand')

const User = function (con) {
  this.con = con
  this.id = null
  this.alias = ''
  this._this = this
}

User.prototype.responseInvalidCMD = function (cmd) {
  this.msgSend({
    cmd,
    success: false
  })
}

User.prototype.runCommand = function (parsedCMD, payload, root) {
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
    target(payload, root)
  } else {
    this.responseInvalidCMD(parsedCMD.join('.'))
  }
}

User.prototype.handler = function ({ cmd, payload, root }) {
  let parsedCMD = null

  if (typeof (cmd) !== 'string') {
    this.responseInvalidCMD(cmd)
    return
  }

  parsedCMD = cmd.split('.')

  if (parsedCMD.length < 2) {
    this.responseInvalidCMD(cmd)
    return
  }

  this.runCommand(parsedCMD, payload, root)
}

User.prototype.msgSend = function (msg) {
  this.con.send(JSON.stringify(msg))
}

addCommand.apply(
  User.prototype,
  [
    'user.id.query',
    function (root) {
      root.msgSend({
        cmd: 'query.user.id',
        type: 'request'
      })
    }
  ]
)

addCommand.apply(
  User.prototype,
  [
    'user.id.ack',
    function (payload, root) {
      root.id = payload.id
      root.alias = payload.alias
    }
  ]
)

module.exports = User
