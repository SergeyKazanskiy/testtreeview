import { auth } from "@/src/api/firebaseConfig";
import { useAuthState } from "@/src/api/state";
import { useAuthStore } from '@/src/api/store';
import { API_BASE_URL } from '@/src/api/utils';
import { CustomAlert } from '@/src/components/alerts/CustomAlert';
import { LoadingToast } from '@/src/components/toasts/LoadingToast';
import { DinivreyHeader } from '@/src/components/widgets/DinivreyHeader';
import Constants from "expo-constants";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { PhoneAuthProvider, RecaptchaVerifier, signInWithCredential, signOut } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { Button, Image, Platform, StyleSheet, Text, TextInput, View } from "react-native";


interface Props {
  onLogin: () => void;
}

export default function CoachLoginScreen({onLogin}: Props) { 
  const { loginUser } = useAuthStore();
  const { isError, errorMessage, clearMessages, setError, showLoading, hideLoading } = useAuthState();

  const [phone, setPhone] = useState("+447700900001");
  const [code, setCode] = useState('123456');
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [isCode, setIsCode] = useState(false);
  
  const role = process.env.APP_ROLE || "student";
  const webRecaptcha = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    if (Platform.OS === "web" && !webRecaptcha.current) {
      webRecaptcha.current = new RecaptchaVerifier( auth, "recaptcha-container",
        { size: "invisible"}
      );
    }
  }, []);


  const sendPhone = async () => {
    try {
      const provider = new PhoneAuthProvider(auth);
      let id;

      showLoading();
      if (Platform.OS === "web") {
        id = await provider.verifyPhoneNumber(phone, webRecaptcha.current!);
      } else {
        id = await provider.verifyPhoneNumber(phone);
      }
      hideLoading();

      setVerificationId(id);
      setIsCode(true);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const confirmCode = async () => {
    try {
      if (!verificationId) return;

      const credential = PhoneAuthProvider.credential(verificationId, code);
      const userData = await signInWithCredential(auth, credential);
      const token = await userData.user.getIdToken(true);

      const role = Constants.expoConfig?.extra?.appRole;
      const res = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ role }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Login failed");
      }

      const { id } = await res.json();

      loginUser(token, id);
      onLogin();
    } catch (error: any) {
      setError(error.message)
    }
  };

  const closeErrorAlert = async () => {
    clearMessages();
    signOut(auth);
    setVerificationId(null);
    await auth.currentUser?.delete();
  }

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper}>
      <DinivreyHeader title='Authorization' onExit={()=>router.replace('/')}/>
      <Image style={[styles.image]}
        source={require('@/assets/images/DinivreyCompany.png')} /> 

      <CustomAlert visible={isCode} title="Success!"
        onClose={() => setIsCode(false)}>
        <Text style={styles.alertText}>Verification code received</Text> 
      </CustomAlert>

      <CustomAlert visible={isError} title="Phone error!"
        onClose={closeErrorAlert}>
        <Text style={styles.alertText}>{errorMessage}</Text> 
      </CustomAlert>

      {verificationId === null ? (
        <>
          <Text style={styles.label}>Enter your phone, {role}</Text>
          <TextInput style={styles.value} keyboardType="phone-pad"
            placeholder="Enter phone"
            value={phone}
            onChangeText={setPhone}
          />
          <View style={styles.button}>
            <Button title="Send phone" onPress={sendPhone} />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.label}>Enter code from SMS</Text>
          <TextInput  style={styles.value} keyboardType="number-pad" 
            placeholder="Code from SMS"
            value={code} 
            onChangeText={setCode}
          />
          <View style={styles.button}>
            <Button title="Confirm" onPress={confirmCode} />
          </View>
        </>
      )}
      
      {Platform.OS === "web" && <div id="recaptcha-container" />}

      <LoadingToast/>
    </LinearGradient>
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
    width: '72%',
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