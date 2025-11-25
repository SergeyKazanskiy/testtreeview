import GameReport from "@/src/apps/student/GamesScreen/GameReport";
import { useRouter } from "expo-router";
import React from 'react';


export default function ReportRoute() {
  const router = useRouter();

  return <GameReport pressBack={() => router.back()} />;
}
