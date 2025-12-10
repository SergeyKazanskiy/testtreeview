import { CustomNavbar } from '@/src/components/bars/CustomNavbar';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import { useStore } from '../store';
import { DrillView } from './views/DrillView';


type DrillScreenProps = {
  onBack: () => void;
};

export default function DrillScreen({ onBack }: DrillScreenProps) {
  const { drill } = useStore();

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <CustomNavbar title={ drill.name } onClick={onBack}/>

      <ScrollView
        contentContainerStyle={{paddingBottom: 200}}
        showsVerticalScrollIndicator={false}
      >
        <DrillView/>
      </ScrollView>
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
});