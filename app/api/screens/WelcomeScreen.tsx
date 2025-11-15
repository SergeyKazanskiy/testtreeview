import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from '../../components/containers/ScreenContainer';
import { screenStyles } from '../../styles/appStyles';
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