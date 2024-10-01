import React from "react";
import { View, Text, StyleSheet } from "react-native";

const GoalDetails = ({ route }) => {
  // Extract goal details from the route params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goal Details</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
  },
});

export default GoalDetails;
