import React, { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useSelector, useDispatch } from 'react-redux'
import { GOTTODOS } from '../Core/Store/actions';
import { selectFilteredTodos } from '../Core/Store/todosReducer'
import Todo from './todo'
import { Card, Content} from 'native-base'

const TodoList = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const subscriber = firestore()
    .collection('todos')
    .onSnapshot((querySnapshot) => {
      let todos = [];

      querySnapshot.forEach((document) => {
        const { text, completed } = document.data();

        const todo = {
          id: document.id,
          text: text,
          completed: completed,
        };

      todos.push(todo);
      })
      
      dispatch( { type: GOTTODOS, payload: todos})
    })
    return () => subscriber();
  }, [])
  
  const filteredTodos = useSelector(selectFilteredTodos)

  const renderedListItems = filteredTodos.map(todo => 
      <Todo key={todo.id} todo={todo} />
  )

  return (
    <Content>
          <Card>{renderedListItems}</Card>
    </Content>
  )
}

export default TodoList