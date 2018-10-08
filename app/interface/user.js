// 每当用户建立的了连接，就会新增一个user身份，所有逻辑和通信的操作，都是经过User/Game这两层来进行的

const User = function (con) {
  this.con = con
  this.id = null
  this.alias = ''
}

User.prtotype.queryUserId = function () {
  this.con.send({
    cmd: 'queryUserId',
    type: 'request'
  })
}

User.prtotype.queryUserIdHandler = function (payload) {
  this.id = payload.id
  this.alias = payload.alias
}

module.export = User
