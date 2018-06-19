import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/HomePage.vue';
import AdminPage from '../views/admin/AdminPage';
import Auth from '../service/auth';
import VotingsPage from '@/views/admin/votings/VotingsPage';
import VotingItemsPage from '@/views/admin/voting-items/VotingItemsPage';

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
                    component: VotingsPage
                },
                {
                    path: ':votingId/voting-items',
                    component: VotingItemsPage
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
