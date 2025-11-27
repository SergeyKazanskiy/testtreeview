import { useAuthStore } from '@/src/api/store';
import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";


export default function StudentLayout() {
  const { isLogin } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isLogin === false) {
      router.replace("/(student)/login");
    } else {
      router.replace("/(student)/(tabs)/home");
    }
  }, [isLogin]);

  if (isLogin === false) return null;

  return <Slot />;
}
