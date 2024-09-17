import { StatusBar } from "expo-status-bar";
import { StyleSheet, View , Text, Button} from "react-native";
import Header from "./Components/Header";
import Input from "./Components/Input";
import React, { useState } from "react";

export default function App() {
  const [receivedData, setReceivedData] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const appName = "My app!";
  const shouldAutoFocus = true;
  function handleInputData(data) {
    console.log("App.js", data);
    setReceivedData(data);
    setModalVisible(false);
  }
  
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName}></Header>
      <Button title="Add a goal" onPress={() => setModalVisible(true)} />
      <Input autoFocus={shouldAutoFocus} inputHandler = {handleInputData} modalVisible = {setModalVisible}/>
      <Text>Received data: {receivedData}</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});


