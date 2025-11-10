import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, Text, TextInput } from "react-native";
import ScreenContainer from "../components/ScreenContainer";
import { signInWithCustomToken } from "./firebase";

export default function LoginScreen() {
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithCustomToken(token);
      router.replace("/"); // переход в приложение
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <ScreenContainer>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Авторизация</Text>
      <TextInput
        style={{
          borderWidth: 1,
          padding: 10,
          borderRadius: 8,
          width: "100%",
          marginBottom: 10,
        }}
        placeholder="Введите custom token"
        value={token}
        onChangeText={setToken}
      />
      <Button title="Войти" onPress={handleLogin} />
      {!!error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}
    </ScreenContainer>
  );
}
