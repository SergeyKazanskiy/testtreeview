import StudentLoginScreen from '@/src/screens/StudentLoginScreen';
import { useRouter } from "expo-router";
import React from 'react';


export default function LoginRoute() {
  const router = useRouter();

  function login() {
    router.replace("/(student)/(tabs)/home");
  }
  return <StudentLoginScreen login={login}/>;
}