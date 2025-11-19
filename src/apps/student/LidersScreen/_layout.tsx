import { screenStyles } from '@/src/styles/appStyles';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { useStore } from '../store';


export default function StackLayout() {
  const navigation = useNavigation();
  const router = useRouter();

  const { isBackDrawer, setBackDrawer } = useStore();

  return (
    <Stack>
      <Stack.Screen name="index"
        options={{
          headerTitle: "Liders",
          headerStyle: {
            backgroundColor: screenStyles.background.backgroundColor, // Фон заголовка
          },
          headerTintColor: '#D1FF4D', // Цвет текста заголовка
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: 'bold', // Стиль текста
          },
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerLeft: () => {
            return (
              <>
                {isBackDrawer && <Ionicons name="menu" size={24} color='#D1FF4D' style={{ marginLeft: 16 }}
                  onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }}
                />}
                {!isBackDrawer && <Ionicons name='chevron-back' size={20} color='#D1FF4D' style={{ marginLeft: 22 }}
                  onPress={() => (router.back(), setBackDrawer(true))}
                />}
              </>
            );
          },
        }}
      />
      <Stack.Screen name="GroupsScreen"
        options={{
          animation: 'slide_from_right',
          headerTitle: "Groups",
          headerStyle: {
            backgroundColor: screenStyles.background.backgroundColor, // Фон заголовка
          },
          headerTintColor: '#D1FF4D', // Цвет текста заголовка
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: 'bold', // Стиль текста
          },
          headerTitleAlign: 'center',
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}


