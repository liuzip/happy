import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/main/index'
import Login from '@/login/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'main',
      component: Main
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
