import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

export default function Input({ autoFocus }) {
  const [text, setText] = useState("");

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
        }}
        autoFocus={autoFocus}
      />
        
      {text.length > 0 && (
        <Text style={styles.charCount}>
          Character count: {text.length}
        </Text>
      )}
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
});
