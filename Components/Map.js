import MapView from "react-native-maps";
import React from "react";
import { StyleSheet, Dimensions, View , Button} from "react-native";
import { useState } from "react";
import { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";



export default function Map() {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const navigation = useNavigation();
    function confirmHandler() {
        // navigate to profile and pass the selected location to the profile
        navigation.navigate("Profile", {location: selectedLocation});
    }
    return (
        <View>
            <MapView 
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
 <Button disabled={!selectedLocation}  title="Confirm Location" onPress={(confirmHandler)} />
 </View>
    );
}

const styles = StyleSheet.create({
    map: {
        width: "100%",
        height: "90%",
    }
});