import firebase from "firebase";
import 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyANHHk0vSwYq446QpRpLVcWU6neA43B0vc",
  authDomain: "reminisce-86dd6.firebaseapp.com",
  projectId: "reminisce-86dd6",
  storageBucket: "reminisce-86dd6.appspot.com",
  messagingSenderId: "628800787666",
  appId: "1:628800787666:web:74fb3c88dc1135f946090b",
  measurementId: "G-2CVYTG3SBE"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
// const googleProvider = new firebase.auth.GoogleAuthProvider();
// const facebookProvider = new firebase.auth.FacebookAuthProvider();
const storage = firebase.storage();

export { auth, db, storage}
export default firebase;