import { Stack } from 'expo-router';

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
      
      }}
      >
     
      <Stack.Screen name="index" options={{headerShown:true,headerTitle:"DC Dagarua College",headerTitleAlign:'center',headerBackVisible:true}} />
      
      <Stack.Screen name="Edit" options={{headerShown:false,headerTitle:"DC Dagarua College",headerTitleAlign:'center',headerBackVisible:false}} />
      <Stack.Screen name="UploadFile" options={{headerShown:true,headerTitle:"Upload All Documents",headerTitleAlign:'center'}} />
    </Stack>
  );
}
