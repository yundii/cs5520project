import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../Firebase/firebaseSetup';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Login");
  }

  const handleSignup = async () => {
    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
    const passwordMinLength = 6; // Minimum password length
    
    // Validation: check if fields are not empty
    if (email.length === 0 || password.length === 0 || confirmPassword.length === 0) {
        Alert.alert("All fields should be provided");
        return;
    }
    
    // Validation: check if email format is correct
    if (!emailRegex.test(email)) {
        Alert.alert("Please enter a valid email address");
        return;
    }
    
    // Validation: check password length
    if (password.length < passwordMinLength) {
        Alert.alert(`Password should be at least ${passwordMinLength} characters`);
        return;
    }
    
    // Validation: check if password and confirm password match
    if (password !== confirmPassword) {
        Alert.alert("Password and confirm password don't match");
        return;
    }
    
    try {
        // Attempt to create user
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User created:", userCred.user);
    } catch (err) {
        console.log("Sign up error:", err);
        Alert.alert(err.message);
    }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Sign Up" onPress={handleSignup} />
      <Button
        title="Already Registered? Login"
        onPress={handleLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
  },
});

export default Signup;
