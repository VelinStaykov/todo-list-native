import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { GETTODOS } from '../Core/Store/actions';
import { selectFilteredTodos } from '../Core/Store/todosReducer'
import Todo from './todo'
import { Card, Content} from 'native-base'

const TodoList = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch( { type: GETTODOS})
  })
  
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