import { ScrollView, Text, View } from 'react-native';
import AutoImageSlider from './components/AutoImageSlider';
import { styles } from '../styles/screens/homePage';
import ImageCard from './components/ImageCard';
import Animated, { FadeInLeft } from 'react-native-reanimated';
import { router } from 'expo-router';
// import Loader from './components/Loader';
import React, { useState, useEffect } from 'react';

const images = [
  'https://img.freepik.com/free-vector/college-campus-concept-illustration_114360-10538.jpg',
  'https://img.freepik.com/free-vector/college-students-concept-illustration_114360-10205.jpg',
  'https://img.freepik.com/free-vector/students-concept-illustration_114360-8327.jpg',
  'https://img.freepik.com/free-vector/college-campus-concept-illustration_114360-10535.jpg',
  'https://img.freepik.com/free-vector/flat-design-children-back-school_52683-44264.jpg',
];


export default function HomePage() {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // Simulate a loading delay (e.g., fetching data)
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000); // 3 seconds
  //   return () => clearTimeout(timer);
  // }, []);

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
            onPress: () => router.push('./screens/selectAction/'),
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
