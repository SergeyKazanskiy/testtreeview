import Constants from "expo-constants";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";


// Text.defaultProps = Text.defaultProps || {};
// Text.defaultProps.allowFontScaling = false;

// TextInput.defaultProps = TextInput.defaultProps || {};
// TextInput.defaultProps.allowFontScaling = false;

export default function Index() {
  const router = useRouter();
  const appRole = Constants.expoConfig?.extra?.appRole ?? "student";
  const redirected = useRef(false);

  useEffect(() => {
    if (redirected.current) return;
    redirected.current = true;

    setTimeout(() => {
      switch (appRole) {
        case "student":
          router.replace("/(student)");
          break;
        case "coach":
          router.replace("/(coach)");
          break;
        case "manager":
          router.replace("/(manager)");
          break;
        default:
          router.replace("/(student)");
      }
    }, 2000);
  }, []);

  return null;
}
