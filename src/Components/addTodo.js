import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { TODOADD } from '../Core/Store/actions';
import {Input, Button, Text, Form, Item, View, Label} from 'native-base'

import { LogBox, TextInput } from 'react-native';

function AddTodo() {

    const [todoName, setTodoName] = useState("");
    const [error, setErrorVisibility] = useState(false)

    const dispatch = useDispatch();
    
    const sendTodoName = () => {
        console.log(todoName);
        if (todoName === "") {
            setErrorVisibility(true)
            return;
        }
        
        dispatch( { type: TODOADD, payload: todoName });
        
        setTodoName('')
        setErrorVisibility(false)
    }

    return (
            <View>
                <Form>
                    <Item fixedLabel>
                        <Label style={{textAlign: "center"}}>Add Todo</Label>
                    </Item>
                    <Item>
                        <Input 
                            value={todoName}
                            placeholder="Add a new todo"
                            onChangeText={(text) => setTodoName(text)}
                        />
                    </Item>
                </Form>
                <Button block primary onPress={() => sendTodoName()}>
                    <Text>Add</Text>
                </Button>
                {error && (
                    <Text style={{color: "red"}}>Трябва да добавите име.</Text>
                )}
            </View>   
    )
}

export default AddTodo;