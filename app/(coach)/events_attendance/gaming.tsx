import GamingScreen from "@/src/apps/coach/events/GamingScreen";
import { useRouter } from "expo-router";
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function GamingRoute() {
  const router = useRouter();

  return (
    <SafeAreaView edges={['left', 'right']}>
      <GamingScreen onBack={() => router.back()} />
    </SafeAreaView>
  );
}
