import AttendanceScreen from '@/src/apps/coach/events/AttendanceScreen';
import { useRouter } from "expo-router";
import React from "react";


export default function AttendanceRoute() {
  const router = useRouter();

  return (
    <AttendanceScreen
      onBack={() => router.back()}
      onGame={() => router.push("/shared/gaming")}
      onTest={() => router.push('/(coach)/(tabs)/events/attendance/testing')}
      onGameReport={() => router.push('/shared/report')}
      onDrill={() => router.push('/(coach)/(tabs)/events/attendance/drill')}
      onStudent={() => router.push('/(coach)/(tabs)/groups/(tabs)/profile')}
    />
  );
}
