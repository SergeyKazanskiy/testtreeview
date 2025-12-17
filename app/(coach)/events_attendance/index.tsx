import AttendanceScreen from '@/src/apps/coach/events/AttendanceScreen';
import { ScreenContainer } from '@/src/components/containers/ScreenContainer';
import { useRouter } from "expo-router";
import React from "react";


export default function AttendanceRoute() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <AttendanceScreen
        onBack={() => router.back()}
        onGame={() => router.push("/(coach)/events_attendance/game")}
        onTest={() => router.push('/(coach)/events_attendance/testing')}
        onGameReport={() => router.push('/(coach)/events_attendance/report')}
        onDrill={() => router.push('/(coach)/events_attendance/drill')}
        onStudent={() => router.replace('/(coach)/(groups_student)/profile')}
      />
    </ScreenContainer>
  );
}
