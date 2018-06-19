import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './action-types'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      loggedIn: false,
      user: undefined
    },
    voting: {
      id: undefined,
      items: []
    }
  },
  mutations: {
    [types.LOGIN_SUCCESSFUL] (state) {
      state.auth.loggedIn = true
    },
    [types.LOGOUT] (state) {
      state.auth.loggedIn = false
    }
  },
  actions: {
    [types.LOGIN_WITH_GOOGLE] ({commit}) {

    },
    [types.LOGOUT] () {

    }
  },
  getters: {
    // to be used as store.getters.isUserLoggedIn()
    isUserLoggedIn: (state) => () => {
      return state.auth.loggedIn
    }
  }
})
