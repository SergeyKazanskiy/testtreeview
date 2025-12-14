import { Stack } from 'expo-router';


export default function RootLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
      animation: "fade",
      animationTypeForReplace: 'push',
      contentStyle: {
        backgroundColor: '#2E4A7C',
      },
    }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
