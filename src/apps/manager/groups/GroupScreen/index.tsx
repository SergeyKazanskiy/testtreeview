import { CustomNavbar } from '@/src/components/bars/CustomNavbar';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useStore } from '../store';
import { DeleteGroupAlert } from './alerts/DeleteGroupAlert';
import { AchievesReport } from './reports/AchievesReport';
import { StatisticsReport } from './reports/StatisticsReport';
import { ButtonsView } from './views/ButtonsView';
import { InfoView } from './views/InfoView';
import { SchedulesView } from './views/SchedulesView';
import { TimeView } from './views/TimeView';


export default function GroupScreen() {
  const { camp_id, group_id, isTimeMenu } = useStore();
  const { loadSchedule, showDeleteGroupAlert, loadCoaches } = useStore();
  const { showAchievesScreen, showStatisticsScreen } = useStore();

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadCoaches(camp_id);
      loadSchedule(group_id);
    }, [])
  );

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <Stack.Screen options={{ headerShown: false }} />

      <CustomNavbar title='Group info' onClick={() => router.back()}>
        <Pressable onPress={showDeleteGroupAlert} style={{ marginRight: 4}}>
          <Ionicons name='trash-outline' size={20} color="rgb(180, 216, 158)" />
        </Pressable>
      </CustomNavbar>

      <DeleteGroupAlert onDelete={() => router.back()}/>

      <InfoView/>

      <Text style={styles.title}>Schedule</Text>
      <View style={styles.widget}>
        {isTimeMenu ? <TimeView/> : <SchedulesView/>}
      </View>
      
      <ButtonsView
        onStudents={() => router.push(`/dashboards/manager/groups/StudentsScreen`)}
        onStatistics={showStatisticsScreen}
        onAchievemens={showAchievesScreen}
      />
      
      <AchievesReport/>
      <StatisticsReport/>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
  },
  title: {
    color: 'gold',
    fontSize: 18,
    marginLeft: 16,
  },
  widget: {
    borderColor: '#2089dc',
    borderWidth: 1,
    borderRadius: 8,
    margin: 12
  },
});