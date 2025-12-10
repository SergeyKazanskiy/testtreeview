import GroupScreen from '@/src/apps/manager/groups/GroupScreen';
import { ScreenContainer } from '@/src/components/containers/ScreenContainer';
import { useRouter } from "expo-router";
import React from "react";


export default function GroupRoute() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <GroupScreen
        onStudents={() => router.push('/(manager)/groups_group_students')}
        onBack={() => router.back()}
      />
    </ScreenContainer>
  )
}
