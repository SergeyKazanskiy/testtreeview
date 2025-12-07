import CoachesScreen from "@/src/apps/manager/coaches/CoachesScreen";
import { useRouter } from 'expo-router';
import React from 'react';


export default function CoachesRoute() {
  const router = useRouter();
  
  return (
     <CoachesScreen onCoach={() => router.push('/(manager)/(tabs)/coaches/coach')}/>
  );
}
