import StudentsScreen from '@/src/apps/manager/groups/StudentsScreen';
import { ScreenContainer } from '@/src/components/containers/ScreenContainer';
import { useRouter } from "expo-router";
import React from "react";


export default function StudentsRoute() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <StudentsScreen
        onStudent={() => router.push('/(manager)/groups_group_students/(tabs)/profile')}
        onBack={() => router.replace('/(manager)/groups_group')}
      />
    </ScreenContainer>
  )
}
