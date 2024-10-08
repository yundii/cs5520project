import React from 'react';
import { Text, View, StyleSheet, Button, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GoalItem = ({ goal, onDelete}) => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate("Details", { goalData: goal })}
    android_ripple={{ color: 'purple', borderless: true, radius: 100 }} >
    <View style= {styles.goalItem}> 
      <Text style= {styles.text}>{goal.text}</Text>
      <Button
        title="X"
        onPress={() => onDelete(goal.id)}  // Send the goal's id back to the parent when pressed
        color="grey"  // Example of the 'color' prop on Button
      />
    </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    goalItem: {
      padding: 10,
      marginVertical: 5,
      backgroundColor: "#bbb",
      borderColor: "#000",
      borderWidth: 1,
      width: "95%",
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