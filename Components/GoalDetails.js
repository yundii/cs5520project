import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const GoalDetails = ({ navigation, route }) => {
  // Extract goal details from the route params

//   console.log(route.params.goalData);
//   function moreDetailsHandler() {
//     navigation.push("Details");
//   }
  return (
    <View style={styles.container}>
        {route.params ? <Text>This is the details of a goal with text {route.params.goalData.text} and id {route.params.goalData.id}</Text> : <Text>More Details</Text>}

      
        <Button title="More Details" onPress={() => navigation.push("Details")}/>
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
