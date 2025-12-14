import { Stack } from 'expo-router';


export default function AttendanceLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade', presentation: 'card' }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="drill" />
      <Stack.Screen name="gaming" />
      <Stack.Screen name="testing" />
    </Stack>
  );
}

