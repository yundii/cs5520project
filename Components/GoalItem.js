import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

const GoalItem = ({ goal, onDelete }) => {
  return (
    <View style= {styles.goalItem}> 
      <Text style= {styles.text}>{goal.text}</Text>
      <Button
        title="X"
        onPress={() => onDelete(goal.id)}  // Send the goal's id back to the parent when pressed
        color="grey"  // Example of the 'color' prop on Button
      />
    </View>
  );
};

const styles = StyleSheet.create({
    goalItem: {
      padding: 10,
      marginVertical: 5,
      backgroundColor: "#ccc",
      borderColor: "#000",
      borderWidth: 1,
      width: "90%",
      alignItems: "center",
      flexDirection: "row",
    },
    text: {
        color: "purple",
        // backgroundColor: "#aaa",
        padding: 5,
        fontSize: 20,
        borderRadius: 5,
      },
  });
export default GoalItem;