import Constants from "expo-constants";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";


export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const role = process.env.APP_ROLE || Constants.expoConfig?.extra?.appRole;

    // Отложенный переход — безопасен
    const timeout = setTimeout(() => {
      if (role === "employee") router.replace("/dashboards/employee");
      else if (role === "leader") router.replace("/dashboards/leader");
      else if (role === "manager") router.replace("/dashboards/manager");
      else router.replace("/dashboards/employee"); // fallback
    }, 0);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});
