import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Components/Home";
import GoalDetails from "./Components/GoalDetails";
import { Button } from "react-native";

// Call createNativeStackNavigator outside the App function
const Stack = createNativeStackNavigator();
console.log(Stack);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ title: "Home Page",  headerStyle: {backgroundColor: "purple"}, headerTintColor: "white" }}
        />
        <Stack.Screen name="Details" component={GoalDetails} options={({route})=>{
          return {
            title: route.params? route.params.goalData.text: "More Details",
            headerRight: () => {
              return <Button
                onPress={() => alert('Warning')}
                title="Warning"
                />;
            },
            }
          } 
      }/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}