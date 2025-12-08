import AchievesScreen from "@/src/apps/coach/groups/AchievesScreen";
import { useRouter } from "expo-router";
import React from 'react';


export default function AchievesRoute() {
  const router = useRouter();

  return <AchievesScreen onBack={() => router.replace('/(coach)/(tabs)/groups')} />;
}
