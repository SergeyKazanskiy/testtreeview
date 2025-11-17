import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import LoginScreen from '../api/screens/LoginScreen';
import { useAuthStore } from '../api/store';
import { ScreenContainer } from '../components/containers/ScreenContainer';
import { colors } from '../constants/colors';


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
      <Tabs screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.yellow[400],
          tabBarInactiveTintColor: colors.blue[300],
          tabBarStyle: {
            backgroundColor: colors.cyan[900],
            height: 60,
            paddingTop: 5,
            borderTopWidth: 1,
            borderTopColor: colors.gray[500],
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        }}
      >
        <Tabs.Screen name="chat"
          options={{
            title: 'Chat',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubble-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen name="users"
          options={{
            title: 'Users',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="people-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </ScreenContainer>
  );
}
