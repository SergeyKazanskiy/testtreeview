import { CustomAlert } from '@/src/components/alerts/CustomAlert';
import { PopupWrapper } from '@/src/components/containers/PopupWrapper';
import { widgetStyles } from '@/src/styles/appStyles';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text } from 'react-native';
import CompetitionsScreen from '../CompetitionsScreen';
import HistoryScreen from '../HistoryScreen';
import { useStore } from '../store';
import { ButtonsView } from './views/ButtonsView';
import { EventsView } from './views/EventsView';
import { TypesView } from './views/TypesView';


type EventsScreenProps = {
  onEvent: () => void;
};

export default function EventsScreen({ onEvent }: EventsScreenProps) {
  const [isPast, setIsPast] = useState(false);
  const [isFuture, setIsFuture] = useState(false);
  const [eventType, setEventType] = useState('Training');

  const { schedule_days, isEventAddAlert } = useStore();
  const { loadGroups, loadSchedules, closeAddAlert, addEvent } = useStore();

  useFocusEffect(
    useCallback(() => {
      loadGroups(2, () => {
        loadSchedules();
      });
    }, [])
  );

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper}>
      <ButtonsView onPast={() => setIsPast(true)} onFuture={()=>setIsFuture(true)}/>

      <PopupWrapper visible={isPast} title='History' onClose={() => setIsPast(false)}>
        <HistoryScreen/>
      </PopupWrapper>

      <PopupWrapper visible={isFuture} title='Competitions' onClose={() => setIsFuture(false)}>
        <CompetitionsScreen/>
      </PopupWrapper>

      <CustomAlert visible={isEventAddAlert} 
        title="Adding an event!"
        buttonText='Save'
        handleYes={() => {addEvent(eventType)}}
        onClose={closeAddAlert}>
          <Text style={{color: 'gold', fontSize: 16, paddingTop: 4}}>Select the type:</Text>
          <TypesView type={eventType} onType={setEventType}/>
      </CustomAlert>

      {schedule_days.length === 0 && <Text style={[widgetStyles.label, styles.title]}>No events</Text>}
      
      {schedule_days.length > 0 && <ScrollView> 
        {schedule_days.map(day => (
          <EventsView key={day.day} day={day.day} weekday={day.weekday} onEvent={onEvent}/>
        ))}
      </ScrollView>}
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
  title: {   
    paddingTop: 60,
    alignSelf:'center'
  },
});