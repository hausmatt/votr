import * as actionTypes from './actions';
import Repo from '../service/repo';
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
            Repo.loadVotings(rootState.auth.user.uid)
                .subscribe(next => {
                    commit(actionTypes.VOTINGS_LOADED, next)
                });
        },
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
        async [actionTypes.LOAD_VOTINGS]({commit, state}) {
            voting.getVotingsByUser(state.auth.user.uid)
                .subscribe(n => commit({
                    type: actionTypes.VOTINGS_LOADED,
                    votings: n
                }));
        }
    },
    getters: {
        adminVotings: (state, getters, rootState) => rootState.login.auth.user.votings,
        votingById: (state, getters, rootState) => (votingUid) => {
            let voting = rootState.login.auth.user.votings.find(v => v.uid === votingUid);
            return voting ? voting.items : [];
        },
        votingItems: (state) => () => {
            return state.votingItems;
        },
        votings: (state) => () => {
            return state.votings;
        }
    }
};

