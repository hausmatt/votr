import Vue from 'vue';
import Vuex from 'vuex';
import loginStore from "./loginStore";
import votingStore from "./votingStore";
import * as actionTypes from './actions';
import Auth from '../service/auth';
import Repo from '../service/repo';
import voting from '../service/voting';

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
