import * as firebase from 'firebase';
import uuidv4 from 'uuid/v4';
import * as Rx from "rxjs";

const USER = 'user';
const VOTING = 'voting';
const USER_VOTINGS = 'votings';

let db;

export default {

    init() {
        db = firebase.firestore();
    },

    async loadVotings(userId) {
        let votingSubject = new Rx.Subject();
        db.collection(USER_VOTINGS).doc(userId).onSnapshot(function (doc) {
            if (doc.exists) {
                votingSubject.next(doc.data());
            }
        });
        return votingSubject;
    },

    async addVoting(userId, voting) {
        let existingVotings = await this.getExistingVotings(userId);
        existingVotings.push({...voting, uid: uuidv4()});
        return db.collection(USER).doc(userId).set({votings: existingVotings}, {merge: true});
    },

    async removeVoting(userId, votingId) {
        let existingVotings = await this.getExistingVotings(userId);
        return db.collection(USER).doc(userId).set({votings: existingVotings.filter(voting => voting.uid !== votingId)}, {merge: true});
    },

    /**
     * @param userUid
     * @param votingUid
     * @param item
     * @returns {Promise<void>}
     */
    async addVotingItem(userUid, votingUid, item) {
        let existingVotings = await this.getExistingVotings(userUid);
        let voting = existingVotings.find(v => v.uid === votingUid);
        if (voting) {
            voting.items.push({...item, uid: uuidv4()});
        }

        return db.collection(USER).doc(userUid).set({votings: existingVotings}, {merge: true});
    },

    /**
     * @param userId
     * @returns {Promise<Array>}
     */
    async getExistingVotings(userId) {
        let existingUserDocSnapshot = await db.collection(USER).doc(userId).get();
        return existingUserDocSnapshot.exists ? existingUserDocSnapshot.data().votings : [];
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
     * @returns {Subject<any>}
     */
    loadUser(userUid) {
        let userSubject = new Rx.Subject();
        db.collection(USER).doc(userUid).onSnapshot(function (doc) {
            if (doc.exists) {
                userSubject.next(doc.data());
            }
        });
        return userSubject;
    },

}