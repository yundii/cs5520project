import React from 'react';
import { Pressable, View } from 'react-native';

const PressableButton = ({ onPress, children, androidRippleColor = 'red', buttonStyle, pressedStyle }) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{
        color: androidRippleColor,
        borderless: true,
        radius: 25
      }}
      style={({ pressed }) => [
        buttonStyle,
        pressed && pressedStyle,
      ]}
    >
      <View>
        {children}
      </View>
    </Pressable>
  );
};

// const styles = StyleSheet.create({
//   button: {
//     padding: 10,
//     backgroundColor: '#bbb',
//     borderRadius: 5,
//     marginVertical: 5,
//   },
//   pressedStyle: {
//     opacity: 0.2,
//     backgroundColor: "#ccc",
//   },
// });

export default PressableButton;
