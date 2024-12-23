import { Stack } from 'expo-router';

export default function DocReqLayout() {
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
      
      }}
      >
     
      <Stack.Screen name="index" options={{headerShown:true,headerTitle:"Profile",headerTitleAlign:'center'}} />
    </Stack>
  );
}
