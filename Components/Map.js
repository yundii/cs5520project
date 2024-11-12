import MapView from "react-native-maps";
import React from "react";
import { StyleSheet, Dimensions } from "react-native";


export default function Map() {
    return <MapView 
        style={styles.map}
        initialRegion={{
            latitude: 37.7749,
            longitude: -122.4194,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
    />;
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
});