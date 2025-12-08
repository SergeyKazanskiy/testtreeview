import CoachScreen from '@/src/apps/manager/coaches/CoachScreen';
import { useRouter } from "expo-router";
import React from "react";


export default function CoachRoute() {
  const router = useRouter();

  return <CoachScreen
    onBack={() => router.back()}
  />;
}
