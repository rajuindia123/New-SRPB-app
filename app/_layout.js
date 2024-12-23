import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'PTSerifRegular': require('../assets/font/PTSerif-Regular.ttf'),
    'PTSerifBold': require('../assets/font/PTSerif-Bold.ttf'),
    'PTSerifBoldItalic': require('../assets/font/PTSerif-BoldItalic.ttf'),
    'PTSerifItalic': require('../assets/font/PTSerif-Italic.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }


  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#690405',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShown: false,
        }}>
        {/* Optionally configure static options outside the route.*/}
        <Stack.Screen
          name="index"
          options={{
            headerShown:true,
            headerTitle: (props) => <LogoTitle {...props} />,
            headerTitleAlign: 'center'
          }}
        />

      </Stack>
      <StatusBar style="light" backgroundColor='#690405' />
    </>

  );
}
const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'PTSerifBold',
    marginLeft: 10,
  },
});
function LogoTitle() {
  return (
    <View style={styles.titleContainer}>
      <Image style={styles.image} source={require('../assets/images/SRPMLogo.jpeg')} />
      <Text style={styles.titleText}>SRPB GROUP</Text>
    </View>
  );
}
