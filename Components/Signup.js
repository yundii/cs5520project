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

  // use alert if no email or password or password not match
  const handleSignup = () => {
    if (!email || !password) {
      alert('Email and password are required');
    } else if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      try {
        const userCredential = createUserWithEmailAndPassword(auth, email, password);
        //console.log('User created:', userCredential);
        const user = userCredential.user;
        console.log('User created:', user);
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate("Login"); // Navigate to Login screen upon successful signup
      } catch (error) {
        console.error("Signup error:", error);
        Alert.alert("Signup Failed", error.message);
      }
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
        onPress={() => navigation.navigate("Login")}
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
