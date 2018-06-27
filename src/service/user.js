import * as firebase from 'firebase';

/**
 * @returns {Promise<any>}
 */
async function login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
}

/**
 * @returns {Promise<any>}
 */
async function logout() {
    return firebase.auth().signOut();
}

export default {
    login,
    logout,
}