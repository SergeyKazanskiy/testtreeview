import { ReactNode } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


interface Props {
  children: ReactNode;
}

export function ScreenContainer({ children }: Props) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#152B52',
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
  },
});
