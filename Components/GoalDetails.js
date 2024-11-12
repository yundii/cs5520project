import React, { useState, useLayoutEffect, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image} from "react-native";
import PressableButton from './PressableButton';
import GoalUsers from './GoalUsers';
import { Ionicons } from '@expo/vector-icons'; 
import { updateWarningStatus } from "../Firebase/firestoreHelper";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase/firebaseSetup";

const GoalDetails = ({ navigation, route }) => {
    const [isWarning, setIsWarning] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <PressableButton onPress={handleWarningPress} buttonStyle={styles.buttonStyle} pressedStyle={styles.pressedStyle}>
            <Ionicons name="warning" size={40} color="red" />
          </PressableButton>
        ),
      });
    }, [navigation, isWarning]);
  
    const handleWarningPress = () => {
      if (route.params?.goalData?.id) {
        setIsWarning(true);
        updateWarningStatus(route.params.goalData.id, "goals", true);  // Update Firestore
        navigation.setOptions({ title: "Warning!" });
      }
    };

    useEffect(() => {
      async function getImageUrl() {
        console.log("route.params.goalData.imageUrl", route.params.goalData.imageUrl);
      if (route.params.goalData.imageUrl) {
        const imageRef = ref(storage, route.params.goalData.imageUrl);
        const httpUrl = await getDownloadURL(imageRef);
        console.log("httpUrl", httpUrl);
        setImageUrl(httpUrl);
      } 
    }
    getImageUrl();
  }, [route.params]);

  return (
    <View style={styles.container}>
        {route.params ? <Text style={{ color: isWarning ? "red" : "black" }}>This is the details of a goal with text "{route.params.goalData.text}" and id "{route.params.goalData.id}"
        </Text>
         : <Text style={{ color: isWarning ? "red" : "black" }}>More Details</Text>}

      
        <Button title="More Details" onPress={() => navigation.push("Details")}/>
        <GoalUsers id={route.params.goalData.id} />
        {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} alt="goal image"/>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    padding: 1,
    //backgroundColor: '#bbb',
    borderRadius: 4,
    marginVertical: 5,
  },
  pressedStyle: {
    opacity: 0.2,
    backgroundColor: "#ccc",
  },
  image: {
    width: 100,
    height: 100,
  }
});

export default GoalDetails;
