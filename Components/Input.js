import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

export default function Input({ autoFocus, inputHandler, ModalVisible }) {
  const [text, setText] = useState("");
  const [hasBlurred, setHasBlurred] = useState(false);

  const handleBlur = () => {
    setHasBlurred(true);  // Set the blur state when input loses focus
  };

  // Call the callback function (passed as prop) in handleConfirm function and pass the text that user has typed as function parameters.
  const handleConfirm = () => {
    inputHandler(text);
  };

  
  return (
    <Modal animationType="slide" visible = {ModalVisible}> 
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
      <Button title="Confirm" onPress={handleConfirm} />
    </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    width: "80%",
    marginBottom: 10,
  },
});
