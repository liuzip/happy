module.exports = function (cmd, handler) {
  let parsedCMD = cmd.split('.')
  let key = null
  let target = this
  for (let i = 0; i < parsedCMD.length; i++) {
    key = parsedCMD[i]

    if (target && target.hasOwnProperty(key)) {
      target = target[key]
    } else if (i === parsedCMD.length - 1) {
      target[key] = handler
    } else {
      target[key] = {}
      target = target[key]
    }
  }
}
