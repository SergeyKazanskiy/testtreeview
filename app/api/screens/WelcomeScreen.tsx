import React from "react";
import { Button, StyleSheet, Text } from "react-native";
import { ScreenContainer } from '../../components/containers/ScreenContainer';
import { firebaseAuth } from "../setup";
import { useAuthStore } from '../store';


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
      <Text style={styles.title}>Welcome, user</Text>
      <Button title="Logout" onPress={handleLogout} />
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