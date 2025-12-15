import GameReport from "@/src/apps/student/GamesScreen/GameReport";
import { useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function ReportRoute() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <StatusBar style="light" backgroundColor="#152B52" />
      <GameReport pressBack={() => router.back()} />
    </SafeAreaView>
  );
}
