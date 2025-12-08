import LoginScreen from '@/src/screens/TestLoginScreen';
import { useRouter } from "expo-router";
import React from 'react';


export default function LoginRoute() {
  const router = useRouter();
  
  function handleRoute() {
    router.replace("/(manager)/(tabs)/groups");
  }
  return <LoginScreen onLoginSuccess={handleRoute}/>;
}