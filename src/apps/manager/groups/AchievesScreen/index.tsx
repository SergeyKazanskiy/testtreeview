import { useAuthState } from '@/src/api/state';
import { CustomAlert } from '@/src/components/alerts/CustomAlert';
import { CustomNavbar } from '@/src/components/bars/CustomNavbar';
import { screenStyles } from '@/src/styles/appStyles';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Platform, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { useStore } from '../store';
import { AchievesSection } from './views/AchievesSection';


type Props = {
  onBack: () => void;
};

export const AchievesScreen = ({ onBack }: Props) => {
  const { isLoading } = useAuthState();

  const { achievement_id, student, studentAchieves } = useStore();
  const { loadStudentAchieves, detachAchieve, setAchievesSummary } = useStore();

  useFocusEffect(
    useCallback(() => {
      loadStudentAchieves();
    }, [])
  );

  const [isSummaryInput, setIsSummaryInput] = useState<boolean>(false);
  const [summaryText, setSummaryText] = useState<string>(student.summary_achievements);
  
  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <CustomNavbar title='Achievements' onClick={onBack}>
        <Ionicons name='trash-outline' size={22} color={achievement_id === 0 ? '#D1FF4D' :'red'}
          onPress={detachAchieve} style={{paddingLeft: 8}}
        />
      </CustomNavbar>

      <CustomAlert visible={isSummaryInput} 
        title="Summary for student!"
        buttonText='Save'
        handleYes={() => {setAchievesSummary(summaryText); setIsSummaryInput(false)}}
        onClose={() => setIsSummaryInput(false)}>
          <TextInput
              style={styles.dialogInput}
              onChangeText={setSummaryText}
              value={summaryText}
              placeholder="Enter summary"
              keyboardType='default'
          />
      </CustomAlert>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 200}}
        showsVerticalScrollIndicator={false}
      >
        <AchievesSection title='Test achievements' category='Test' />
        <AchievesSection title='Game achievements' category='Game' />
        <AchievesSection title='Participate achievements' category='Participate' />
        <AchievesSection title="Additional rewards" category='Additional' />  
      </ScrollView>
      
      { studentAchieves.length === 0 && isLoading &&
        <ActivityIndicator size="large" color="#fff" />
      }

      <Text style={[screenStyles.gold, styles.summary]}
        onPress={() => setIsSummaryInput(true)}>
          {summaryText === '' ? 'Enter summary' : summaryText}
      </Text>
    </LinearGradient>
  );
};

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
    paddingVertical: 4,
    paddingHorizontal: 16,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {   
    paddingTop: 20,
    paddingBottom: 8
  },
  summary: { 
    marginTop: 'auto', 
    textAlign: 'center',
    paddingBottom: 20
  },
  dialogInput: {
    color: '#eee',
    fontSize: 16,
    padding: 8,
    backgroundColor: '#2E4A7C',
  },
});

export default AchievesScreen;

