import { CustomNavbar } from '@/src/components/bars/CustomNavbar';
import { PopupContainer } from '@/src/components/containers/PopupContainer';
import { StatsIndicators } from '@/src/components/widgets/StatsIndicators';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
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

  useFocusEffect(
    useCallback(() => {
      loadStudent();
    }, [])
  );

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <CustomNavbar title='Student' onClick={onBack}>
        <Ionicons name='clipboard-outline' size={20} color='#D1FF4D' style={{ marginRight: 8, marginTop: 0 }}
          onPress={()=>showComments(true)}
        />
      </CustomNavbar>

      <PopupContainer visible={isCommentsScreen} title='Coach comments' onClose={() => showComments(false)}>
        <CommentsScreen/>
      </PopupContainer>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 200}}
        showsVerticalScrollIndicator={false}
      >
        <ProfileView/>
        <PerentsView/>
        <AddressView/>

        <View style={styles.section}>
          <RadarChart test={last_test} onExam={(exam)=>{}}/>
          <StatsIndicators stats={[last_test.climbing, last_test.stamina, last_test.speed, last_test.evasion, last_test.hiding]}/>  
        </View>

        <AttendanceView/>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
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