import CampsScreen from "@/src/apps/manager/events/CampsScreen";
import { useRouter } from 'expo-router';
import React from 'react';


export default function EventsRoute() {
  const router = useRouter();
  
  return (
     <CampsScreen onCamp={() => router.push('/(manager)/(tabs)/events/camp_events')}/>
  );
}
