import EventsScreen from '@/src/apps/manager/events/EventsScreen';
import { useRouter } from "expo-router";
import React from "react";


export default function EventsRoute() {
  const router = useRouter();

  return <EventsScreen
    onBack={() => router.back()}
  />;
}
