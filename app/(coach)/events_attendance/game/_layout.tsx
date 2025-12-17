import * as NavigationBar from 'expo-navigation-bar';
import { Stack, useFocusEffect } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useCallback } from 'react';


export default function EventsAttendanceLayout() {
  useFocusEffect(
    useCallback(() => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
      NavigationBar.setVisibilityAsync('hidden');

      return () => {
        ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT
        );
        NavigationBar.setVisibilityAsync('visible');
      };
    }, [])
  );

  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_bottom' }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="addStudents" />
      <Stack.Screen name="removeStudents" />
    </Stack>
  );
}
