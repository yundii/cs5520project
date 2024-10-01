import { StatusBar } from "expo-status-bar";
import { StyleSheet, View , Text, Button, SafeAreaView, FlatList, Alert} from "react-native";
import Header from "./Header";
import Input from "./Input";
import GoalItem from "./GoalItem";
import React, { useState } from "react";

export default function App({navigation, route}) {
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const appName = "My app!";
  const shouldAutoFocus = true;

  function handleGoalPress(pressedGoal) {    
    // nagivate to the GoalDetails screen
    navigation.navigate("Details", {goalData: pressedGoal});
  }
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
  
  const handleDeleteAll = () => {
    Alert.alert(
      "Delete All Goals",
      "Are you sure you want to delete all goals?",
      [
        {
          text: "Yes",
          onPress: () => setGoals([]),  // Clear all goals
        },
        { text: "No", style: "cancel" },
      ]
    );
  };

  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.topView}>
      <Header name={appName}></Header>
      <Button title="Add a goal" onPress={() => setModalVisible(true)} />
    </View>
    <Input autoFocus={shouldAutoFocus} inputHandler = {handleInputData} ModalVisible = {modalVisible} handleCancel={handleCancel}/> 

    <View style={styles.bottomView}>
    <FlatList
        data={goals} 
        renderItem={({ item }) => <GoalItem goal={item} onDelete={handleDeleteGoal} pressHandler={handleGoalPress}/>}  // Passing the goal object to GoalItem
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.scrollViewContainer}
        ListEmptyComponent={() => (
          <Text style={styles.header}>No goals to show</Text> // Display when no data
        )}
        ListHeaderComponent={() =>
          goals.length > 0 ? <Text style={styles.header}>My Goal List</Text> : null
        }
        // Conditionally render the footer with "Delete All" button if there are goals
        ListFooterComponent={() =>
          goals.length > 0 && (
            <View >
              <Button title="Delete All" onPress={handleDeleteAll}/>
            </View>
          )
        }
        // Add separator between items
        ItemSeparatorComponent={() => <View style={styles.separator} />} 
        
        
      />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
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
    //alignItems: "center",
    justifyContent: "flex-start", 
    width: "100%",
    paddingVertical: 10,  
  },
  separator: {
    height: 4, 
    width: "90%", 
    backgroundColor: "grey", 
    alignSelf: "center", 
    marginVertical: 10,
  },
  header: {
    color: "darkmagenta",
    fontSize: 25,
    marginTop: 10,
    alignSelf: "center",
  },
});

