import { Stack, usePathname } from 'expo-router';
import { useEffect } from 'react';
import { useRoutersState } from '../../state';


export default function Index() {
  const setShowRootTabs = useRoutersState((state) => state.setShowRootTabs);
  const pathname = usePathname();

  useEffect(() => {
    alert(pathname);
    const isInsideGroupTabs = pathname.startsWith("/groups/profile") ||
    pathname.startsWith("/groups/achieves") || pathname.startsWith("/groups/statistics");

    if (isInsideGroupTabs) {
      setShowRootTabs(false);
    } else {
      setShowRootTabs(true);
    }
  }, [pathname]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)/profile" />
    </Stack>
  );
}

