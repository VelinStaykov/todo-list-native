import React from 'react'
import Reducer from './src/Core/Store/reducer';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './src/Core/Saga/sagas';
import { Container, Header, Text } from 'native-base';
import AddTodo from './src/Components/addTodo';
import TodoList from './src/Components/todoList';
import TodoFilters from './src/Components/todoFilters';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  Reducer,
  compose(
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(rootSaga);

const App = () => {
  return (
    <Provider store={store}>
      <Container>
        <Header>
          <Text style={{color: "white", fontSize: 30}}>Todo App</Text>
        </Header> 

        <AddTodo />
        <TodoList />
        <TodoFilters />
      
      </Container>
    </Provider>
  );
};

export default App;
