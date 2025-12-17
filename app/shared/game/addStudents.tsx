import { AddingPopup } from "@/src/apps/student/GamingScreen/popups/AddingPopup";
import { useRouter } from "expo-router";
import React from 'react';


export default function AddStudentsRoute() {
  const router = useRouter();

  return <AddingPopup onBack={() => router.back()} />;
}
