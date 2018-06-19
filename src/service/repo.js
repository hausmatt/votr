import * as firebase from 'firebase';
import {Subject} from "rxjs";

const USER = 'user';
const VOTING = 'voting';
const USER_VOTINGS = 'votings';

export default class Repo {
    db = firebase.firestore();

    /**
     * @param userId
     * @returns {Promise<any>}
     */
    getCreatedVotingIdsByUser(userId) {
        return new Promise(((resolve, reject) => {
            this.db.collection(USER).doc(userId).onSnapshot(function (doc) {
                let data = doc.data();
                resolve(data.votings);
            }, function (err) {
                reject(err);
            })
        }));
    }

    /**
     * @param userId
     * @param voting
     * @returns {Promise<string>}
     */
    async addVoting(userId, voting) {
        let docRef = await this.db.collection(VOTING).add(voting);
        let id = docRef.id;

        await this.db.collection(USER).doc(userId).collection(USER_VOTINGS).add(id);
        return id;
    }

    /**
     * @param votingId
     * @returns {Subject<any>}
     */
    getVotingById(votingId) {
        let subject = new Subject();
        this.db.collection(VOTING).doc(votingId).onSnapshot(function (doc) {
            let id = doc.id;
            let data = doc.data();
            subject.next({...data, id});
        });
        return subject;
    }
}