import GamingScreen from "@/src/apps/coach/events/GamingScreen";
import { useRouter } from "expo-router";
import React from 'react';


export default function GamingRoute() {
  const router = useRouter();

  return <GamingScreen onBack={() => router.back()} />;
}
