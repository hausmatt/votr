import * as firebase from 'firebase';

export default {
    async loginWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider);
    },

    async logout() {
        return firebase.auth().signOut();
    },

    async getCurrentUser() {
        return firebase.auth().currentUser;
    }
};
