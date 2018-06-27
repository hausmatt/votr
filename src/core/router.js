import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/home/HomePage.vue';
import AdminPage from '../views/admin/AdminPage';
import ScoreboardPage from '../views/scoreboard/ScoreboardPage';
import VotingPage from '../views/voting/VotingPage';
import VotingsPage from '../views/admin/votings/VotingsPage';
import VotingItemsPage from '../views/admin/voting-items/VotingItemsPage';

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/scoreboard/:votingId',
            name: 'Scoreboard',
            component: ScoreboardPage
        },
        {
            path: '/voting/:votingId',
            name: 'Voting',
            component: VotingPage
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

export default router;
