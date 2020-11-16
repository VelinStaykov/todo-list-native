import firebase from 'firebase/app'
import 'firebase/firestore'
import ReduxSagaFirebase from 'redux-saga-firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDM4ZqTIIZ_eMzm3FIFDZ_rmY8Uxjz9G5g",
    authDomain: "to-do-list-67397.firebaseapp.com",
    databaseURL: "https://to-do-list-67397.firebaseio.com",
    projectId: "to-do-list-67397",
    storageBucket: "to-do-list-67397.appspot.com",
    messagingSenderId: "225902048387",
    appId: "1:225902048387:android:f352ed77b73a758ce0d7b6",
    name: 'todo-list-native'
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore();
const reduxSagaFirebase = new ReduxSagaFirebase(firebaseApp)

export default reduxSagaFirebase;