import Constants from 'expo-constants';
import { useRouter } from "expo-router";
import { useEffect } from "react";


export default function Index() {
  const router = useRouter();
  const appRole = Constants.expoConfig?.extra?.appRole ?? "student";

  useEffect(() => {
    const timeout = setTimeout(() => {
      switch (appRole) {
        case "student":
          router.replace("/(student)/home");
          break;
        case "coach":
          router.replace("/(coach)/users/UsersScreen");
          break;
        case "manager":
          router.replace("/(manager)/home");
          break;
        default:
          router.replace("/(student)/home");
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return null;
}