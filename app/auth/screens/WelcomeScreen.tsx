import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { firebaseAuth } from "../setup";


export default function WelcomeScreen() {
  const [userId, setUserId] = useState("");
  const router = useRouter();

  useEffect(() => {
    AsyncStorage.getItem("user_id").then((id) => setUserId(id || ""));
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    await firebaseAuth.signOut();
    router.replace("../auth/LoginScreen");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Добро пожаловать, пользователь {userId}</Text>
      <Button title="Выйти" onPress={handleLogout} />
    </View>
  );
}
