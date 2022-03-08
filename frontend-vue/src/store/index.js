import Vue from 'vue'
import Vuex from 'vuex'
import { calendar } from './calendar.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { calendar },
  state: {
    config: {},
  },
  getters: {
    config (state) {
      return state.config
    },
  },
  mutations: {
    SET_CONFIG: (state, data) => {
      state.config = data
    },
  },
  actions: {
    setConfig: ({ commit, state }, value) => {
      Vue.$log.debug(value)
      commit('SET_CONFIG', value)
      return state.config
    },
  },
})
