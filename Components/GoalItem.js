import React from 'react';
import { Text, View, StyleSheet, Pressable, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PressableButton from './PressableButton';
import { Ionicons } from '@expo/vector-icons'; 

const GoalItem = ({ goal, onDelete, separators}) => {
  const navigation = useNavigation();

  // Function to handle long press for deletion
  const handleLongPress = () => {
    Alert.alert(
      "Delete Goal",
      "Are you sure you want to delete this goal?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => onDelete(goal.id),  // Proceed with deleting the goal
        },
      ]
    );
  };

  return (
    <Pressable 
    onPressIn={() => separators.highlight()}  // Highlight the separator when pressed
    onPressOut={() => separators.unhighlight()}  // Unhighlight the separator when released
    onPress={() => navigation.navigate("Details", { goalData: goal })}
    onLongPress={handleLongPress}  // Handle long press to delete 
    android_ripple={{ color: 'purple', borderless: true, radius: 100 }} 
    style={({ pressed }) => [
      pressed && styles.pressedStyle, // Apply this style when pressed
    ]}>

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