import Constants from 'expo-constants';
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const role = Constants.expoConfig?.extra?.appRole || 'student';


    const timeout = setTimeout(() => {
      if (role === "student") router.replace("/(student)/home");
      else if (role === "coach") router.replace("/(coach)/home");
      else if (role === "manager") router.replace("/(manager)/home");
      else router.replace("/(student)/home"); // fallback
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
