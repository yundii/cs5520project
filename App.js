import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Components/Home";
import GoalDetails from "./Components/GoalDetails";
import { Button } from "react-native";

// Call createNativeStackNavigator outside the App function
const Stack = createNativeStackNavigator();
console.log(Stack);

// Define a common header style
const commonHeaderOptions = {
  headerStyle: { backgroundColor: "purple" },
  headerTintColor: "white",
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ title: "Home Page", ...commonHeaderOptions}}
        />
        <Stack.Screen name="Details" component={GoalDetails} options={{title: "Goal Details", ...commonHeaderOptions}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}