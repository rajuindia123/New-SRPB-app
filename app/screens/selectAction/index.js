import React ,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { styles } from '../../../styles/screens/selectAction';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage'; // import AsyncStorage
import { useIsFocused } from '@react-navigation/native';

const SelectAction = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [isLoggedInAdmin, setIsLoggedInAdmin] = useState(false); // Track login status
  const isFocused=useIsFocused()

  // useEffect(() => {
  //     // Check if the user is already logged in when the component mounts
  //     const checkLoginStatus = async () => {
  //         const userSession = await AsyncStorage.getItem("stuLoggedIn");
  //         if (userSession === "true") {
  //             setIsLoggedIn(true); // User is logged in, skip login form
  //              router.replace("/"); // Redirect to admin page
  //         }
  //     };
  //     const checkLoginStatusAdmin = async () => {
  //       const userSessionAdmin = await AsyncStorage.getItem("userLoggedIn");
  //       if (userSessionAdmin === "true") {
  //         setIsLoggedInAdmin(true); // User is logged in, skip login form
  //           router.replace("/"); // Redirect to admin page
  //       }
  //   };
  //   checkLoginStatusAdmin();
  //     checkLoginStatus();
  // }, []);
  // if (isLoggedIn) {
  //     return null; // If already logged in, don't show the login form
  // }
  // if (isLoggedInAdmin) {
  //     return null; // If already logged in, don't show the login form
  // }
  useEffect(() => {
    const checkLoginStatus = async () => {
        const userSession = await AsyncStorage.getItem("userLoggedIn");
        if (userSession) {
            const parsedSession = JSON.parse(userSession);
            if (parsedSession.role=="admin") {
                router.replace("/");
            }else if(parsedSession.role=="student"){
              router.replace("/");
            }
        }
    };
    checkLoginStatus();
}, [isFocused]);


if (isLoggedIn) {
    return null; // If already logged in, don't show the login form
}


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