import React, { useState } from 'react';
import { View, Button, Alert,Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageManager() {
  const [permissionResponse, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState(null);

  // Define the verifyPermission function
  const verifyPermission = async () => {
    if (permissionResponse?.granted) {
      return true; // Permission is already granted
    }
    // Request permission if not already granted
    const permissionResult = await requestPermission();
    return permissionResult.granted; // Return the result of the permission request
  };

  const takeImageHandler = async () => {
    // Call verifyPermission and only proceed if permission is granted
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'You need to grant camera access to take photos.',
        [{ text: 'OK' }]
      );

      return;
    }

    try {
      // Launch the camera if permission is granted
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri); 
        console.log('Image selected:', result.assets[0].uri);
      }
    } catch (err) {
      Alert.alert('Error', 'An error occurred while opening the camera.');
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take a Photo" onPress={takeImageHandler} />
      {imageUri && (  
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    imagePreview: {
      width: 200,
      height: 200,
      marginTop: 20,
      borderRadius: 10,
    },
  });
