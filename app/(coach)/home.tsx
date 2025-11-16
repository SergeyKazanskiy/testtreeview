import { useRouter } from 'expo-router';
import { Button, Text } from 'react-native';
import { firebaseAuth } from "../api/setup";
import { useAuthStore } from '../api/store';
import { ScreenContainer } from '../components/containers/ScreenContainer';


export default function HomeScreen() {
  const { logoutUser } = useAuthStore();

  const handleLogout = async () => {
    logoutUser();
    await firebaseAuth.signOut();
  };

  const router = useRouter();

  return (
    <ScreenContainer>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>🏠 Coach</Text>
      <Button title="Coach"
        onPress={() => router.push('../screens/DetailsScreen')}
      />
      <Button title="Logout"
        onPress={handleLogout}
      />
    </ScreenContainer>
  );
}
