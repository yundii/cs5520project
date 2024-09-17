import { StatusBar } from "expo-status-bar";
import { StyleSheet, View , Text} from "react-native";
import Header from "./Components/Header";
import Input from "./Components/Input";
import React, { useState } from "react";

export default function App() {
  const [receivedData, setReceivedData] = useState("");
  const appName = "My app!";
  const shouldAutoFocus = true;
  function handleInputData(data) {
    console.log("App.js", data);
    setReceivedData(data);
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName}></Header>
      <Input autoFocus={shouldAutoFocus} inputHandler = {handleInputData} />
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


