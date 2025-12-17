import GamingScreen from "@/src/apps/coach/events/GamingScreen";
import { useFocusEffect } from '@react-navigation/native';
import * as NavigationBar from 'expo-navigation-bar';
import { useRouter } from "expo-router";
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';


export default function GamingRoute() {
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );

      NavigationBar.setVisibilityAsync('hidden');
      NavigationBar.setBehaviorAsync('overlay-swipe');

      return () => {};
    }, [])
  );

  return (
     <>
      <StatusBar hidden />
      <GamingScreen
        onRemoveStudents={() => router.push('/(coach)/events_attendance/game/removeStudents')}
        onAddStudents={() => router.push('/(coach)/events_attendance/game/addStudents')}
        onBack={() => router.back()}
      />
     </>
  );
}
