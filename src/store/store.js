import Vue from 'vue';
import Vuex from 'vuex';
import * as actionTypes from './actions';
import Auth from '../service/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: {
      loggedIn: false,
      user: undefined
    },
    voting: {
      id: 1,
      items: [{
        id: 123,
        title: 'First Item',
        description: 'This is an item! Yay! 42!',
        ratings: [5, 4, 4.5],
        comments: [{
          id: 101010,
          text: 'This is so awesome!',
          timestamp: Date.now()
        }]
      },{
        id: 125,
        title: 'Another',
        description: 'Another description',
        ratings: [5, 4, 4.5],
        comments: [{
          id: 51544,
          text: 'This is so awesome!',
          timestamp: Date.now()
        }]
      },{
        id: 126,
        title: 'Another',
        description: 'Another description',
        ratings: [5, 4, 4.5],
        comments: [{
          id: 51545,
          text: 'This is so awesome!',
          timestamp: Date.now()
        }]
      },{
        id: 127,
        title: 'Another',
        description: 'Another description',
        ratings: [5, 4, 4.5],
        comments: [{
          id: 51546,
          text: 'This is so awesome!',
          timestamp: Date.now()
        }]
      },{
        id: 124,
        title: 'Second Item',
        description: 'This is also an item! Yay! Loop Loop!',
        ratings: [3,5,4,3,2,5,4.5],
        comments: [{
          id: 102,
          text: 'comment1',
          timestamp: Date.now()
        },{
          id: 103,
          text: 'comment2',
          timestamp: Date.now()
        },{
          id: 104,
          text: 'comment3',
          timestamp: Date.now()
        }]
      }]
    }
  },
  mutations: {
    [actionTypes.LOGIN_SUCCESSFUL] (state, payload) {
      state.auth.loggedIn = true;
      state.auth.user = {...payload.user};
    },
    [actionTypes.LOGIN_FAILURE] (state) {
      state.auth.loggedIn = false;
    },
    [actionTypes.LOGOUT] (state) {
      state.auth.loggedIn = false;
    }
  },
  actions: {
    [actionTypes.LOGIN_WITH_GOOGLE] ({commit}) {
      Auth.loginWithGoogle()
        .then((login) => {
          return commit({
            type: actionTypes.LOGIN_SUCCESSFUL,
            user: {
              uid: login.user.uid,
              displayName: login.user.displayName,
              email: login.user.email,
              photoUrl: login.user.photoUrl
            }
          });
        })
        .catch(() => commit(actionTypes.LOGIN_FAILURE));
    },
    [actionTypes.LOGOUT] ({commit}) {
      Auth.logout()
        .then(() => commit(actionTypes.LOGOUT))
        .catch(() => commit(actionTypes.LOGOUT));
    }
  },
  getters: {
    isUserLoggedIn: (state) => () => {
      return state.auth.loggedIn;
    },
    userDisplayName: (state) => () => {
      if (state.auth.user) {
        return state.auth.user.displayName;
      } else {
        return undefined;
      }
    }
  }
});
