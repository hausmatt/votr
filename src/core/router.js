import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/HomePage.vue';
import AdminPage from '../views/admin/AdminPage';
import Auth from '../service/auth';
import Votings from '@/views/admin/votings/VotingsPage';
import VotingItems from '@/views/admin/VotingItems';

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/admin',
            name: 'Admin',
            component: AdminPage,
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: 'votings',
                    component: Votings
                },
                {
                    path: ':votingId/voting-items',
                    component: VotingItems
                }
            ]
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
