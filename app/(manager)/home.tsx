import { ScreenContainer } from '@/src/components/containers/ScreenContainer';
import { useRouter } from 'expo-router';
import { Button, Text } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>🏠 Главная</Text>
      <Button
        title="Перейти на экран деталей2"
        onPress={() => router.push('/shared/DetailsScreen')}
      />
    </ScreenContainer>
  );
}
