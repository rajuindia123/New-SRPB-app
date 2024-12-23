import { Stack } from 'expo-router';


export default function GhosanaPatraLayout() {
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
     
      <Stack.Screen name="index" options={{headerShown:false,headerTitle:"घोषणा पत्र",headerTitleAlign:'center',headerTitleStyle:{fontSize:24}}} />
    </Stack>
  );
}
