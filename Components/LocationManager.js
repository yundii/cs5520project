import {Alert, Button, StyleSheet, Text, View, Image} from 'react-native';
import {useState} from 'react';
import React from 'react';
import * as Location from 'expo-location';


export default function LocationManager() {
    const [location, setLocation] = useState(null);
    const[response, requestPermission] = Location.useForegroundPermissions();
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
            {location && <Image source={{ uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${process.env.EXPO_PUBLIC_mapsApiKey}`}} 
            style={styles.image} alt="location image"/>}
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 400,
        height: 200,
    }
});

