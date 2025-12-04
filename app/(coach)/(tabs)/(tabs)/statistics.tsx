import { useAuthStore } from '@/src/api/store';
import StatisticsScreen from "@/src/apps/student/StatisticsScreen";
import { useRouter } from "expo-router";
import React from 'react';

export default function StatisticsTab() {
  const { logoutUser } = useAuthStore();
  const router = useRouter();

  const logout = () => {
    logoutUser();
    router.replace("/(student)/login");
  };

  return <StatisticsScreen logout={logout} />;
}
