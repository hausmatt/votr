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
    [actionTypes.LOGIN_SUCCESSFUL] (state, payload) {
      state.auth.loggedIn = true
      state.auth.user = {...payload.user}
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
        .then((login) => {
          console.log(login)
          return commit({
            type: actionTypes.LOGIN_SUCCESSFUL,
            user: {
              uid: login.user.uid,
              displayName: login.user.displayName,
              email: login.user.email,
              photoUrl: login.user.photoUrl
            }
          })
        })
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
    },
    userDisplayName: (state) => () => {
      if (state.auth.user) {
        return state.auth.user.displayName
      } else {
        return undefined
      }
    }
  }
})
