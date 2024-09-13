import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Header from "./Components/Header";
// import { useState } from "react";
import Input from "./Components/Input";

export default function App() {
  const appName = "My app!";
  const shouldAutoFocus = true;
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header name={appName}></Header>
      <Input autoFocus={shouldAutoFocus}/> // Pass autoFocus as props to Input
      
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


