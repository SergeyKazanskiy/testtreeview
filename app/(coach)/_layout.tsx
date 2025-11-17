import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import LoginScreen from '../api/screens/LoginScreen';
import { useAuthStore } from '../api/store';
import { ScreenContainer } from '../components/containers/ScreenContainer';


export default function Layout() {
  const { isLogin, restoreAuth } = useAuthStore();

  useEffect(() => {
    restoreAuth();
  }, []);

  if (isLogin === false) {
    return <LoginScreen onSwitch={() => {}} />;
  }

  return (
    <ScreenContainer>
      <Tabs>
        <Tabs.Screen name="home" options={{ title: 'Главная', headerShown: false }}/>
        <Tabs.Screen name="profile" options={{ title: 'Профиль', headerShown: false }}/>
        <Tabs.Screen name="ProfileScreen" options={{ title: 'RRR', headerShown: false }}/>
        <Tabs.Screen name="UsersScreen" options={{ title: 'EEE', headerShown: false }}/>
      </Tabs>
    </ScreenContainer>
  );
}
