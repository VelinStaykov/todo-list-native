import reduxSagaFirebase from '../Config/firebaseConfig';
import firestore from '@react-native-firebase/firestore';
import * as actions from '../Store/actions'
import { all, call, put, takeEvery, takeLatest,take } from 'redux-saga/effects';
import TodosReducer from '../Store/todosReducer';

const update = todos => (
    {
        type:actions.GOTTODOS,
        payload: todos
    }
)

async function getTodos() {
    let todos = [];
    const querySnapshot = await firestore().collection('todos').get();
    querySnapshot.forEach(todo => {
        const { text, completed } = todo.data()
    
        const item = {
            id: todo.id,
            text: text,
            completed: completed
        } 
       todos.push(item);
    })
    return todos;
}

function* setTodos(){

    const todos = yield getTodos();

    yield put(update(todos))
}

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
        takeEvery(actions.GETTODOS, setTodos),
        takeLatest(actions.TODOADD, addTodo),
        takeLatest(actions.TODOREMOVED, removeTodo),
        takeLatest(actions.TODOTOGGLED, toggleTodo),
        takeLatest(actions.TODOEDIT, editTodo)
    ])
}