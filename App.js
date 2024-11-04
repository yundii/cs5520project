import React, { useState, useEffect }  from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Components/Home";
import GoalDetails from "./Components/GoalDetails";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./Firebase/firebaseSetup";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";


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
    <Stack.Screen name="Home" component={Home} options={({navigation})=>{ return{ title: "Home Page", ...commonHeaderOptions , headerRight: () => (
      <Pressable onPress={() => navigation.navigate("Profile")}>
        <Ionicons name="person" size={30} color="white" style={{marginRight: 10}}/>
      </Pressable>)}}} />
    <Stack.Screen name="Profile" component={Profile} options={({navigation})=>{ return { title: "Profile", ...commonHeaderOptions, headerRight: () => (
      <Pressable onPress={() => signOut(auth)}>
        <Ionicons name="log-out" size={30} color="white" style={{marginRight: 10}}/>
      </Pressable>
    )}}
    } />
    <Stack.Screen name="Details" component={GoalDetails} options={({route}) => { return { title: route.params ? route.params.goalData.text : "More Details", ...commonHeaderOptions };}} />
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