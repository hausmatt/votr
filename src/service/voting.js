import * as firebase from 'firebase';
import * as Rx from "rxjs";

let db;

function init() {
    db = firebase.firestore();
}

/**
 * @param userId
 * @returns {Subject<any>}
 */
function getVotingsByUser(userId) {
    let votingsSubject = new Rx.Subject();
    db.collection('voting')
        .where(`admins.${userId}`, '==', true)
        .onSnapshot(snapshot => {
            let votings = snapshot.docs
                .map(qds => {
                    return {...qds.data(), id: qds.id};
                });
            votingsSubject.next(votings);
        });
    return votingsSubject;
}

/**
 * @param votingId
 * @returns {Observable<any>}
 */
function getVotingItems(votingId) {
    let votingItemsSubject = new Rx.Subject();
    getVotingById(votingId)
        .subscribe(voting => {
            let itemIds = Object.keys(voting.items);
            let items = itemIds.map(id => getVotingItemById(votingId, id));

            if (items) {
                Rx.combineLatest(items).subscribe(itemsArr => {
                    votingItemsSubject.next(itemsArr);
                })
            }
        });

    return votingItemsSubject;
}

/**
 * @param votingId
 * @param votingItemId
 * @returns {Subject<any>}
 */
function getVotingItemById(votingId, votingItemId) {
    let votingItemSubject = new Rx.Subject();
    db.collection(`voting/${votingId}/items`).doc(votingItemId).onSnapshot(doc => {
        if (doc.exists) {
            let votingItem = {...doc.data(), id: doc.id};
            votingItemSubject.next(votingItem);
        }
    });
    return votingItemSubject;
}

/**
 * @param votingId
 * @returns {Subject<any>}
 */
function getVotingById(votingId) {
    let votingSubject = new Rx.Subject();
    db.collection('voting').doc(votingId).onSnapshot(doc => {
        if (doc.exists) {
            votingSubject.next({...doc.data(), id: doc.id});
        }
    });
    return votingSubject;
}

/**
 * @param userId the creator's user id
 * @param voting
 * @returns {Promise<firebase.firestore.DocumentReference>} the created document reference
 */
async function createVoting(userId, voting) {
    let admins = {};
    admins[userId] = true;

    let items = [];

    return db.collection('voting').add({
        ...voting,
        items,
        admins
    });
}

/**
 * @param votingId
 * @returns {Promise<void>}
 */
async function removeVoting(votingId) {
    return db.collection('voting').doc(votingId).delete();
}

export default {
    init,

    getVotingsByUser,
    getVotingItems,

    createVoting,
    removeVoting,
}