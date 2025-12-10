import { API_BASE_URL } from '@/src/api/api';
import { auth, signInWithToken } from "@/src/api/firebaseConfig";
import { useAuthState } from "@/src/api/state";
import { useAuthStore } from '@/src/api/store';
import { CustomAlert } from '@/src/components/alerts/CustomAlert';
import { LoadingToast } from '@/src/components/toasts/LoadingToast';
import { DinivreyHeader } from '@/src/components/widgets/DinivreyHeader';
import Constants from "expo-constants";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from "react";
import { Button, Image, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';


interface Props {
  onLoginSuccess: () => void;
}

export default function StudentLoginScreen({onLoginSuccess}: Props) {

  const { loginUser } = useAuthStore();
  const { isError, errorMessage, clearMessages, setError, showLoading, hideLoading } = useAuthState();

  const [name, setName] = useState("David");
  const [password, setPassword] = useState("+447700900001");


  const handleLogin = async () => {
    const role = Constants.expoConfig?.extra?.appRole;
    showLoading();
    alert(`${API_BASE_URL}/${role}/test_login`)

    try {
      const res = await fetch(`${API_BASE_URL}/${role}/test_login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name: name, password }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Login failed");
      }

      const { id, token } = await res.json();
      await signInWithToken(token);
      const idToken = await auth.currentUser?.getIdToken(true)!;

      loginUser(idToken, id);
      onLoginSuccess();
    } catch (error: any) {
      setError(error.message || "Unknown login error");
    } finally {
      hideLoading();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#152B52' }}
      edges={['top', 'bottom']}
    >
    <LinearGradient colors={["#2E4A7C", "#152B52"]} style={styles.wrapper}>
      <DinivreyHeader title='Authorization' onExit={()=>router.replace('/')}/>
      <Image source={require("../../assets/images/DinivreyCompany.png")} style={styles.image} />

      <CustomAlert visible={isError} title="Auth error!"
        onClose={clearMessages}>
        <Text style={styles.alertText}>{errorMessage}</Text> 
      </CustomAlert>

      <Text style={styles.label}>First name and phone</Text>
      <TextInput style={styles.value}
        placeholder="First name"
        value={name}
        onChangeText={setName}
      />

      <TextInput style={styles.value} secureTextEntry
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.button}>
        <Button title="Login" onPress={handleLogin} />
      </View>

      <LoadingToast/>
    </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
    paddingHorizontal: 16,
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: '72%',
    height: '30%',
  },
  value: {
    marginTop: 14,
    color: '#444',
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: '92%',
    borderRadius: 8,
    backgroundColor: 'rgb(180, 216, 158)',
    minHeight: 32,
    alignSelf: 'center'
  },
  button: {
    marginTop: 16,
    width: '60%',
    alignSelf: 'center'
  },
  label: {
    fontSize: 18,
    color: 'gold',
    alignSelf: 'center'
  },
  alertText: {
    fontSize: 15,
    color: '#ddd'
  },
});

