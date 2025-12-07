import StudentsScreen from '@/src/apps/manager/groups/StudentsScreen';
import { useRouter } from "expo-router";
import React from "react";



export default function DrillRoute() {
  const router = useRouter();

  return <StudentsScreen
  onStudent={() => router.push()}
    onBack={() => router.back()}
  />;
}
