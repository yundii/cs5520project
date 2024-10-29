//- Make a new component Profile.js and display some information (e.g., email and uid) about the current user by accessing [currentUser](https://firebase.google.com/docs/auth/web/manage-users) property on Auth service instance.
//- Register a <Stack.Screen> to this component in the AppStack.
//- Add a pressable icon to the right side of the Home screen to navigate user to the Profile screen. (Hint: headerRight)
//   - You should pass a function to [options](https://reactnavigation.org/docs/screen-options/) on <Stack.Screen> component linked to "Home" so you can receive the navigation prop.

// Profile.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { auth } from "../Firebase/firebaseSetup";

const Profile = () => {
  const user = auth.currentUser; // Access the current user

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.title}>Profile Information</Text>
          <Text style={styles.info}>Email: {user.email}</Text>
          <Text style={styles.info}>UID: {user.uid}</Text>
        </>
      ) : (
        <Text>No user is currently logged in.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default Profile;
