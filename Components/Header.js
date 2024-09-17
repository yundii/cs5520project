import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Header({name}) {
  return (
    <View>
      <Text style= {styles.header}>Welcome to {name} !!</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  header : {
    color: 'red',
    fontSize: 20,
    borderColor: 'purple',
    borderWidth: 3,
    padding: 10,
    marginBottom: 10,
  },
})