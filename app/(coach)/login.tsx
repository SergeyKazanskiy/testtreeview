import LoginScreen from '@/src/screens/LoginScreen';
import { useRouter } from "expo-router";
import React from 'react';


export default function LoginRoute() {
  const router = useRouter();

  function login() {
    router.replace("/(coach)/(tabs)/groups");
  }
  return <LoginScreen onLogin={login} onSwitch={()=>{}}/>;
}