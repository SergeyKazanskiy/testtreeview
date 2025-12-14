import { Stack } from 'expo-router';


export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade', presentation: 'card' }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(groups_student)" />
      <Stack.Screen name="events_attendance" />
    </Stack>
  );
}

