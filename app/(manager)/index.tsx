import { useAuthStore } from '@/src/api/store';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';


export default function ManagerLayout() {
  const { isLogin, isLoadingAuth, restoreAuth } = useAuthStore();
  const router = useRouter()


  useEffect(() => {
    restoreAuth();
  }, []);

  useEffect(() => {
    if (!isLoadingAuth && isLogin === false) {
      router.replace("/(manager)/login");
    }

    if (!isLoadingAuth && isLogin === true) {
      router.replace("/(manager)/(tabs)/groups");
    }
  }, [isLoadingAuth]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#007bff" />
    </View>
  );
}

