import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles/screens/selectAction';
import { router } from 'expo-router';
const SelectAction = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/SRPMLogo.jpeg')} // Replace with your image path
        style={styles.background}
      // blurRadius={10} // Apply blur effect
      >
        <View style={styles.overlay}>

          <TouchableOpacity style={styles.box1} onPress={() => router.push('/auth/Login')}>
            <Text style={styles.studentText}>Student Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.box1} onPress={() => router.push('/auth/AdminLogin')}>
            <Text style={styles.studentText}>Admin Login</Text>
          </TouchableOpacity>

          {/* <Text style={styles.text}>Hello, this is a blurred background!</Text> */}
        </View>
      </ImageBackground>
    </View>
  )
}

export default SelectAction