import { Button, Input, View, Text } from 'native-base';
import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal'

const TodoEditModal = (props) => {
  const [visible, setVisibility] = useState(false);
  const [todoName, setTodoName] = useState(props.text);
  const [error, setErrorVisibility] = useState(false);

  const handleClose = () => setVisibility(false);
  const handleShow = () => {
    setVisibility(true);
    setErrorVisibility(false);
    setTodoName(props.text);
  };

  const editName = () => {
    console.log(todoName);
    if (todoName === '') {
      setErrorVisibility(true);
      return;
    }

    props.changeText(todoName);
    handleClose();
    setErrorVisibility(false);
  };

  return (
    <View>
        <Button onPress={handleShow}>
            <Text>Edit</Text>
        </Button>
        {visible &&
        <Modal 
            animationType="slide"
            presentationStyle="overFullScreen"
            visible={visible}
            transparent={false}
            onBackdropPress={handleClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Input 
                        value={todoName}
                        onChangeText={(text) => setTodoName(text)}
                        placeholder="Type a new name"
                        style={styles.modalText}
                    />
                    <Button block onPress={editName}>
                        <Text>Edit Name</Text>
                    </Button>
                    {error && (
                        <Text>Трябва да добавите име.</Text>
                    )}
                    <Button dark block onPress={handleClose} style={{marginTop: 5}}>
                        <Text>Close</Text>
                    </Button>
                </View>
            </View>
        </Modal>
        }
    </View>
  );
};

const styles = StyleSheet.create({
    centeredView: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      height: 150
    },
    modalText: {
        textAlign: "center"
    }
})
export default TodoEditModal;
