import Vue from 'vue';
import Vuex from 'vuex';
import * as actionTypes from './actions';
import loginStore from "./loginStore";
import votingStore from "./votingStore";
import Repo from "../service/repo";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        apiCalls: {
            adminUser: {
                loading: false,
                error: undefined,
                success: false
            }
        }
    },
    mutations: {
        [actionTypes.LOAD_ADMIN_USER](state) {
            state.apiCalls.adminUser.loading = true;
        },
        [actionTypes.ADMIN_USER_LOADED](state, payload) {
            state.auth.user = {...payload.user};
            state.apiCalls.adminUser.loading = false;
            state.apiCalls.adminUser.success = true;
        }
    },
    actions: {
        async [actionTypes.LOAD_ADMIN_USER]({commit, state}) {
            commit({type: actionTypes.LOAD_ADMIN_USER});
            Repo.loadUser(state.login.auth.user.uid)
                .subscribe(next => commit(actionTypes.ADMIN_USER_LOADED, next));
        },
    },
    getters: {},
    modules: {
        login: loginStore,
        voting: votingStore
    }
});
