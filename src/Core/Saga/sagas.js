import reduxSagaFirebase from '../Config/firebaseConfig';
import firestore from '@react-native-firebase/firestore';
import * as actions from '../Store/actions'
import { all, takeLatest } from 'redux-saga/effects';

function* addTodo(action) {
    yield firestore().collection('todos').add({
        text: action.payload,
        completed: false
    })
}

function* toggleTodo(action) {
    yield firestore().collection('todos').doc(`${action.payload.id}`).update({
      completed: !action.payload.completed
    })
}

function* editTodo(action) {
    console.log(action);
    yield firestore().collection('todos').doc(`${action.payload.id}`).update({
        text: action.payload.text
    })
}

function* removeTodo(action){
    yield firestore().collection('todos').doc(`${action.payload}`).delete();
}

export default function* rootSaga() {
    yield all([
        takeLatest(actions.TODOADD, addTodo),
        takeLatest(actions.TODOREMOVED, removeTodo),
        takeLatest(actions.TODOTOGGLED, toggleTodo),
        takeLatest(actions.TODOEDIT, editTodo)
    ])
}