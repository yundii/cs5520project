import { StatusBar } from "expo-status-bar";
import { StyleSheet, View , Text, Button, SafeAreaView, ScrollView, FlatList} from "react-native";
import Header from "./Components/Header";
import Input from "./Components/Input";
import React, { useState } from "react";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const appName = "My app!";
  const shouldAutoFocus = true;

  function handleInputData(data) {
    console.log("App.js", data);
    // make a new obj and store the received data as obj's text property
    const newGoal = { text: data, id: Math.random().toString() };

    // Add the new goal to the goals array using the spread operator
    setGoals((currentGoals) => [...currentGoals, newGoal]);
    setModalVisible(false);
  }

  function handleCancel() {
     setModalVisible(false);
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.topView}>
      <Header name={appName}></Header>
      <Button title="Add a goal" onPress={() => setModalVisible(true)} />
      <Input autoFocus={shouldAutoFocus} inputHandler = {handleInputData} ModalVisible = {modalVisible} handleCancel={handleCancel}/> 
    </View>

    <View style={styles.bottomView}>
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {/* Render each goal using array.map() */}
          {goals.map((goal) => (
            <View key={goal.id} style={styles.goalItem}>
              <Text style={styles.text}>{goal.text}</Text>
            </View>
          ))}
      </ScrollView>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "purple",
    backgroundColor: "#aaa",
    padding: 5,
    fontSize: 20,
    borderRadius: 5,
  },
  textContainer: {
    backgroundColor: "#aaa",
    borderRadius: 5,
  },
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomView: {
    flex: 4,
    backgroundColor: "lightblue",
    width : "100%",
    alignItems: "center",
  },
  scrollViewContainer: {
    alignItems: "center",
    width: "100%",
  },
  goalItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#ccc",
    borderColor: "#000",
    borderWidth: 1,
    width: "90%",
    alignItems: "center",
  },
});


