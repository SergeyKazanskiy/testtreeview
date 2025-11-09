import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{ title: 'Главная', headerShown: false }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Профиль', headerShown: false }}
      />
    </Tabs>
  );
}
