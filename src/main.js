import Vue from 'vue';
import App from './App.vue';
import router from './core/router';
import store from './store/store';
import './registerServiceWorker';
import './core/material';
import firebase from 'firebase/app';
import {firebaseConfig, initFirebase} from './fbConfig';
import repo from './service/repo';
import voting from './service/voting';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

Vue.config.productionTip = false;

firebase.initializeApp(firebaseConfig);

let app;

if (!app) {
    app = new Vue({
        router,
        store,
        render: h => h(App)
    });

    initFirebase();
    repo.init();
    voting.init();

    app.$mount('#app');
}
