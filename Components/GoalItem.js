import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

const GoalItem = ({ goal, onDelete, pressHandler }) => {
  function handlePress() {
    // pass the goal obj back to the Home.js
    pressHandler(goal);
  }

  return (
    <View style= {styles.goalItem}> 
      <Text style= {styles.text}>{goal.text}</Text>
      <Button
        title="X"
        onPress={() => onDelete(goal.id)}  // Send the goal's id back to the parent when pressed
        color="grey"  // Example of the 'color' prop on Button
      />
      <Button title="<Detail>" color = "grey" onPress={() => handlePress()}/>

    </View>
  );
};

const styles = StyleSheet.create({
    goalItem: {
      padding: 10,
      marginVertical: 5,
      backgroundColor: "#bbb",
      borderColor: "#000",
      borderWidth: 1,
      width: "90%",
      alignSelf: "center",
      flexDirection: "row",
    },
    text: {
      color: "purple",
      padding: 5,
      fontSize: 20,
      borderRadius: 5,
      },
  });
export default GoalItem;