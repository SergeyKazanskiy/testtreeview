import { Stack } from 'expo-router';


export default function Index() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UsersScreen" />
      <Stack.Screen name="ProfileScreen" />
    </Stack>
  );
}