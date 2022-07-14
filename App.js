import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { GiftedChat } from 'react-native-gifted-chat'
import db from "./firebase";
import { collection, getDocs, setDoc, updateDoc, doc, arrayUnion, onSnapshot } from 'firebase/firestore';

export default function App() {
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   async function getChat() {
  //     console.log("starting get!")
  //     const chatsCol = collection(db, 'Chats');
  //     const chatsDoc = await getDocs(chatsCol);
  //     const chatData = chatsDoc.docs.map(doc => doc.data());
  //     console.log("here chatData", chatData);
  //     setMessages(messages);
  //   }

  //   getChat();
  // }, []);

  // useEffect(() => {
  //   onSnapshot(doc(db, "Chats", "myfirstchat"), (snapshot) => {
  //     console.log("New Snapshot! ", snapshot.data().messages);
  //     setMessages(snapshot.data().messages);
  //   });
  // }, []);

  useEffect(() => {
    let unsubscribeFromNewSnapshots = onSnapshot(doc(db, "Chats", "myfirstchat"), (snapshot) => {
      console.log("New Snapshot! ", snapshot.data().messages);
      setMessages(snapshot.data().messages);
    });
  
    return function cleanupBeforeUnmounting() {
      unsubscribeFromNewSnapshots();
    };
  }, []);

  // const onSend = useCallback((messages = []) => {
  //   setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  // }, [])

  const onSend = useCallback(async (messages = []) => {
    await updateDoc(doc(db, "Chats", "myfirstchat"), {
      messages: arrayUnion(messages[0])
    });
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
}, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      // user={{
      //   _id: 1,
      //   name: "Alexis Rodriguez",
      //   // Make sure the link is not broken!
      //   avatar: "https://dogtime.com/assets/uploads/2016/09/rottweiler-puppy-1-e1553630142158-1280x720.jpg",
      // }}
      user={{
        // current "blue bubble" user
        _id: "1",
        name: "Ashwin",
        avatar: "https://placeimg.com/140/140/any",
      }}
      inverted={true}
      // placeholder={"Type Thee Message!"}
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
