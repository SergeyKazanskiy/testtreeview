import EventsScreen from '@/src/apps/coach/events/EventsScreen';
import { useRouter } from "expo-router";
import React from "react";


export default function EventsRoute() {
  const router = useRouter();

  const pressEvent = () => {
    router.push('/(coach)/(tabs)/events/attendance');
  }
  return <EventsScreen  onEvent={pressEvent}/>;
}




