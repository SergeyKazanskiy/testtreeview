import { useRouter } from 'expo-router';
import { Button, Text } from 'react-native';
import { ScreenContainer } from '../components/containers/ScreenContainer';


export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>🏠 Student</Text>
      <Button
        title="Перейти на экран деталей"
        onPress={() => router.push('./components/DetailScreen')}
      />
    </ScreenContainer>
  );
}
