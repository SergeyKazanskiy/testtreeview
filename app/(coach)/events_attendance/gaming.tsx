import GamingScreen from "@/src/apps/coach/events/GamingScreen";
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function GamingRoute() {
  const router = useRouter();

  return (
     <SafeAreaView style={{ flex: 1 }} edges={['top','left', 'right']}>
       <StatusBar style="light" backgroundColor="#152B52" />
      <GamingScreen onBack={() => router.back()} />
     </SafeAreaView>
  );
}
