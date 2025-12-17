import { RemovingPopup } from "@/src/apps/student/GamingScreen/popups/RemovingPopup";
import { useRouter } from "expo-router";
import React from 'react';


export default function RemoveStudentsRoute() {
  const router = useRouter();

  return <RemovingPopup onBack={() => router.back()} />;
}
