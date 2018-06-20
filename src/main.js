import Vue from 'vue';
import App from './App.vue';
import router from './core/router';
import store from './store/store';
import './registerServiceWorker';
import './core/material';
import firebase from 'firebase/app';
import {firebaseConfig} from './fbConfig';
import repo from "./service/repo";

Vue.config.productionTip = false;

firebase.initializeApp(firebaseConfig);

let app;

if (!app) {
  app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  repo.init();

  app.$mount('#app');
}
