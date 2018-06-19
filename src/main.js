import Vue from 'vue';
import App from './App.vue';
import router from './core/router';
import store from './store/store';
import './registerServiceWorker';
import './core/material';
import './registerServiceWorker'
import firebase from 'firebase/app'
import {firebaseConfig} from './fbConfig'
import './core/material'

Vue.config.productionTip = false;

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
