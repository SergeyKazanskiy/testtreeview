import { CustomNavbar } from '@/src/components/bars/CustomNavbar';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';
import { useStore } from '../store';
import { DrillView } from './views/DrillView';


type DrillScreenProps = {
  onBack: () => void;
};

export default function DrillScreen({ onBack }: DrillScreenProps) {
  const { drill } = useStore();

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >

      <Stack.Screen options={{ headerShown: false }} />
      <CustomNavbar title={ drill.name } onClick={onBack}/>

      <DrillView/>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 16,
  },
});