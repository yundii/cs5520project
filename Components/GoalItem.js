import React from 'react';
import { Text, View, StyleSheet, Button, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PressableButton from './PressableButton';

const GoalItem = ({ goal, onDelete}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.goalItem}>
      <Text style={styles.text}>{goal.text}</Text>

      {/* Reusable PressableButton for delete */}
      <PressableButton 
        onPress={() => onDelete(goal.id)} 
        buttonStyle={styles.buttonStyle} 
        pressedStyle={styles.pressedStyle}>
        <Text style={styles.buttonText}>X</Text>
      </PressableButton>

      {/* Reusable PressableButton for navigating to Details */}
      <PressableButton 
        onPress={() => navigation.navigate("Details", { goalData: goal })} 
        buttonStyle={styles.buttonStyle} 
        pressedStyle={styles.pressedStyle}>
        <Text style={styles.buttonText}>Details</Text>
      </PressableButton>
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
      width: "95%",
      alignSelf: "center",
      flexDirection: "row",
    },
    text: {
      color: "purple",
      padding: 10,
      fontSize: 20,
      borderRadius: 5,
      },
    buttonText: {
      color: 'purple',
      fontSize: 16,
    },
    buttonStyle: {
      padding: 10,
      backgroundColor: '#bbb',
      borderRadius: 4,
      marginVertical: 5,
    },
    pressedStyle: {
      opacity: 0.2,
      backgroundColor: "#ccc",
    },
  });
export default GoalItem;