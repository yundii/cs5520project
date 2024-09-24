import { StatusBar } from "expo-status-bar";
import { StyleSheet, View , Text, Button, SafeAreaView, ScrollView, FlatList} from "react-native";
import Header from "./Components/Header";
import Input from "./Components/Input";
import GoalItem from "./Components/GoalItem";
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

  const handleDeleteGoal = (goalId) => {
    setGoals((currentGoals) =>
      currentGoals.filter((goal) => goal.id !== goalId)  // Remove the goal with matching id
    );
  };
  // Function to render each item in FlatList
  // const renderGoalItem = ({ item }) => (
  //   <View style={styles.goalItem}>
  //     <Text style={styles.text}>{item.text}</Text>
  //   </View>
  // );
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.topView}>
      <Header name={appName}></Header>
      <Button title="Add a goal" onPress={() => setModalVisible(true)} />
      <Input autoFocus={shouldAutoFocus} inputHandler = {handleInputData} ModalVisible = {modalVisible} handleCancel={handleCancel}/> 
    </View>

    <View style={styles.bottomView}>
    <FlatList
        data={goals} // Pass the array of goals
        renderItem={({ item }) => <GoalItem goal={item} onDelete={handleDeleteGoal}/>}  // Passing the goal object to GoalItem
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContainer} // Style the FlatList container
        ListEmptyComponent={() => (
          <Text style={styles.bottomText}>No goals to show</Text> // Display when no data
        )}
      />
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
  topView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomView: {
    flex: 4,
    backgroundColor: "#dcd",
    width : "100%",
    alignItems: "center",
  },
  scrollViewContainer: {
    alignItems: "center",  
    justifyContent: "flex-start", 
    width: "100%",
    paddingVertical: 10,
  },
  flatListContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  bottomText: {
    color: "darkmagenta",
    fontSize: 25,
    // borderColor: "darkmagenta",
    // borderWidth: 2,
    padding: 5,
    marginBottom: 10,
  },
});


