import { Stack } from 'expo-router';

export default function DCDagaruaLayout() {
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
     
     <Stack.Screen name="index" options={{headerShown:false,headerTitle:"DC Dagarua College",headerTitleAlign:'center',headerBackVisible:false}} />
      <Stack.Screen name="DocReq" options={{headerShown:true,headerTitle:"Documents Required",headerTitleAlign:'center'}} />
      <Stack.Screen name="GhosanaPatra" options={{headerShown:false,headerTitle:"घोषणा पत्र",headerTitleAlign:'center',headerTitleStyle:{fontSize:24}}} />
      <Stack.Screen name="Edit" options={{headerShown:false,headerTitle:"DC Dagarua College",headerTitleAlign:'center',headerBackVisible:false}} />
      <Stack.Screen name="UploadFile" options={{headerShown:true,headerTitle:"Upload All Documents",headerTitleAlign:'center'}} />
    </Stack>
  );
}
