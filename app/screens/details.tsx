import { useRouter } from 'expo-router';
import { Button, Text } from 'react-native';
import { ScreenContainer } from '../components/containers/ScreenContainer';


export default function DetailsScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>📄 Экран деталей</Text>
      <Button title="Назад" onPress={() => router.back()} />
    </ScreenContainer>
  );
}
