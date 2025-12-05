import TestingScreen from '@/src/apps/coach/events/TestingScreen';
import { useRouter } from "expo-router";
import React from "react";



export default function TestingRoute() {
  const router = useRouter();

  return <TestingScreen onBack={() => router.back()} />;
}
