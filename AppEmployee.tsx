// AppEmployee.tsx (в вашем корне)
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";


export default function AppEmployee() {
  const router = useRouter();

  useEffect(() => {
    const id = setTimeout(() => {
      router.replace("/dashboards/employee");
    }, 0);

    return () => clearTimeout(id);
  }, [router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});
