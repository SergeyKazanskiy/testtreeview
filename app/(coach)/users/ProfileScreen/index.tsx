import { useRouter } from 'expo-router';
import { ScreenContainer } from '../../../components/containers/ScreenContainer';
import { ProfileView } from './views/ProfileView';


export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ScreenContainer>
      
      <ProfileView />

    </ScreenContainer>
  );
}
