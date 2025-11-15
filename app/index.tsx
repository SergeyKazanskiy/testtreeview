import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import LoginScreen from './api/screens/LoginScreen';
import RegistrationScreen from './api/screens/RegistrationScreen';
import WelcomeScreen from './api/screens/WelcomeScreen';


export default function Index() {
  const router = useRouter();
  const appRole = Constants.expoConfig?.extra?.appRole ?? "student";

  function gotoRoleHome() {
    switch (appRole) {
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

  const [showWelcome, setShowWelcome] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const token = AsyncStorage.getItem("token");
      const userIdStr = AsyncStorage.getItem("user_id");
      alert("Token: " + token + ", UserID: " + userIdStr);
      const isAuth = token !== null && userIdStr !== null;
   
      if (isAuth) {
        gotoRoleHome();
      } else {
        setShowWelcome(false);
        setShowLogin(true);
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  if (showWelcome) {
    return <WelcomeScreen onLogout={() => (setShowWelcome(false), setShowLogin(true))}/>;
  }
  return (
    <>
      {showLogin ? (
        <LoginScreen onSwitch={() => setShowLogin(false)}/>
      ) : (
        <RegistrationScreen onSwitch={() => setShowLogin(true)}/>
      )}
    </>
  );
}