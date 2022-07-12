import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'

export default function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello Alexis!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Bot #1',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 3,
        text: 'How are you doing today?',
        createdAt: new Date(2022, 7, 12, 11, 45, 0),
        user: {
          _id: 4,
          name: 'Bot #1',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
        name: "Alexis Rodriguez",
        // Make sure the link is not broken!
        avatar: "https://dogtime.com/assets/uploads/2016/09/rottweiler-puppy-1-e1553630142158-1280x720.jpg",
      }}
      placeholder={"Type Thee Message!"}
      showUserAvatar={true}
      alwaysShowSend={true}
      renderUsernameOnMessage={true}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
