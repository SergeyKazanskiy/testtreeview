import StatisticsScreen from '@/src/apps/manager/groups/StatisticsScreen';
import { useRouter } from "expo-router";
import React from 'react';


export default function StatisticsRoute() {
  const router = useRouter();
  
  return <StatisticsScreen onBack={() => router.replace('/(manager)/groups_group_students')} />;
}
