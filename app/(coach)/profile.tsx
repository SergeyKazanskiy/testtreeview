import { useRouter } from 'expo-router';
import { Button, Text } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>👤 Профиль</Text>
      <Button
        title="Перейти на экран деталей (тот же)"
        onPress={() => router.push('/shared/details')}
      />
    </ScreenContainer>
  );
}
