import { ScreenContainer } from '@/src/components/containers/ScreenContainer';
import { useRouter } from 'expo-router';
import { Button } from 'react-native';
import { ProfileView } from './views/ProfileView';


export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      
      <ProfileView />
      <Button title="Назад" onPress={() => router.back()} />
    </ScreenContainer>
  );
}
