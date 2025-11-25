import GamingScreen from "@/src/apps/student/GamingScreen";
import { useRouter } from "expo-router";
import React from 'react';


export default function GamingRoute() {
  const router = useRouter();

  return <GamingScreen pressBack={() => router.back()} />;
}
