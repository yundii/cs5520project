import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { auth } from "../Firebase/firebaseSetup";
import LocationManager from "./LocationManager";
import NotificationManager from "./NotificationManager";

const Profile = () => {
  const user = auth.currentUser; // Access the current user

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.title}>Profile Information</Text>
          <Text style={styles.info}>Email: {user.email}</Text>
          <Text style={styles.info}>UID: {user.uid}</Text>
          <LocationManager />
          <NotificationManager />
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
