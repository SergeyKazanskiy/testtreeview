import { useAuthStore } from '@/src/api/store';
import StudentLoginScreen from '@/src/apps/student/StudentLoginScreen';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';


export default function CoachLayout() {
  const { isLogin, restoreAuth } = useAuthStore();
  const router = useRouter()

  useEffect(() => {
    restoreAuth();
  }, []);

  useEffect(() => {
    if (isLogin) {
      router.push('./(tabs)/home');
    }
  }, [isLogin]);

  return <StudentLoginScreen />;
}
