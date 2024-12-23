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
        headerTitle:"Admin Management"
      
      }}
      >
      <Stack.Screen name="index" options={{headerShown:false,headerTitleAlign:'center',headerBackVisible:false}} />
      <Stack.Screen name="AddStudent" options={{headerShown:true,headerTitleAlign:'center',headerBackVisible:true,headerTitle:"Enrollment Students"}} />
      <Stack.Screen name="StudentView" options={{headerShown:true,headerTitleAlign:'center',headerBackVisible:true,headerTitle:"Enrollment Students"}} />
      <Stack.Screen name="AdmissionList" options={{headerShown:true,headerTitleAlign:'center',headerBackVisible:true,headerTitle:"Admission"}} />
      <Stack.Screen name="RegList" options={{headerShown:true,headerTitleAlign:'center',headerBackVisible:true,headerTitle:"Registration"}} />
      <Stack.Screen name="CIAList" options={{headerShown:true,headerTitleAlign:'center',headerBackVisible:true,headerTitle:"CIA"}} />
      <Stack.Screen name="ExamList" options={{headerShown:true,headerTitleAlign:'center',headerBackVisible:true,headerTitle:"Final Exam"}} />
      <Stack.Screen name="AddAdmission" options={{headerShown:true,headerTitleAlign:'center',headerBackVisible:true,headerTitle:"Add Admission"}} />

      <Stack.Screen name="AddRegistration" options={{headerShown:true,headerTitleAlign:'center',headerBackVisible:true,headerTitle:"Add Registration"}} />

      
      <Stack.Screen name="AddCIA" options={{headerShown:true,headerTitleAlign:'center',headerBackVisible:true,headerTitle:"Add Registration"}} />
       
      <Stack.Screen name="AddFinalExam" options={{headerShown:true,headerTitleAlign:'center',headerBackVisible:true,headerTitle:"Add Registration"}} />

      <Stack.Screen name="StudentDetails" options={{headerShown:true,headerTitleAlign:'center',headerBackVisible:true,headerTitle:"Student Details"}} />

      <Stack.Screen name="UpdateStudent" options={{headerShown:true,headerTitleAlign:'center',headerBackVisible:true,headerTitle:"Student Update"}} />


    </Stack>
  );
}
