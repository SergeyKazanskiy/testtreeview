import GamingScreen from "@/src/apps/student/GamingScreen";
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
        onRemoveStudents={() => router.push('/shared/game/removeStudents')}
        onAddStudents={() => router.push('/shared/game/addStudents')}
        onBack={() => router.back()}
      />
     </>
  );
}
