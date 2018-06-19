import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/HomePage.vue';
import VotingPage from '../views/VotingPage';
import AdminPage from '../views/admin/AdminPage';
import Auth from '../service/auth';

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/voting',
      name: 'Voting',
      component: VotingPage
    },
    {
      path: '/admin',
      name: 'Admin',
      component: AdminPage,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  let currentUser = Auth.getCurrentUser();
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('');
  } else {
    next();
  }
});

export default router;
