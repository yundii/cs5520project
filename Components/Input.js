import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

export default function Input({ autoFocus }) {
  const [text, setText] = useState("");
  const [hasBlurred, setHasBlurred] = useState(false);

  const handleBlur = () => {
    setHasBlurred(true);  // Set the blur state when input loses focus
  };

  const handleConfirm = () => {
    alert("You typed: " + text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Type something"
        autoCorrect={true}
        keyboardType="default"
        value={text}
        style={styles.input}
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
          <Text style={styles.charCount}>
            Character count: {text.length}
          </Text>
        )
      ) : (
        <Text style={styles.message}>
          {text.length >= 3
            ? "Thank you"
            : "Please type more than 3 characters"}
        </Text>
      )}
      <Button title="Confirm" onPress={handleConfirm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',  // Align items in the center
  },
  input: {
    borderBottomColor: "purple",
    borderBottomWidth: 2,
    paddingVertical: 8,
    marginVertical: 10,
    width: 250,
  },
  charCount: {
    marginTop: 5,  // Add space between input and character count
    color: "gray",  // Set character count text color
  },
  message: {
    marginTop: 5,  // Add space between input and message
    color: "blue",  // Set message text color
  },
});
