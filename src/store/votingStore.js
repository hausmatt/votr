import * as actionTypes from './actions';
import voting from '../service/voting';

export default {
    state: {
        votingItems: [],
        votings: [],
        apiCalls: {
            loadVotings: {
                loading: false,
                success: false
            },
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
        [actionTypes.LOAD_VOTINGS](state) {
            state.apiCalls.loadVotings.loading = true;
        },
        [actionTypes.VOTINGS_LOADED](state,) {
            state.apiCalls.loadVotings.loading = false;
            state.apiCalls.loadVotings.success = true;
        },
        [actionTypes.ADD_VOTING](state) {
            state.apiCalls.addVoting.loading = true;
        },
        [actionTypes.VOTING_ADDED](state) {
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
        },
        [actionTypes.VOTINGS_LOADED](state, payload) {
            state.votings = payload.votings;
        },
        [actionTypes.VOTING_ITEMS_LOADED](state, payload) {
            state.votingItems = payload.votingItems;
        }
    },
    actions: {
        async [actionTypes.LOAD_VOTINGS]({commit, state, rootState}) {
            commit(actionTypes.LOAD_VOTINGS);
            voting.getVotingsByUser(rootState.login.auth.user.uid)
                .subscribe(next => {
                    commit(actionTypes.VOTINGS_LOADED, next)
                });
        },
        async [actionTypes.ADD_VOTING]({commit, state, rootState}, v) {
            commit(actionTypes.ADD_VOTING);
            try {
                await voting.createVoting(rootState.login.auth.user.uid, v);
                commit(actionTypes.VOTING_ADDED);
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
                await voting.removeVoting(votingId);
                commit(actionTypes.VOTING_REMOVED);
            } catch (error) {
                console.error('REMOVE_VOTING failed', error);
                commit({
                    type: actionTypes.REMOVE_VOTING_ERROR,
                    error: {
                        message: 'add voting failed'
                    }
                });
            }
        },
        async [actionTypes.LOAD_VOTING_ITEMS]({commit}, votingId) {
            voting.getVotingItems(votingId)
                .subscribe(n => {
                    commit({
                        type: actionTypes.VOTING_ITEMS_LOADED,
                        votingItems: n
                    })
                });
        },
        async [actionTypes.LOAD_VOTINGS]({commit, state, rootState}) {
            voting.getVotingsByUser(rootState.login.auth.user.uid)
                .subscribe(n => commit({
                    type: actionTypes.VOTINGS_LOADED,
                    votings: n
                }));
        }
    },
    getters: {
        votingItems: (state) => {
            return state.votingItems;
        },
        votings: (state) => {
            return state.votings;
        }
    }
};

