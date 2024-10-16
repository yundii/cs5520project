import { StatusBar } from "expo-status-bar";
import { StyleSheet, View , Text, Button, SafeAreaView, FlatList, Alert} from "react-native";
import Header from "./Header";
import Input from "./Input";
import GoalItem from "./GoalItem";
import React, { useState, useEffect } from "react";
import PressableButton from './PressableButton';
import {database} from '../Firebase/firebaseSetup';
import { writeToDB, deleteDocFromDB, deleteAll } from "../Firebase/firestoreHelper";
import { onSnapshot, collection } from "firebase/firestore";

export default function App({navigation, route}) {
  // console.log(database);
  // writeToDB({name: "John Doe", age: 25}, "users");
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const appName = "My app!";
  //fetch the updated list of goals from the database
  // Update the code in the onSnapshot function in useEffect 
  // to detach the listener when we no longer need to listen to the changes in data.
  useEffect(()=> {
    const unsubscribe = onSnapshot(collection(database, "goals"), (querySnapshot) => {
      let newArray = [];
      querySnapshot.forEach((docSnapshot) => {
        console.log(docSnapshot.id);
        newArray.push({ ...docSnapshot.data(), id: docSnapshot.id });
    });
    console.log(newArray);
    setGoals(newArray);
  });

  // Cleanup the listener on unmount
  return () => {
    unsubscribe();
  };
}, []);



  const shouldAutoFocus = true;

  function handleInputData(data) {
    console.log("App.js", data);
    // make a new obj and store the received data as obj's text property
    const newGoal = { text: data};
    writeToDB(newGoal, "goals");

    // Add the new goal to the goals array using the spread operator
    // setGoals((currentGoals) => [...currentGoals, newGoal]);
    setModalVisible(false);
  }

  function handleCancel() {
     setModalVisible(false);
  }

  const handleDeleteGoal = (goalId) => {
    // setGoals((currentGoals) =>
    //   currentGoals.filter((goal) => goal.id !== goalId)  // Remove the goal with matching id
    // );
    deleteDocFromDB(goalId, "goals");
  };
  
  const handleDeleteAll = () => {
    Alert.alert(
      "Delete All Goals",
      "Are you sure you want to delete all goals?",
      [
        {
          text: "Yes",
          onPress: () => deleteAll("goals"),  // Proceed with deleting all goals
        },
        { text: "No", style: "cancel" },
      ]
    );

  };

  const renderItem = ({ item, separators }) => (
    <GoalItem goal={item} onDelete={handleDeleteGoal} separators={separators} />
  );

  const renderSeparator = ({ highlighted }) => (
    <View
      style={[
        styles.separator,
        highlighted ? { backgroundColor: 'purple' } : { backgroundColor: 'grey' }
      ]}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.topView}>
      <Header name={appName}></Header>
      <PressableButton onPress={() => setModalVisible(true)} buttonStyle={styles.buttonStyle} pressedStyle={styles.pressedStyle}>
        <Text style={styles.text}>Add New Goal</Text>
      </PressableButton>
    </View>
    <Input autoFocus={shouldAutoFocus} inputHandler = {handleInputData} ModalVisible = {modalVisible} handleCancel={handleCancel}/> 

    <View style={styles.bottomView}>
    <FlatList
        data={goals} 
        renderItem={renderItem} 
        // keyExtractor={(item) => item.id.toString()}
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
        ItemSeparatorComponent={renderSeparator} 
        
        
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
  buttonStyle: {
    padding: 10,
    borderRadius: 4,
    marginVertical: 5,
    backgroundColor: "purple",
  },
  pressedStyle: {
    opacity: 0.2,
    backgroundColor: "#ccc",
  },
  text: {
    color: "white",
    padding: 2,
    fontSize: 20,
    borderRadius: 5,
  },
});

