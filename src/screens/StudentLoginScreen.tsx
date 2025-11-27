import { auth } from "@/src/api/firebaseConfig";
import { useAuthState } from "@/src/api/state";
import { useAuthStore } from '@/src/api/store';
import { API_BASE_URL } from '@/src/api/utils';
import { CustomAlert } from '@/src/components/alerts/CustomAlert';
import { LoadingToast } from '@/src/components/toasts/LoadingToast';
import { DinivreyHeader } from '@/src/components/widgets/DinivreyHeader';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from "react";
import { Button, Image, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';


interface Props {
  login: () => void;
}

export default function StudentLoginScreen({login}: Props) {

  const { loginUser } = useAuthStore();
  const { isError, errorMessage, clearMessages, setError, showLoading, hideLoading } = useAuthState();

  const [email, setEmail] = useState("Sergey_Procopenko@gmail.com");
  const [password, setPassword] = useState("Sergey_Procopenko");


  const handleLogin = async () => {
    showLoading();

    try {
      const res = await fetch(`${API_BASE_URL}/student/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Login failed");
      }

      const { id_student, token } = await res.json();
      //await signInWithToken(token);
      const idToken = await auth.currentUser?.getIdToken(true)!;

      loginUser(idToken, id_student);
      login();
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

      <Text style={styles.label}>Login with Email</Text>
      <TextInput style={styles.value}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
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
    fontSize: 18,
    paddingVertical: 4,
    paddingHorizontal: 12,
    width: '92%',
    borderRadius: 8,
    backgroundColor: 'rgb(180, 216, 158)',
    minHeight: 32,
    alignSelf: 'center'
  },
  button: {
    marginTop: 14,
    width: '60%',
    alignSelf: 'center'
  },
  label: {
    fontSize: 17,
    color: 'gold',
    alignSelf: 'center'
  },
  alertText: {
    fontSize: 15,
    color: '#ddd'
  },
});

