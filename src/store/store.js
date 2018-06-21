import Vue from 'vue';
import Vuex from 'vuex';
import loginStore from "./loginStore";
import votingStore from "./votingStore";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    getters: {},
    modules: {
        login: loginStore,
        voting: votingStore
    }
});
