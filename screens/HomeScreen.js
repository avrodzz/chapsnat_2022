import React, { useState, useEffect } from "react";
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import db from "../firebase";

export default function HomeScreen({ navigation }) {
  const [chatList, setChatList] = useState([]);

//   useEffect(() => {
//     let chatsRef = db.collection("Chats");
//     chatsRef.get().then((querySnapshot) => {
//       let newChatList = [];
//       querySnapshot.forEach((doc) => {
//         let newChat = { ...doc.data() };
//         newChat.id = doc.id;
//         newChatList.push(newChat);
//         console.log(newChatList);
//       });
//       setChatList(newChatList);
//     });
//   }, []);

useEffect(() => {
    async function getChat() {
        console.log("starting get!")
        const chatsCol = collection(db, 'Chats');
        const chatsDoc = await getDocs(chatsCol);
        const chatData = chatsDoc.docs.map(doc => doc.data());
        console.log("here chatData", chatData);
        setMessages(messages);
    }

  return (
    <View style={styles.container}>
      <FlatList
        data={chatList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Chat")}
          >
            <Text style={styles.item}>{item.id}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});