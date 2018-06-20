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
                votings: [{
                    id: 1,
                    items: [{
                        id: 123,
                        title: 'First Item',
                        description: 'This is an item! Yay! 42!',
                        ratings: [5, 4, 5],
                        comments: [{
                            id: 101010,
                            text: 'This is so awesome!',
                            timestamp: Date.now()
                        }]
                    },{
                        id: 125,
                        title: 'Another',
                        description: 'Another description',
                        ratings: [1, 2, 2],
                        comments: [{
                            id: 51544,
                            text: 'This is so awesome!',
                            timestamp: Date.now()
                        }]
                    },{
                        id: 126,
                        title: 'Another',
                        description: 'Another description',
                        ratings: [5, 4, 4],
                        comments: [{
                            id: 51545,
                            text: 'This is so awesome!',
                            timestamp: Date.now()
                        }]
                    },{
                        id: 127,
                        title: 'Another',
                        description: 'Another description',
                        ratings: [5, 4, 2],
                        comments: [{
                            id: 51546,
                            text: 'This is so awesome!',
                            timestamp: Date.now()
                        }]
                    },{
                        id: 124,
                        title: 'Second Item',
                        description: 'This is also an item! Yay! Loop Loop!',
                        ratings: [3,5,4,3,2,5,5],
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
                }]
            }
        },
        apiCalls: {
            addVoting: {
                loading: false,
                error: undefined,
                success: false
            },
            removeVoting: {
                loading: false,
                error: undefined,
                success: false
            },
            adminUser: {
                loading: false,
                error: undefined,
                success: false
            }
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
        [actionTypes.LOAD_ADMIN_USER](state) {
            state.apiCalls.adminUser.loading = true;
        },
        [actionTypes.ADMIN_USER_LOADED](state, payload) {
            state.auth.user = {...payload.user};
            state.apiCalls.adminUser.loading = false;
            state.apiCalls.adminUser.success = true;
        },
        [actionTypes.ADD_VOTING](state) {
            state.apiCalls.addVoting.loading = true;
        },
        [actionTypes.VOTING_ADDED](state, payload) {
            state.apiCalls.addVoting.loading = false;
            state.apiCalls.addVoting.success = true;
        },
        [actionTypes.VOTING_ADDED_ERROR](state, payload) {
            state.apiCalls.addVoting.error = payload.error;
            state.apiCalls.addVoting.loading = false;
        },
        [actionTypes.REMOVE_VOTING](state) {
            state.apiCalls.removeVoting.loading = false;
        },
        [actionTypes.VOTING_REMOVED](state) {
            state.apiCalls.removeVoting.loading = false;
            state.apiCalls.removeVoting.success = true;
        },
        [actionTypes.REMOVE_VOTING_ERROR](state, payload) {
            state.apiCalls.removeVoting.error = payload.error;
            state.apiCalls.removeVoting.loading = false;
        }
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
            commit({type: actionTypes.LOAD_ADMIN_USER});
            Repo.loadUser(state.auth.user.uid)
                .subscribe(next => {
                    commit({
                        type: actionTypes.ADMIN_USER_LOADED,
                        user: next
                    })
                });
        },
        async [actionTypes.ADD_VOTING]({commit, state}, voting) {
            commit(actionTypes.ADD_VOTING);
            try {
                await Repo.addVoting(state.auth.user.uid, voting);
                commit({
                    type: actionTypes.VOTING_ADDED,
                    voting: voting
                });
            } catch (error) {
                console.error('ADD_VOTING failed', error);
                commit({
                    type: actionTypes.VOTING_ADDED_ERROR,
                    error: {
                        message: 'add voting failed'
                    }
                });
            }
        },
        async [actionTypes.REMOVE_VOTING]({commit, state}, votingId) {
            commit(actionTypes.REMOVE_VOTING);
            try {
                await Repo.removeVoting(state.auth.user.uid, votingId);
                commit({type: actionTypes.VOTING_REMOVED});
            } catch (error) {
                console.error('REMOVE_VOTING failed', error);
                commit({
                    type: actionTypes.REMOVE_VOTING_ERROR,
                    error: {
                        message: 'add voting failed'
                    }
                });
            }
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
