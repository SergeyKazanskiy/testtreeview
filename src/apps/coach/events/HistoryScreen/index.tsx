import { useAuthState } from '@/src/api/state';
import { useAuthStore } from '@/src/api/store';
import { widgetStyles } from '@/src/styles/appStyles';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback } from 'react';
import { ActivityIndicator, Platform, ScrollView, StyleSheet, Text } from 'react-native';
import { useStore } from '../store';
import { CalendarView } from './views/CalendarView';
import { GroupEventsView } from './views/GroupEventsView';
import { WeekEventsView } from './views/WeekEventsView';


export default function HistoryScreen() {
  const { isLoading } = useAuthState();
  const { userId } = useAuthStore();

  const { isWeekFilter, days, groups, group_inx } = useStore();
  const { loadGroups, selectGroup } = useStore();
  
  useFocusEffect(
    useCallback(() => {
      loadGroups(userId, () => {});
    }, [])
  );

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper}>
       <CalendarView/>

      {isWeekFilter &&
        <>
          {days.length === 0 && <Text style={[widgetStyles.label, styles.title]}>No events</Text>}
          
          {days.length > 0 &&
          <ScrollView> 
            {days.map(day => (
              <WeekEventsView key={day.day} day={day.day} weekday={day.weekday}/>
            ))}
          </ScrollView>}
        </>
      }
      {!isWeekFilter && <GroupEventsView/>}

      { groups.length === 0  && isLoading &&
        <ActivityIndicator size="large" color="#fff" />
      }
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
  section: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  title: {   
    paddingTop: 60,
    alignSelf:'center'
  },
});