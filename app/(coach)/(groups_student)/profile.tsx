import ProfileScreen from '@/src/apps/coach/groups/ProfileScreen';
import { useRouter } from "expo-router";
import React from "react";


export default function ProfileRoute() {
  const router = useRouter();

  return <ProfileScreen onBack={() => router.back()} />;
}
