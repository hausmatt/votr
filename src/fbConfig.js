import * as firebase from 'firebase';

export const firebaseConfig = {
    apiKey: 'AIzaSyA4-WjLkeheCzFN8XuP350Gpr0IhNCnojg',
    authDomain: 'ze-votr.firebaseapp.com',
    databaseURL: 'https://ze-votr.firebaseio.com',
    projectId: 'ze-votr',
    storageBucket: 'ze-votr.appspot.com',
    messagingSenderId: '117346976017'
};

export function initFirebase() {
    const firestore = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
}
