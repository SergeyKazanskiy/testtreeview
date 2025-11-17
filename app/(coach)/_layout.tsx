import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import LoginScreen from '../api/screens/LoginScreen';
import { useAuthStore } from '../api/store';
import { ScreenContainer } from '../components/containers/ScreenContainer';


export default function RootLayout() {
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
        <Tabs.Screen name="chat" options={{ title: 'chat', headerShown: false }}/>
        <Tabs.Screen name="users" options={{ title: 'users', headerShown: false }}/>
      </Tabs>
    </ScreenContainer>
  );
}
