import  firebase  from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDc2sBF1cLAD719tsjO26Xlu8kxIVwGK84",
  authDomain: "tutorial-1bfbb.firebaseapp.com",
  databaseURL: "https://tutorial-1bfbb-default-rtdb.firebaseio.com",
  projectId: "tutorial-1bfbb",
  storageBucket: "tutorial-1bfbb.appspot.com",
  messagingSenderId: "1089878903447",
  appId: "1:1089878903447:web:903672a6029b1e8fdfb7d2",
  measurementId: "G-N0GXKK4PCQ"
};

if (!firebase.apps.length) {
  var firebaseApp =  firebase.initializeApp(firebaseConfig)
}
// const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
window.firebase = firebaseApp
const auth = firebase.auth();
var storage = firebase.storage();
export { db, auth, storage };