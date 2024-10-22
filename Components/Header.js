import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Header({name}) {
  return (
    <View>
      <Text style= {styles.header}>Welcome to {name} !!</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  header : {
    color: "darkmagenta",
    fontSize: 25,
    borderColor: "darkmagenta",
    borderWidth: 2,
    padding: 5,
    marginBottom: 10,
    paddingHorizontal: windowWidth < 380 ? 10 : 20,
    paddingVertical: windowHeight < 600 ? 0 : 10,
    borderRadius: 10,
  },
})
