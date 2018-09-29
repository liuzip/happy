// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ui from './components/ui/index'
import Index from './index'
import router from './router'

Vue.prototype.$withLoading = ui.withLoading
Vue.prototype.$popup = ui.showPopup

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  components: { Index },
  template: '<Index/>'
}).$mount('#app')
