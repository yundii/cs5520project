import React, { useState, useLayoutEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const GoalDetails = ({ navigation, route }) => {
    const [isWarning, setIsWarning] = useState(false);

    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <Button title="Warning" onPress={handleWarningPress} />
        ),
      });
    }, [navigation, isWarning]);
  
    const handleWarningPress = () => {
      setIsWarning(true);
      navigation.setOptions({ title: "Warning!" }); 
    };

  return (
    <View style={styles.container}>
        {route.params ? <Text style={{ color: isWarning ? "red" : "black" }}>This is the details of a goal with text "{route.params.goalData.text}" and id "{route.params.goalData.id}"</Text> : <Text style={{ color: isWarning ? "red" : "black" }}>More Details</Text>}

      
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
});

export default GoalDetails;
