import React from 'react';
import { View, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageManager() {
  const takeImageHandler = async () => {
    try {
      // Request permission to access the camera
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Camera Access Required',
          'Camera access is needed to take photos',
          [{ text: 'OK' }]
        );
        return;
      }

      // Launch the camera
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true, // Allow user to edit the image before saving
        quality: 1, // Set the quality of the image (1 is the highest quality)
      });

      if (!result.canceled) {
        console.log('Image selected:', result.assets[0].uri);
        // Handle the image URI, e.g., pass it back to Input.js or save it
      }
    } catch (err) {
      Alert.alert('Error', 'An error occurred while opening the camera.');
      console.error(err);
    }
  };

  return (
    <View>
      <Button title="Take a Photo" onPress={takeImageHandler} />
    </View>
  );
}
