import AttendanceScreen from '@/src/apps/coach/events/AttendanceScreen';
import { useRouter } from "expo-router";
import React from "react";


export default function AttendanceRoute() {
  const router = useRouter();

  return (
    <AttendanceScreen
      onGame={() => router.push("/shared/gaming")}
      onTest={() => router.push('/shared/report')}
    />
  );
}
