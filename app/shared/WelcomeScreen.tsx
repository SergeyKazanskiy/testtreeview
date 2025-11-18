import { firebaseAuth } from "@/src/api/setup";
import { useAuthStore } from '@/src/api/store';
import { ScreenContainer } from '@/src/components/containers/ScreenContainer';
import { screenStyles } from '@/src/styles/appStyles';
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";


interface Props {
  onLogout: () => void;
}

export default function WelcomeScreen({ onLogout }: Props) {
  const { logoutUser } = useAuthStore();

  const handleLogout = async () => {
    logoutUser();
    await firebaseAuth.signOut();
    onLogout();
  };

  return (
    <ScreenContainer>
      <Text style={screenStyles.title}>Welcome, user</Text>
      <View style={{ marginVertical: 20 }}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 5,
  },
});