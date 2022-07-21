import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { collection, doc, setDoc, updateDoc, onSnapshot, arrayUnion } from "firebase/firestore"; 
import db from "../firebase";
import firebase from "firebase/app";
import { useAuthentication } from '../utils/hooks/useAuthentication';

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const { user, userData } = useAuthentication();

    useEffect(() => {
    let unsubscribeFromNewSnapshots = onSnapshot(doc(db, "Chats", "myfirstchat"), (snapshot) => {
      console.log("New Snapshot! ", snapshot.data().messages);
      setMessages(snapshot.data().messages);
    });
  
    return function cleanupBeforeUnmounting() {
      unsubscribeFromNewSnapshots();
    };
  }, []);

  const onSend = useCallback(async (messages = []) => {
    await updateDoc(doc(db, "Chats", "myfirstchat"), {
      messages: arrayUnion(messages[0])
    });
    //setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, []);

  console.log('user in ChatScreen.js: ', user);
  console.log('userData in ChatScreen.js: ', userData);

  // Check if user and userData is undefined
  // - if it is then do nothing
  // - else give GiftedChat the user.uid, userData.username, and userData.avatar values that are populated
  //   after the initial undefined check
  // if (user && userData) {
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        // current "blue bubble" user
        _id: user && user.uid,
        name: userData && userData.username,
        avatar: userData && userData.avatar
      }}
      inverted={false}
      showUserAvatar={true}
      renderUsernameOnMessage={true} 
    />
  )
}