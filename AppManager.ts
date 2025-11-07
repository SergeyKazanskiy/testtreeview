import { router } from "expo-router";
import "expo-router/entry";
import { useEffect } from "react";


export default function AppManager() {
  useEffect(() => {
    router.replace("/dashboards/manager");
  }, []);
  return null;
}
