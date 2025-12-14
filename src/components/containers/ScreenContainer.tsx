import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { ReactNode } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


interface Props {
  children: ReactNode;
}

export function ScreenContainer({ children }: Props) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar style="light" backgroundColor="#152B52" />
      <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      {children}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
    backgroundColor: '#152B52'
  },
    wrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
