import StudentsScreen from '@/src/apps/manager/groups/StudentsScreen';
import { useRouter } from "expo-router";
import React from "react";


export default function StudentsRoute() {
  const router = useRouter();

  return <StudentsScreen
    onStudent={() => router.push('/(manager)/groups_group_students/(tabs)/profile')}
    onBack={() => router.back()}
  />;
}
