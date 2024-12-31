import { ScrollView, Text, View } from 'react-native';
import AutoImageSlider from './components/AutoImageSlider';
import { styles } from '../styles/screens/homePage';
import ImageCard from './components/ImageCard';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { router } from 'expo-router';
// import Loader from './components/Loader';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // import AsyncStorage
import { useIsFocused } from '@react-navigation/native';
import Loader from './components/Loader';

const images = [
  'https://img.freepik.com/free-vector/college-campus-concept-illustration_114360-10538.jpg',
  'https://img.freepik.com/free-vector/college-students-concept-illustration_114360-10205.jpg',
  'https://img.freepik.com/free-vector/students-concept-illustration_114360-8327.jpg',
  'https://img.freepik.com/free-vector/college-campus-concept-illustration_114360-10535.jpg',
  'https://img.freepik.com/free-vector/flat-design-children-back-school_52683-44264.jpg',
];


export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [isLoggedInAdmin, setIsLoggedInAdmin] = useState(false); // Track login status
      const [loading, setLoading] = useState(false);
  const [url,setUrl]=useState("/screens/selectAction/")
const isFocused=useIsFocused()

  useEffect(() => {
      // Check if the user is already logged in when the component mounts
      const checkLoginStatus = async () => {
        const userSession = await AsyncStorage.getItem("userLoggedIn");
        if (userSession) {
          const parsedSession = JSON.parse(userSession);
          // console.log(parsedSession)
          if (parsedSession.role=="student") {
            setUrl('/screens/DCDagaruaHome/')
          }else if(parsedSession.role=="admin"){
            setUrl('/screens/Admin/')
          
          }else{
            setUrl('/screens/selectAction/')
          }
      }
      
      };
  
      checkLoginStatus();
  }, [isFocused]);
  

  return (
    
    // isLoading ?<Loader />:
    <ScrollView showsVerticalScrollIndicator={false}>
      
      <View style={[styles.imageSlider]}>
        <AutoImageSlider images={images} />
      </View>
      <View style={styles.mainContent}>
        <Text
          style={{
            fontFamily: 'PTSerifBold',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'red',
          }}
        >
          Select College
        </Text>

        {/* Smoothly animated cards */}
        {[
          {
            title: 'DC Dagarua',
            // onPress: () => isLoggedIn?router.push('./screens/DCDagaruaHome/'):router.push('./screens/selectAction/'),
             onPress: ()=>router.push(url),
            imageSource: require('../assets/images/SRPMLogo.jpeg'),
          },
          {
            title: 'DC Modhopare',
            onPress: () => console.log('Login DC Modhopare'),
            imageSource: require('../assets/images/SRPMLogo.jpeg'),
          },
          {
            title: "SRP Teachers' Training College",
            onPress: () => console.log('SRP Teachers'),
            imageSource: require('../assets/images/srpTech.jpeg'),
          },
          {
            title: 'SRP School',
            onPress: () => console.log('SRP School'),
            imageSource: require('../assets/images/SRPSchool.jpeg'),
          },
        ].map((card, index) => (
          <Animated.View
            key={card.title}
            entering={FadeInLeft.delay(index * 200).duration(600).springify()}
          >
            <ImageCard
              title={card.title}
              onPress={card.onPress}
              description="This is a brief description to show on the right side of the card."
              imageSource={card.imageSource}
            />
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
}
