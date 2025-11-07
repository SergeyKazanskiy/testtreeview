import { router } from "expo-router";
import "expo-router/entry";
import { useEffect } from "react";


export default function AppLeader() {
  useEffect(() => {
    router.replace("/dashboards/leader");
  }, []);
  return null;
}
