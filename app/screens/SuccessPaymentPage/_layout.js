import { Stack } from 'expo-router';

export default function SelectActionLayout() {
  return (
    <Stack
       screenOptions={{
        // Hide the header for all other routes.
        headerShown: false,
      }}
      >
      <Stack.Screen name="index" options={{headerShown:false}} />
    </Stack>
  );
}
