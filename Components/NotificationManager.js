import { Button, View, Alert } from "react-native";
import React from "react";
import * as Notifications from "expo-notifications";


export default function NotificationManager() {
    async function verifyPermissions() {
        try {
            const permissionResponse = await Notifications.getPermissionsAsync();
            if (permissionResponse.granted) {
                return true;
            }
            const permissionRequestResponse = await Notifications.requestPermissionsAsync();
            return permissionRequestResponse.granted;
        } catch (error) {
            console.log("Error verifying permissions", error);
        }
    }
    async function scheduleNotificationHandler() {
        try {
            const permissionGranted = await verifyPermissions();
            if (!permissionGranted) {
                Alert.alert("Error", "Failed to get notification permissions");
                return;
            }
            await Notifications.scheduleNotificationAsync({
                content: {
                title: "First Notification",
                body: "This is my first notification",
            },
            trigger: {
                seconds: 3,
                
                },
            });
        } catch (error) {
            console.log("Error scheduling notification", error);
        }
    }
    return (
        <View>
            <Button title="Enable Notifications" onPress={(scheduleNotificationHandler)} />
        </View>
    );
}