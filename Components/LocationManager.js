import {Alert, Button, StyleSheet, Text, View, Image} from 'react-native';
import {useState, useEffect} from 'react';
import React from 'react';
import * as Location from 'expo-location';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updateDB } from '../Firebase/firestoreHelper';
import { auth } from '../Firebase/firebaseSetup';

export default function LocationManager() {
    const [location, setLocation] = useState(null);
    const navigation = useNavigation();
    const route = useRoute();
    const[response, requestPermission] = Location.useForegroundPermissions();
    useEffect(() => {
        if (route.params?.location) {
            setLocation(route.params.location);
        }
    }, [route]);
    function saveLocationHandler() {
        // call updateDB from firestoreHelper and save location in a user doc with id=
        updateDB(auth.currentUser.uid, "users", {location: location});
        navigation.navigate("Home");
    }

    async function verifyPermission() {
        try {
            const permission = await requestPermission();
            if (permission.granted) {
                return true;
            }
        } catch (error) {
            console.log("Location permission error", error);
        }
    }
    async function  locationHandler () {
        try {
            const hasPermission = await verifyPermission();
            if (!hasPermission) {
                Alert.alert("Location permission not granted");
                return;
            }
            const location = await Location.getCurrentPositionAsync();
            console.log("Location", location);
            setLocation({latitude: location.coords.latitude, longitude: location.coords.longitude});
        } catch (error) {
            console.log("Location handler error", error);
        }   
    }
    return (
        <View>
            <Text>Location Manager</Text>
            <Button title="Get Location" onPress={locationHandler} />
            <Button title="Go to Map" onPress={() => navigation.navigate("Map")} />
            {location && <Image source={{ uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${process.env.EXPO_PUBLIC_mapsApiKey}`}} 
            style={styles.image} alt="location image"/>}
            <Button disabled={!location} title="Save my Location" onPress={(saveLocationHandler)} />
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 400,
        height: 200,
    }
});

