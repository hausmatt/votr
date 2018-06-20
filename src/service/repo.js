import * as firebase from 'firebase';

const USER = 'user';
const VOTING = 'voting';
const USER_VOTINGS = 'votings';

let db;

export default {

    init() {
        db = firebase.firestore();
        const firestore = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        firestore.settings(settings);
    },

    /**
     * @param userId
     * @param voting
     * @returns {Promise<string>}
     */
    async addVoting(userId, voting) {
        let existingUserDocSnapshot = await db.collection(USER).doc(userId).get();
        let existingVotings = existingUserDocSnapshot.data().votings;
        existingVotings.push(voting);
        return db.collection(USER).doc(userId).set({votings: existingVotings}, {merge: true});
    },

    /**
     * @param user
     * @returns {Promise<void>}
     */
    async updateUser(user) {
        return db.collection(USER).doc(user.uid).set(user, {merge: true});
    },

    /**
     * @param userUid
     * @returns {Promise<any>}
     */
    async loadUser(userUid) {
        return new Promise(((resolve, reject) => {
            db.collection(USER).doc(userUid).onSnapshot(function (doc) {
                resolve(doc.exists ? doc.data() : null);
            }, function (err) {
                reject(err);
            })
        }));
    },

}