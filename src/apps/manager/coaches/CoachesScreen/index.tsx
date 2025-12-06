import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useStore } from '../store';
import { AddCoachAlert } from './alerts/AddCoachAlert';
import { CampsView } from './views/CampsView';
import { CoachesView } from './views/CoachesView';


type Props = {
  onCoach: () => void;
};

export default function CoachesScreen({ onCoach }: Props) {
  const { campId, camp_inx } = useStore();
  const { loadCamps, selectCamp, updateCoach } = useStore();

  useEffect(() => {
    loadCamps();
  }, [updateCoach]);

  useEffect(() => {
    selectCamp(campId, camp_inx);
  }, [updateCoach]);

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper}>
      <AddCoachAlert/>
      
      <CampsView/>
      <CoachesView onCoach={onCoach} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
    paddingHorizontal: 16,
  },
});