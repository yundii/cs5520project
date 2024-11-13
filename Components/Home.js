import { StatusBar } from "expo-status-bar";
import { StyleSheet, View , Text, Button, SafeAreaView, FlatList, Alert, Pressable} from "react-native";
import Header from "./Header";
import Input from "./Input";
import { query, where } from "firebase/firestore";
import GoalItem from "./GoalItem";
import React, { useState, useEffect } from "react";
import PressableButton from './PressableButton';
import {auth, database} from '../Firebase/firebaseSetup';
import { writeToDB, deleteDocFromDB, deleteAll } from "../Firebase/firestoreHelper";
import { onSnapshot, collection } from "firebase/firestore";
import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../Firebase/firebaseSetup";
import { Ionicons } from '@expo/vector-icons';

export default function App({navigation, route}) {
  // console.log(database);
  // writeToDB({name: "John Doe", age: 25}, "users");
  const [goals, setGoals] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const appName = "My app!";
  useEffect(()=> {
    const unsubscribe = onSnapshot(
      query(collection(database, "goals"),where("owner", "==", auth.currentUser.uid)),
     (querySnapshot) => {
      let newArray = [];
      querySnapshot.forEach((docSnapshot) => {
        console.log(docSnapshot.id);
        newArray.push({ ...docSnapshot.data(), id: docSnapshot.id });
    });
    console.log(newArray);
    setGoals(newArray);
  },
  (error) => {
    console.log(error);
    Alert.alert(error.message);
  }
);

  // Cleanup the listener on unmount
  return () => {
    unsubscribe();
  };
}, []);


  const shouldAutoFocus = true;

  async function fetchAndUploadImage(imageUri) {
    try { 
      const response = await fetch(imageUri);
      if (!response.ok) {
        throw new Error("Http error status: " + response.status);
      }
      const blob = await response.blob();
      const imageName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
      const imageRef = ref(storage, `images/${imageName}`)
      const uploadResult = await uploadBytesResumable(imageRef, blob);
      console.log("uploadResult", uploadResult);
      return uploadResult.ref.fullPath;
    } catch (error) {
      console.log("fetch And Upload Image error", error);
    }
  }
  
  async function handleInputData(data) {
    console.log("App.js", data);
    let imageUrl = "";
    // upload image to storage, get the url and store in the goal object
    if (data.imageUri) {
      imageUrl = await fetchAndUploadImage(data.imageUri);
    }
    let newGoal = {
      text: data.text,
      
    };
    newGoal = {...newGoal, owner: auth.currentUser.uid};

    if (imageUrl) {
      newGoal = {...newGoal, imageUrl: imageUrl};
    }
    // make a new obj and store the received data as obj's text property
    // const newGoal = {
    //   text: data.text,
    //   imageUri: data.imageUri,
    // };
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

