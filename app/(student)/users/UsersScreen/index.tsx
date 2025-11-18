import { ScreenContainer } from '@/src/components/containers/ScreenContainer';
import { useRouter } from 'expo-router';
import { Button, Text } from 'react-native';
import { UsersView } from './views/UsersView';


export default function UsersScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      <Text style={{ fontSize: 20, marginBottom: 20, color: 'white' }}>UsersScreen</Text>
      <UsersView />
      <Button
        title="Перейти на экран деталей2"
        onPress={() => router.push('./ProfileScreen')}
      />
    </ScreenContainer>
  );
}
