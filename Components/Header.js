import { StyleSheet, Text, View, Dimensions, useWindowDimensions } from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Header({name}) {
  const { width, height } = useWindowDimensions();
  console.log(width);
  return (
    <View>
      <Text style={[styles.header, { paddingVertical: height < 415 ? 0 : 10 }]}>
        Welcome to {name}
      </Text>

    </View>
  )
}

const styles = StyleSheet.create({
  header : {
    color: "darkmagenta",
    fontSize: windowWidth < 380 ? 20 : 25,
    borderColor: "darkmagenta",
    borderWidth: 2,
    padding: 5,
    marginBottom: 10,
    borderRadius: 10,
  },
})
