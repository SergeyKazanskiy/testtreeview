import { useAuthStore } from '@/src/api/store';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';


export default function CoachLayout() {
  const { restoreAuth, isLoadingAuth, isLogin } = useAuthStore();
  const router = useRouter()

  useEffect(() => {
    restoreAuth();
  }, []);

  useEffect(() => {
    if (!isLoadingAuth && isLogin === false) {
      router.replace("/(coach)/login");
    }

    if (!isLoadingAuth && isLogin === true) {
      router.replace("/(coach)/(tabs)/groups");
    }
  }, [isLoadingAuth]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#007bff" />
    </View>
  );
}