import * as actionTypes from './actions';
import Repo from '../service/repo';

export default {
    state: {
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
            }, {
                id: 125,
                title: 'Another',
                description: 'Another description',
                ratings: [1, 2, 2],
                comments: [{
                    id: 51544,
                    text: 'This is so awesome!',
                    timestamp: Date.now()
                }]
            }, {
                id: 126,
                title: 'Another',
                description: 'Another description',
                ratings: [5, 4, 4],
                comments: [{
                    id: 51545,
                    text: 'This is so awesome!',
                    timestamp: Date.now()
                }]
            }, {
                id: 127,
                title: 'Another',
                description: 'Another description',
                ratings: [5, 4, 2],
                comments: [{
                    id: 51546,
                    text: 'This is so awesome!',
                    timestamp: Date.now()
                }]
            }, {
                id: 124,
                title: 'Second Item',
                description: 'This is also an item! Yay! Loop Loop!',
                ratings: [3, 5, 4, 3, 2, 5, 5],
                comments: [{
                    id: 102,
                    text: 'comment1',
                    timestamp: Date.now()
                }, {
                    id: 103,
                    text: 'comment2',
                    timestamp: Date.now()
                }, {
                    id: 104,
                    text: 'comment3',
                    timestamp: Date.now()
                }]
            }]
        }],
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
            }
        }
    },
    mutations: {
        [actionTypes.ADD_VOTING](state) {
            state.apiCalls.addVoting.loading = true;
        },
        [actionTypes.VOTING_ADDED](state,) {
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
        async [actionTypes.ADD_VOTING]({commit, state, rootState}, voting) {
            commit(actionTypes.ADD_VOTING);
            try {
                await Repo.addVoting(rootState.auth.user.uid, voting);
                commit(actionTypes.VOTING_ADDED, voting);
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
        async [actionTypes.REMOVE_VOTING]({commit, state, rootState}, votingId) {
            commit(actionTypes.REMOVE_VOTING);
            try {
                await Repo.removeVoting(rootState.auth.user.uid, votingId);
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
        adminVotings: (state, getters, rootState) => rootState.login.auth.user.votings,
        votingById: (state, getters, rootState) => (votingUid) => {
            let voting = rootState.login.auth.user.votings.find(v => v.uid === votingUid);
            return voting ? voting.items : [];
        }
    }
};
