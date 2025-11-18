import { useRouter } from 'expo-router';
import { Button, Text } from 'react-native';
import { ScreenContainer } from '../components/containers/ScreenContainer';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>🏠 Главная</Text>
      <Button
        title="Перейти на экран деталей2"
        onPress={() => router.push('/screens/DetailsScreen')}
      />
    </ScreenContainer>
  );
}
