import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from "./Components/Header";
import { useState } from "react";

export default function App() {
  const appName = "My awesome app";
  const [text, setText] = useState("");
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName}>
      <TextInput 
        placeholder="Enter your name"
        autoCorrect={true}
        keyboardType ="default" 
        style={{ borderBottomColor: "purple", borderBottomWidth: 2 }}
        value={text}
        onChangeText={changeText => setText(changeText)}
      />
      <Text>{text}</Text>
      </Header>
    </View>
  );
}


