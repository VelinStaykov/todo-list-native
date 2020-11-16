import React from 'react'
import { useDispatch } from 'react-redux'
import { TODOTOGGLED, TODOREMOVED, TODOEDIT } from '../Core/Store/actions';
import TodoEditModal from './Modal/todoEditModal';
import {Button, Text, CheckBox, CardItem, Right, Left, Body, View} from 'native-base'

const Todo = (props) => {
    const completedStyle = {
        color: "grey",
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid'
    }
    
    const { id, text, completed } = props.todo
    const dispatch = useDispatch();

    const handleToggle = () => {
        dispatch( { type: TODOTOGGLED, payload: props.todo })
    }

    const handleRemove = () => {
        dispatch( {type: TODOREMOVED, payload: id })
    }

    const changeText = (text) => {
        const newText = text

        dispatch (
           {type: TODOEDIT, payload: {id, text: newText}}
        )
    }
    return (
        <CardItem>
        <Left>
            <CheckBox
                checked={completed}
                onPress={handleToggle}
            />
            </Left>
            <Body>
                <Text>
                    {text}
                </Text>
            </Body>
            <TodoEditModal text={text} changeText={changeText} />
            <Button danger onPress={handleRemove} style={{margin: 10}}>
                <Text>Remove</Text>
            </Button>
        </CardItem>
    )
}

export default Todo;