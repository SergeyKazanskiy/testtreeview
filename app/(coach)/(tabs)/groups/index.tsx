import GroupsScreen from "@/src/apps/coach/groups/GroupsScreen";
import { useRouter } from 'expo-router';
import React from 'react';


export default function GroupsRoute() {
  const router = useRouter();
  
  return (
    <GroupsScreen
      pressStudent={() => router.push('/(coach)/(tabs)/groups/(tabs)/profile')}
    />
  );
}
