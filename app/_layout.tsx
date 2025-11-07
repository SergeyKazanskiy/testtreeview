import { Slot } from 'expo-router';

export default function RootLayout() {
  return <Slot />;
  // const router = useRouter();
  // const navState = useRootNavigationState();
  // const role = Constants.expoConfig?.extra?.appRole ?? 'employee';

  // useEffect(() => {
  //   if (!navState?.key) return; // ждём, пока навигация инициализируется

  //   if (role === 'leader') router.replace('/dashboards/leader');
  //   else if (role === 'manager') router.replace('/dashboards/manager');
  //   else router.replace('/dashboards/employee');
  // }, [navState, role]);

  // return <Stack screenOptions={{ headerShown: false }} />;
}

