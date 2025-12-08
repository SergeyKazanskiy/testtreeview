import DrillScreen from '@/src/apps/coach/events/DrillScreen';
import { useRouter } from "expo-router";
import React from "react";



export default function DrillRoute() {
  const router = useRouter();

  return <DrillScreen onBack={() => router.back()} />;
}
