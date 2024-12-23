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
     
      <Stack.Screen name="index" options={{headerShown:true,headerTitle:"Documents Required",headerTitleAlign:'center'}} />
    </Stack>
  );
}
