import { Stack } from 'expo-router';

export default function AdmissionListLayout() {
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
        headerTitle:"Admin Management"
      
      }}
      >
      {/* <Stack.Screen name="index" options={{headerShown:true,headerTitleAlign:'center',headerBackVisible:false}} />
      <Stack.Screen name="AddStudent" options={{headerShown:true,headerTitleAlign:'center',headerBackVisible:true}} />
      <Stack.Screen name="StudentView" options={{headerShown:true,headerTitleAlign:'center',headerBackVisible:true}} />
      <Stack.Screen name="AdmissionList" options={{headerShown:true,headerTitleAlign:'center',headerBackVisible:true}} />
      <Stack.Screen name="RegList" options={{headerShown:true,headerTitleAlign:'center',headerBackVisible:true}} />
      <Stack.Screen name="CIAList" options={{headerShown:true,headerTitleAlign:'center',headerBackVisible:true}} />
      <Stack.Screen name="ExamList" options={{headerShown:true,headerTitleAlign:'center',headerBackVisible:true}} /> */}


    </Stack>
  );
}
