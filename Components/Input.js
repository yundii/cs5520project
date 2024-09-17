import {Alert, Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

export default function Input({ autoFocus, inputHandler, ModalVisible, handleCancel }) {
  const [text, setText] = useState("");
  const [hasBlurred, setHasBlurred] = useState(false);

  const handleBlur = () => {
    setHasBlurred(true);  // Set the blur state when input loses focus
  };

  
  const handleConfirm = () => {
    inputHandler(text);
    setText("");
  };

  
  const handleCancelPress = () => {
    Alert.alert(
      'Cancel Confirmation',
      'Are you sure you want to cancel?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => {
          setText(""); // Clear the TextInput
          handleCancel(); // Close the modal
        } }
      ],
      { cancelable: false }
    );
  };

  return (
    <Modal animationType="slide" visible = {ModalVisible} onRequestClose={handleCancelPress}> 
    <View style={styles.container}>
      <TextInput
        placeholder="Type something"
        autoCorrect={true}
        keyboardType="default"
        value={text}
        onChangeText={(changedText) => {
          setText(changedText);
          setHasBlurred(false);  // Reset blur state when text changes
        }}
        onBlur={handleBlur}  // Handle blur event
        autoFocus={autoFocus}
      />
        
      {/* Conditional rendering based on blur state and text length */}
      {!hasBlurred ? (
        text.length > 0 && (
          <Text >
            Character count: {text.length}
          </Text>
        )
      ) : (
        <Text style={styles.text}>
          {text.length >= 3
            ? "Thank you"
            : "Please type more than 3 characters"}
        </Text>
      )}
      <View style={styles.buttonContainer}>
          <Button title="Confirm" onPress={handleConfirm} />
          <Button title="Cancel" onPress={handleCancelPress} color="#ff6f6f" />
      </View>
    </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  input: { 
    borderColor: "purple", 
    borderWidth: 2, 
    padding: 5 },
  buttonSpacing: {
    width: 10, // Adjust the spacing between buttons
  },
});
