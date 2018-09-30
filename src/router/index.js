import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/main/index'
import Login from '@/pages/login/index'
import Game from '@/pages/game/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    }
  ]
})
