import CoachScreen from '@/src/apps/manager/coaches/CoachScreen';
import { ScreenContainer } from '@/src/components/containers/ScreenContainer';
import { useRouter } from "expo-router";
import React from "react";


export default function CoachRoute() {
  const router = useRouter();

  return  (
    <ScreenContainer>
      <CoachScreen
        onBack={() => router.back()}
      />
    </ScreenContainer>
  )
}
