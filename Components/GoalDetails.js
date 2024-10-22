import React, { useState, useLayoutEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import PressableButton from './PressableButton';
import GoalUsers from './GoalUsers';
import { Ionicons } from '@expo/vector-icons'; 
import { updateWarningStatus } from "../Firebase/firestoreHelper";

const GoalDetails = ({ navigation, route }) => {
    const [isWarning, setIsWarning] = useState(false);

    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <PressableButton onPress={handleWarningPress} buttonStyle={styles.buttonStyle} pressedStyle={styles.pressedStyle}>
            <Ionicons name="warning" size={40} color="red" />
          </PressableButton>
        ),
      });
    }, [navigation, isWarning]);
  
    const handleWarningPress = () => {
      if (route.params?.goalData?.id) {
        setIsWarning(true);
        updateWarningStatus(route.params.goalData.id, "goals", true);  // Update Firestore
        navigation.setOptions({ title: "Warning!" });
      }
    };

  return (
    <View style={styles.container}>
        {route.params ? <Text style={{ color: isWarning ? "red" : "black" }}>This is the details of a goal with text "{route.params.goalData.text}" and id "{route.params.goalData.id}"
        </Text>
         : <Text style={{ color: isWarning ? "red" : "black" }}>More Details</Text>}

      
        <Button title="More Details" onPress={() => navigation.push("Details")}/>
        <GoalUsers id={route.params.goalData.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    padding: 1,
    //backgroundColor: '#bbb',
    borderRadius: 4,
    marginVertical: 5,
  },
  pressedStyle: {
    opacity: 0.2,
    backgroundColor: "#ccc",
  },
});

export default GoalDetails;
