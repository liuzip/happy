// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import ui from './components/ui/index'
import Main from './main/index'
import router from './router'

Vue.use(VueRouter)

Vue.prototype.$withLoading = ui.withLoading
Vue.prototype.$popup = ui.showPopup

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { Main },
  template: '<Main/>'
})
