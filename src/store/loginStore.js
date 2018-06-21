import * as actionTypes from './actions';
import Auth from '../service/auth';
import Repo from '../service/repo';

export default {
    state: {
        auth: {
            loggedIn: false,
            user: {
                uid: undefined
            }
        }
    },
    mutations: {
        [actionTypes.LOGIN_SUCCESSFUL](state, payload) {
            state.auth.loggedIn = true;
            state.auth.user = {...payload};
        },
        [actionTypes.LOGIN_FAILURE](state) {
            state.auth.loggedIn = false;
            state.auth.user = {};
        },
        [actionTypes.LOGOUT](state) {
            state.auth.loggedIn = false;
            state.auth.user = {};
        }
    },
    actions: {
        async [actionTypes.LOGIN_WITH_GOOGLE]({dispatch, commit}) {
            try {
                let login = await Auth.loginWithGoogle();

                let user = {
                    uid: login.user.uid,
                    displayName: login.user.displayName || '',
                    email: login.user.email || '',
                    photoUrl: login.user.photoURL || '',
                };

                await Repo.updateUser(user);

                return commit(actionTypes.LOGIN_SUCCESSFUL, user, {root: true});
            } catch (err) {
                return commit(actionTypes.LOGIN_FAILURE, err, {root: true});
            }
        },
        async [actionTypes.LOGOUT]({commit}) {
            try {
                await Auth.logout();
                return commit(actionTypes.LOGOUT);
            } catch (err) {
                return commit(actionTypes.LOGOUT);
            }
        }
    },
    getters: {
        isUserLoggedIn: state => state.auth.loggedIn,
        userDisplayName: state => (state.auth.user) ? state.auth.user.displayName : undefined
    }
};
