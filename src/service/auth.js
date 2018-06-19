import * as firebase from 'firebase'

export default class Auth {
  static loginWithGoogle () {
    const provider = new firebase.auth.GoogleAuthProvider()
    return firebase.auth().signInWithPopup(provider)
  }

  static logout () {
    return firebase.auth().signOut()
  }
}
