import EventsScreen from '@/src/apps/manager/events/EventsScreen';
import { ScreenContainer } from '@/src/components/containers/ScreenContainer';
import { useRouter } from "expo-router";
import React from "react";


export default function EventsRoute() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <EventsScreen
        onBack={() => router.back()}
      />
    </ScreenContainer>
  )
}
