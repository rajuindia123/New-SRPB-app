import React from 'react';
import { router, Stack } from 'expo-router';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Example: Material Icons

export default function DCDagaruaHomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#690405',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          headerTitle: 'DC Dagarua College',
          headerBackVisible: false,
          // headerRight: () => (
          //   <TouchableOpacity
          //     onPress={() =>router.push('/screens/UserProfile/')}
          //   >
          //     <Icon name="account-circle" size={40} color="#fff" />
          //   </TouchableOpacity>
          // ),
        }}
      />
    </Stack>
  );
}
