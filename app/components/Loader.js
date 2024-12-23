import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';
import { FontFamiles } from '../../styles/base';

const Loader = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../assets/json/loader.json')} // Replace with your loader JSON file path
        autoPlay
        loop
        style={styles.animation} // Use the updated style
      />
      {/* <Text style={styles.text}>Loading...</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Customize your background color
  },
  animation: {
    width: 550, // Increase this value for larger size
    height: 550, // Increase this value for larger size
  },

});

export default Loader;
