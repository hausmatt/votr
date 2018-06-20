import Vue from 'vue';
import Vuex from 'vuex';
import * as actionTypes from './actions';
import Auth from '../service/auth';
import Repo from '../service/repo';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        auth: {
            loggedIn: false,
            user: {
                uid: undefined,
                votings: []
            }
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
            }]
        }
    },
    mutations: {
        [actionTypes.LOGIN_SUCCESSFUL](state, payload) {
            state.auth.loggedIn = true;
            state.auth.user = {...payload.user};
        },
        [actionTypes.LOGIN_FAILURE](state) {
            state.auth.loggedIn = false;
            state.auth.user = {};
        },
        [actionTypes.LOGOUT](state) {
            state.auth.loggedIn = false;
            state.auth.user = {};
        },
        [actionTypes.ADMIN_USER_LOADED](state, payload) {
            state.auth.user = {...payload.user};
        },
    },
    actions: {
        async [actionTypes.LOGIN_WITH_GOOGLE]({dispatch, commit}) {
            try {
                let login = await Auth.loginWithGoogle();

                let user = {
                    uid: login.user.uid,
                    displayName: login.user.displayName || '',
                    email: login.user.email || '',
                    photoUrl: login.user.photoURL || '',
                };

                await Repo.updateUser(user);

                return commit({
                    type: actionTypes.LOGIN_SUCCESSFUL,
                    user: user
                });
            } catch (err) {
                return commit({
                    type: actionTypes.LOGIN_FAILURE,
                    err
                })
            }
        },
        async [actionTypes.LOGOUT]({commit}) {
            try {
                await Auth.logout();
                return commit(actionTypes.LOGOUT);
            } catch (err) {
                return commit(actionTypes.LOGOUT);
            }
        },
        async [actionTypes.LOAD_ADMIN_USER]({commit, state}) {
            let fullUser = await Repo.loadUser(state.auth.user.uid);
            commit({
                type: actionTypes.ADMIN_USER_LOADED,
                user: fullUser
            });
        },
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
        },
        adminVotings: (state) => () => {
            return state.auth.user.votings;
        },
        votingById: (state) => (votingUid) => {
            let voting = state.auth.user.votings.find(v => v.uid === votingUid);
            return voting ? voting.items : [];
        }
    }
});
