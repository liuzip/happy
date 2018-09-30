import Vue from 'vue'
import Popup from './popup.vue'
import FullLoading from './full-loading.vue'

const root = document.createElement('div')
root.id = 'hlcx-base-ui-cont'

const popup = mount(Popup)
const fullLoading = mount(FullLoading)
document.body.appendChild(root)

function mount (component) {
  const el = root.appendChild(document.createElement('div'))

  return new Vue({
    el: el,
    data: {
      display: 'none',
      props: {}
    },
    render (h) {
      return h('div', {}, [
        this.display !== 'none' ? h(component, {
          props: { ...this.props }
        }) : null
      ])
    }
  })
}

// fullLoading
let fullLoadingTimer = null

function showFullLoading ({ title } = {}) {
  clearTimeout(fullLoadingTimer)
  fullLoading.display = ''
  fullLoadingTimer = setTimeout(() => {
    fullLoading.props = {
      show: true,
      title: title
    }
  }, 20)
}

function hideFullLoading () {
  clearTimeout(fullLoadingTimer)
  fullLoading.props.show = false
  fullLoadingTimer = setTimeout(() => {
    fullLoading.display = 'none'
  }, 300)
}

// popup
let popupTimer = null

function showPopup (props) {
  clearTimeout(popupTimer)

  const show = popup.props.show
  popup.props = {
    ...props,
    show: show,
    callback: res => {
      hidePopup()

      if (res === 'confirm') {
        props.confirm && props.confirm()
      } else if (res === 'cancel') {
        props.cancel && props.cancel()
      } else if (res === 'ignore') {
        props.ignore && props.ignore()
      }
    }
  }

  if (!show) {
    popup.display = ''
    popupTimer = setTimeout(() => {
      popup.props.show = true
    }, 50)
  }
}

function hidePopup () {
  clearTimeout(popupTimer)
  popup.props.show = false
  popupTimer = setTimeout(() => {
    popup.display = 'none'
  }, 300)
}

function withFullLoading (fn, { title } = { title: '' }) {
  return (...args) => {
    showFullLoading({ title })
    return fn(...args).then(r => {
      hideFullLoading()
      return r
    }, e => {
      hideFullLoading()
      throw e
    })
  }
}

export default {
  withFullLoading,
  showPopup,
  hidePopup
}
