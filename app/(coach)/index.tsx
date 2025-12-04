import { useAuthStore } from '@/src/api/store';
import { Slot, useRouter } from 'expo-router';
import { useEffect } from 'react';


export default function CoachLayout() {
  const { isLogin } = useAuthStore();
  const router = useRouter()

  useEffect(() => {
    if (isLogin === false) {
      //router.replace("/(coach)/login");
      router.replace("/(coach)/(tabs)/groups");
    } else {
      router.replace("/(coach)/(tabs)/groups");
    }
  }, [isLogin]);

  if (isLogin === false) return null;

  return <Slot />;
}

