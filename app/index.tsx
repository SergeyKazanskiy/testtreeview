import React, { useEffect } from 'react';
import { Text } from 'react-native';

export default function Index() {
  //const router = useRouter();

  useEffect(() => {
    //router.push('/(tabs)/home');
  }, []);

  return <Text style={{ fontSize: 20, marginBottom: 20 }}>📄 Экран деталей</Text>;
      {/* <Slot /> */}

}