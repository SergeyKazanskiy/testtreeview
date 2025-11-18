import { ScreenContainer } from '@/src/components/containers/ScreenContainer';
import { useRouter } from 'expo-router';
import { Button, Text } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>👤 Профиль</Text>
      <Button
        title="Перейти на экран деталей (тот же)"
        onPress={() => router.push('/shared/DetailsScreen')}
      />
    </ScreenContainer>
  );
}
