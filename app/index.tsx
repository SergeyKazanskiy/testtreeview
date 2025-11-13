import Constants from 'expo-constants';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import Toast from 'react-native-toast-message';
import LoginScreen from './auth/screens/LoginScreen';
import RegistrationScreen from './auth/screens/RegistrationScreen';
import WelcomeScreen from './auth/screens/WelcomeScreen';
import { useAuthState } from "./auth/store";


export default function Index() {
  const router = useRouter();
  const { isAuthenticated, loadAuth } = useAuthState();

  const [showWelcome, setShowWelcome] = useState(true);
  const [showLogin, setShowLogin] = useState(true);
  const [role, setRole] = useState<"student" | "coach" | "manager">("student");

  // Initializing a role and loading saved authorization
  useEffect(() => {
    const appRole = Constants.expoConfig?.extra?.appRole ?? "student";
    setRole(appRole);
    loadAuth();
  }, [loadAuth]);

  // After a second, hide the welcome screen. If authorized, navigate to the appropriate home screen.
  useEffect(() => {
    setShowWelcome(true);

    const timeout = setTimeout(() => {
      setShowWelcome(false);
   
      if (isAuthenticated) {
        switch (role) {
          case "student":
            router.replace("/(student)/home");
            break;
          case "coach":
            router.replace("/(coach)/home");
            break;
          case "manager":
            router.replace("/(manager)/home");
            break;
          default:
            router.replace("/(student)/home");
        }
      } 
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router, isAuthenticated, role]);

  // Welcome screen
  if (showWelcome) {
    return <WelcomeScreen />;
  }

  // If not authorized, we show the login/registration screens
  if (!isAuthenticated) {
    return (
      <>
        {showLogin ? (
          <LoginScreen onSwitch={() => setShowLogin(false)} />
        ) : (
          <RegistrationScreen onSwitch={() => setShowLogin(true)} />
        )}
        <Toast position="bottom" />
      </>
    );
  }

  return null;
}