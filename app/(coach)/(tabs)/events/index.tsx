import EventsScreen from '@/src/apps/coach/events/EventsScreen';
import { useRouter } from "expo-router";
import React from "react";
//import { Button, Text } from 'react-native';


export default function EventsRoute() {
  const router = useRouter();

  const pressEvent = () => {
    router.push('/(coach)/(tabs)/events/attendance');
  }
  return <EventsScreen  pressEvent={pressEvent}/>;
}




