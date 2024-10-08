import React from 'react';
import { Text, View, StyleSheet, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PressableButton from './PressableButton';
import { Ionicons } from '@expo/vector-icons'; 

const GoalItem = ({ goal, onDelete}) => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate("Details", { goalData: goal })}>
    <View style={styles.goalItem}>
      <Text style={styles.text}>{goal.text}</Text>

      {/* Reusable PressableButton for delete */}
      <PressableButton 
        onPress={() => onDelete(goal.id)} 
        buttonStyle={styles.buttonStyle} 
        pressedStyle={styles.pressedStyle}>
        <Ionicons name="trash" size={22} color="black" />

      </PressableButton>
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