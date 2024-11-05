import {Alert, Button, Modal, StyleSheet, Text, TextInput, View, Image } from "react-native";
import React, { useState } from "react";
import ImageManager from './ImageManager'; 
import { auth } from "../Firebase/firebaseSetup";

export default function Input({ autoFocus, inputHandler, ModalVisible, handleCancel }) {
  const [text, setText] = useState("");
  const [hasBlurred, setHasBlurred] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  const handleBlur = () => {
    setHasBlurred(true);  // Set the blur state when input loses focus
  };

  // Add function to receive image URI from ImageManager
  const handleImageTaken = (uri) => {
  setImageUri(uri);
  };

  const handleConfirm = () => {
    inputHandler({
      text: text,
      imageUri: imageUri,
      owner: auth.currentUser.uid,
    });
    setText(""); 
    setImageUri(null);
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
    <Modal animationType="slide" visible = {ModalVisible} onRequestClose={handleCancelPress} transparent={true}> 
    <View style={styles.container}>
      <View style={styles.module}>
      <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png' }} 
          style={styles.image} 
          accessibilityLabel="Network image of an icon"
      />
      <Image 
          source={require('./image_lab2.png')} 
          style={styles.image} 
          accessibilityLabel="Local image of an icon"
      />
      <TextInput
        placeholder="Type something"
        autoCorrect={true}
        keyboardType="default"
        style={styles.textContainer}
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
        <Text>
          {text.length >= 3
            ? "Thank you"
            : "Please type more than 3 characters"}
        </Text>
      )}
      <View style={styles.buttonContainer}>
          <Button title="Confirm" onPress={handleConfirm} disabled={text.length < 3}/>
          <View style={styles.buttonSpacing} />
          <Button title="Cancel" onPress={handleCancelPress} color="#ff6f6f" />
      </View>

      <ImageManager onImageTaken={handleImageTaken} />
      </View>
    </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "lightyellow",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  textContainer : {
    color: "darkmagenta",
    fontSize: 15,
    borderColor: "darkmagenta",
    borderWidth: 2,
    padding: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 400, // Optional: limits the width of the button container
  },
  buttonSpacing: {
    width: 40, // Adjust the spacing between buttons
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  module: {
    borderRadius: 10,
    backgroundColor: 'grey',
    alignItems: "center",
    justifyContent: "center",
  },
});
