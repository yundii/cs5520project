import React, { useState, useEffect }  from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Components/Home";
import GoalDetails from "./Components/GoalDetails";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/firebaseSetup";

// Call createNativeStackNavigator outside the App function
const Stack = createNativeStackNavigator();

// Define a common header style
const commonHeaderOptions = {
  headerStyle: { backgroundColor: "purple" },
  headerTintColor: "white",
};

// Define AuthStack and AppStack
const AuthStack =  
  <>
    <Stack.Screen name="Login" component={Login} options={{ title: "Login", ...commonHeaderOptions }} />
    <Stack.Screen name="Signup" component={Signup} options={{ title: "Sign Up", ...commonHeaderOptions}} />
  </>
 
const AppStack = 
  <>
    <Stack.Screen name="Home" component={Home} options={{ title: "Home Page", ...commonHeaderOptions }} />
    <Stack.Screen name="Details" component={GoalDetails} options={{ title: "Goal Details", ...commonHeaderOptions }} />
  </>
 


export default function App() {
  const [isUserLoggedIn, setIsUserAuthenticated] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserAuthenticated(true);
      } else {
        setIsUserAuthenticated(false);
      }
    });
  }
  , []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
      {isUserLoggedIn ? AppStack  : AuthStack }

      </Stack.Navigator>
    </NavigationContainer>
  );
}