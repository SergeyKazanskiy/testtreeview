import GameReport from "@/src/apps/coach/events/GameReport";
import { useRouter } from "expo-router";
import React from 'react';


export default function ReportRoute() {
  const router = useRouter();

  return <GameReport onBack={() => router.back()} />;
}
