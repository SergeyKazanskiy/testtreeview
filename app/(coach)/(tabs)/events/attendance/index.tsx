import AttendanceScreen from '@/src/apps/coach/events/AttendanceScreen';
import { useRouter } from "expo-router";
import React from "react";


export default function AttendanceRoute() {
  const router = useRouter();

  return (
    <AttendanceScreen
      pressGame={() => router.push("/shared/gaming")}
      pressTest={() => router.push('/shared/report')}
    />
  );
}
