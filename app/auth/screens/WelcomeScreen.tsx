import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text } from "react-native";
import { ScreenContainer } from '../../components/containers/ScreenContainer';
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
    <ScreenContainer>
      <Text style={styles.title}>Добро пожаловать, пользователь {userId}</Text>
      <Button title="Выйти" onPress={handleLogout} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginBottom: 12,
    fontSize: 24,
    alignSelf: 'center',
    color: 'white'
  },
});