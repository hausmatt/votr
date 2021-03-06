import * as actionTypes from './actions';
import voting from '../service/voting';

export default {
    state: {
        votingItems: [],
        votings: [],
        currentVotingId: '',
        apiCalls: {
            loadVotings: {
                loading: true,
                success: false
            },
            addVoting: {
                loading: false,
                error: undefined,
                success: false
            },
            addVotingItem: {
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
        [actionTypes.VOTINGS_LOADED](state, votings) {
            state.apiCalls.loadVotings.loading = false;
            state.apiCalls.loadVotings.success = true;
            state.votings = votings;
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
        [actionTypes.ADD_VOTING_ITEM](state) {
            state.apiCalls.addVotingItem.loading = true;
        },
        [actionTypes.VOTING_ITEM_ADDED](state) {
            state.apiCalls.addVotingItem.loading = false;
            state.apiCalls.addVotingItem.success = true;
        },
        [actionTypes.VOTING_ITEM_ADDED_ERROR](state, payload) {
            state.apiCalls.addVotingItem.error = payload.error;
            state.apiCalls.addVotingItem.loading = false;
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
        [actionTypes.VOTING_ITEMS_LOADED](state, payload) {
            state.votingItems = payload.votingItems;
        }
    },
    actions: {
        async [actionTypes.LOAD_VOTINGS]({commit, state, rootState}) {
            commit(actionTypes.LOAD_VOTINGS);
            voting.getVotingsByUser(rootState.login.auth.user.uid)
                .subscribe(next => {
                    commit(actionTypes.VOTINGS_LOADED, next);
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
                    });
                });
        },
        async [actionTypes.ADD_VOTING_ITEM]({commit}, payload) {
            try {
                await voting.createVotingItem(payload.votingId, payload.item);
                commit(actionTypes.VOTING_ITEM_ADDED);
            } catch (error) {
                console.error('ADD_VOTING_ITEM failed', error);
                commit({
                    type: actionTypes.VOTING_ITEM_ADDED_ERROR,
                    error: {
                        message: 'add voting item failed: ' + error
                    }
                });
            }
        },
        async [actionTypes.REMOVE_VOTING_ITEM]({commit}, payload) {
            await voting.removeVotingItem(payload.votingId, payload.itemId);
        },
        async [actionTypes.ADD_RATING]({commit}, payload) {
            console.log(payload);

            /*
            itemId : "LhRL77Q9JOrALpDdgPcd"
            rating : 3
            votingId : "Lif5t7L4Mt5ID3SxjD7H"
             */

            await voting.addRating(payload.votingId, payload.itemId, payload.rating);
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
