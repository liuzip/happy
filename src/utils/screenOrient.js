let d = document
let root = d.documentElement

const screenOrient = function (forceVertical = false) {
  let width = root.clientWidth
  let height = root.clientHeight
  let style = ''
  if (width >= height || forceVertical) { // 横屏
    style += 'width:' + width + 'px;' // 注意旋转后的宽高切换
    style += 'height:' + height + 'px;'
    style += '-webkit-transform: rotate(0); transform: rotate(0);'
    style += '-webkit-transform-origin: 0 0;'
    style += 'transform-origin: 0 0;'
  } else { // 竖屏
    style += 'width:' + height + 'px;'
    style += 'height:' + width + 'px;'
    style += '-webkit-transform: rotate(90deg); transform: rotate(90deg);'
    // 注意旋转中点的处理
    style += '-webkit-transform-origin: ' + width / 2 + 'px ' + width / 2 + 'px;'
    style += 'transform-origin: ' + width / 2 + 'px ' + width / 2 + 'px;'
  }
  root.style.cssText = style

  let x = width / 18.75 // 3.75
  root.style.fontSize = x + 'px'
}

window.detectOrient = screenOrient

module.exports = screenOrient
