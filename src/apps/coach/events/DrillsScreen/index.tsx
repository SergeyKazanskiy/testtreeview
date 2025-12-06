import { PopupContainer } from '@/src/components/containers/PopupContainer';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, StyleSheet } from 'react-native';
import { useStore } from '../store';
import { DrillsView } from './views/DrillsView';


export default function DrillsScreen() {
    const { isDrillsModal } = useStore();
    const { closeDrillsModal } = useStore();

  return (
     <PopupContainer visible={isDrillsModal} title='Select drills' onClose={closeDrillsModal}>
      <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >

        <DrillsView/>
        
      </LinearGradient>
      </PopupContainer>
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