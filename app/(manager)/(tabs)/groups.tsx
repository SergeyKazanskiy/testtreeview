import GroupsScreen from "@/src/apps/manager/groups/GroupsScreen";
import { useRouter } from 'expo-router';
import React from 'react';


export default function GroupsRoute() {
  const router = useRouter();
  
  return (
     <GroupsScreen onGroup={() => router.push('/(manager)/groups_group')}/>
  );
}
