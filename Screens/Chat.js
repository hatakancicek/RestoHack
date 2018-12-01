import React, { Component } from 'react'
import { 
  TouchableOpacity, 
  StyleSheet, 
  View,
  KeyboardAvoidingView,
  Text,
  FlatList,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import firebase from 'firebase';
import Input from '../Components/Input';

export default class Chat extends Component {
  state = {
    message: "",
  }

  setMessage = message => message[message.length -1] === "\n"
    ? this.setState({ message: "" })
    : this.setState({ message, });

  send = _ => {
    const { message } = this.state;
    this.setState({
      message: "",
    });

    firebase.firestore().collection('messages')
    .doc().set({
      text: message,
      sender: firebase.auth().currentUser.uid,
      date: Date.now(),
    });
  };

  setMessages = messages => {
    const arr = [];
    messages.forEach(message => arr.push({
      ...message.data(),
      id: message.id,
    }));

    this.setState({
      messages: arr
        .filter(message => 
          message.text.trim().length)
        .sort((a, b,) => b.date - a.date),
    });
  }

  componentDidMount() {
    const { setMessagesListener } = this;
    setMessagesListener();
  }

  setMessagesListener = _ => {
    const { setMessages } = this;
    const listener = firebase.firestore()
      .collection('messages').onSnapshot(setMessages);
    
    this.setState({
      listener,
    });
  };

  componentWillUnmount() {
    this.state.listener();
  };

  render() {
    const { message, messages } = this.state;
    const { setMessage, send } = this;
    const { uid } = firebase.auth().currentUser;

    return (
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.root} >
        <View style={styles.messages} >
          {
            !!messages &&
            <FlatList 
              data={messages}
              style={{
                alignSelf: 'stretch',
                flex: 1,
              }}
              inverted
              keyExtractor={({id}) => id}
              renderItem={({ item: { sender, text } }) => 
                <Text 
                  style={
                    sender === uid
                      ? styles.rightBubble
                      : styles.leftBubble} 
                >
                    {text}
                  </Text>
              } 
          />
          }
        </View>
        <View style={styles.send} >
          <Input 
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={240}
            placeholder="Mesajınızı yazın!" 
            style={styles.input}
            onSubmitEditing={send}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={send}
          >
            <MaterialCommunityIcons 
              name="send"
              color="white"
              size={scale(16)}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignSelf: 'stretch',
  },
  messages: {
    flex: 1,
    alignSelf: 'stretch',
  },
  send: {
    alignSelf: 'stretch',
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E1F5FE',
  },
  input: {
    flex: 1,
  },
  button: {
    backgroundColor: '#43A047',
    padding: 8,
    borderRadius: 100,
  },
  leftBubble: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: 250,
    flexWrap: 'wrap',
    marginVertical: 5,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#F44336',
    marginLeft: 5,
  },
  rightBubble: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: 250,
    flexWrap: 'wrap',
    marginVertical: 5,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#039BE5',
    marginRight: 5,
    alignSelf: 'flex-end',
  }
});
