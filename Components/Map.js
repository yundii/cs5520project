import MapView from "react-native-maps";
import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { useState } from "react";
import { Marker } from "react-native-maps";



export default function Map() {
    const [selectedLocation, setSelectedLocation] = useState(null);
    return <MapView 
        onPress={(e) => setSelectedLocation({latitude: e.nativeEvent.coordinate.latitude, longitude: e.nativeEvent.coordinate.longitude})}
        style={styles.map}
        initialRegion={{
            latitude: 37.7749,
            longitude: -122.4194,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
>
        {selectedLocation && <Marker coordinate={selectedLocation} title="Selected Location" description="Selected Location" />}
</MapView>
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});