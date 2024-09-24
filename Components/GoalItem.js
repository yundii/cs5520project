import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const GoalItem = ({ goal }) => {
  return (
    <View style= {styles.goalItem}> 
      <Text style= {styles.text}>{goal.text}</Text>
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