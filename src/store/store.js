import Vue from 'vue'
import Vuex from 'vuex'
import * as actionTypes from './actions'
import Auth from '../service/auth'

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
    [actionTypes.LOGIN_SUCCESSFUL] (state) {
      state.auth.loggedIn = true
    },
    [actionTypes.LOGIN_FAILURE] (state) {
      state.auth.loggedIn = false
    },
    [actionTypes.LOGOUT] (state) {
      state.auth.loggedIn = false
    }
  },
  actions: {
    [actionTypes.LOGIN_WITH_GOOGLE] ({commit}) {
      Auth.loginWithGoogle()
        .then(() => commit(actionTypes.LOGIN_SUCCESSFUL))
        .catch(() => commit(actionTypes.LOGIN_FAILURE))
    },
    [actionTypes.LOGOUT] ({commit}) {
      Auth.logout()
        .then(() => commit(actionTypes.LOGOUT))
        .catch(() => commit(actionTypes.LOGOUT))
    }
  },
  getters: {
    isUserLoggedIn: (state) => () => {
      return state.auth.loggedIn
    }
  }
})
