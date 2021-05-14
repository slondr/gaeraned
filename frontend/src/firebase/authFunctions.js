import firebase from "firebase/app";

async function createUserWithEmailAndPassword(email, password) {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
}

async function signIn(email, password) {
  await firebase.auth().signInWithEmailAndPassword(email, password);
}

async function signOut() {
  await firebase.auth().signOut();
}

export { createUserWithEmailAndPassword, signIn, signOut };