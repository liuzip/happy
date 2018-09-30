import Vuex from 'vuex'
import Vue from 'vue'
import localStorage from '@/utils/localStorage'

Vue.use(Vuex)

const state = {
  signed: false, // 是否已经登陆
  config: {
    alias: '',
    phone: ''
  },
  statistics: {
    total: 0,
    win: 0,
    score: 0
  }
}

const mutations = {
  initStore (state) {
    state.config = localStorage.get('config') || {alias: '', phone: ''}
  },
  signIn (state, {alias, phone}) {
    console.log(`alias: |${alias}|, phone |${phone}|`)
    state.signed = true
    if (state.config.phone === '' || state.config.phone !== phone) {
      state.statistics.total = 0
      state.statistics.win = 0
      state.statistics.score = 0
      state.config.phone = phone
    }

    state.config.alias = alias
    localStorage.set('config', {
      alias,
      phone
    })
  }
}

const getters = {
  unsingedWithAlias (state) {
    return !state.signed && state.config.phone.length > 0
  },
  isNewUser (state) {
    return !state.signed && (!state.config || state.config.phone.length === 0)
  }
}

const actions = {}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
