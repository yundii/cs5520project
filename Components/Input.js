import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

export default function Input({autoFocus}) {
  const [text, setText] = useState("");

  return (
    <TextInput
      placeholder="Type something"
      autoCorrect={true}
      keyboardType="default"
      value={text}
      style={{ borderBottomColor: "purple", borderBottomWidth: 2 }}
      onChangeText={(changedText) => {
        setText(changedText);
      }}
      autoFocus={autoFocus} // Use the autoFocus property of TextInput
      

    />
  );
}

const styles = StyleSheet.create({});