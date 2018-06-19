import * as firebase from 'firebase';
import {Subject} from "rxjs";

const USER = 'user';
const VOTING = 'voting';
const USER_VOTINGS = 'votings';

export default class Repo {
    db = firebase.firestore();

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


    addVoting(userId, voting) {
        return new Promise((resolve, reject) => {
            this.db.collection(VOTING).add(voting)
                .then(docRef => {
                    let id = docRef.id;
                    this.db.collection(USER).doc(userId).collection(USER_VOTINGS).add(id)
                        .then(() => resolve(id))
                        .catch(err => reject(err));
                })
                .catch(err => reject(err));
        });
    }

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