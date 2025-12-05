import { CustomNavbar } from '@/src/components/bars/CustomNavbar';
import { PopupWrapper } from '@/src/components/containers/PopupWrapper';
import { StatsIndicators } from '@/src/components/widgets/StatsIndicators';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import CommentsScreen from '../CommentsScreen';
import { useStore } from '../store';
import { AddressView } from './views/AddressView';
import { AttendanceView } from './views/AttendanceView';
import { PerentsView } from './views/PerentsView';
import { ProfileView } from './views/ProfileView';
import { RadarChart } from './views/RadarChart';


interface Props {
  onBack: () => void;
}
  
export default function ProfileScreen({ onBack }: Props) {
  const { isCommentsScreen, last_test } = useStore();
  const { loadStudent, showComments } = useStore();

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadStudent();
    }, [])
  );

  return (
    <>
      <CustomNavbar title='Student' onClick={onBack}>
        <Ionicons name='clipboard-outline' size={20} color='#D1FF4D' style={{ marginRight: 8, marginTop: 0 }}
          onPress={()=>showComments(true)}
        />
      </CustomNavbar>

      <PopupWrapper visible={isCommentsScreen} title='Coach comments' onClose={() => showComments(false)}>
        <CommentsScreen/>
      </PopupWrapper>

      <ScrollView style={styles.container}>
        <ProfileView/>
        <PerentsView/>
        <AddressView/>

        <View style={styles.section}>
          <RadarChart test={last_test} onExam={(exam)=>{}}/>
          <StatsIndicators stats={[last_test.climbing, last_test.stamina, last_test.speed, last_test.evasion, last_test.hiding]}/>  
        </View>
      </ScrollView>

      <View style={styles.summary}>
        <AttendanceView/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: { 
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  summary: { 
    marginTop: 'auto', 
    paddingBottom: 20
  },
});