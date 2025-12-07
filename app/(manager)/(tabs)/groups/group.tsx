import GroupScreen from '@/src/apps/manager/groups/GroupScreen';
import { useRouter } from "expo-router";
import React from "react";



export default function GroupRoute() {
  const router = useRouter();

  return <GroupScreen
    onStudents={() => router.push()}
    onBack={() => router.back()}
  />;
}
