import { Stack } from 'expo-router';


export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="(tabs)"/>
      <Stack.Screen name="camps_events"/>
      <Stack.Screen name="coaches_coach"/>
      <Stack.Screen name="groups_group"/>
      <Stack.Screen name="groups_group_students"/>
    </Stack>
  );
}

//, presentation: 'card'