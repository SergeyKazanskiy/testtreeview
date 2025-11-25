import GamesScreen from "@/src/apps/student/GamesScreen";
import { useRouter } from 'expo-router';
import React from 'react';


export default function GamesPage() {
  const router = useRouter();
  
  return (
    <GamesScreen
      pressNewGame={() => router.push("/shared/gaming")}
      pressGameReport={() => router.push('/shared/report')}
    />
  );
}
