import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { styles } from '../../styles/screens/selectAction';
const SelectAction = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/SRPMLogo.jpeg')} // Replace with your image
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.text}>Hello, this is a blurred background!</Text>
      </View>
    </ImageBackground>
  )
}

export default SelectAction