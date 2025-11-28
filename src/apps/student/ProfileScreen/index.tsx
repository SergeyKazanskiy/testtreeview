import { useAuthStore } from '@/src/api/store';
import { AlertContainer } from '@/src/components/containers/AlertContainer';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { useStore } from '../store';
import { AvatarsModal } from './components/AvatarsModal';
import { CalendarView } from './views/CalendarView';
import { EventsView } from './views/EventsView';
import { HeaderView } from './views/HeaderView';
import { NotificationsView } from './views/NotificationsView';
import { StatisticView } from './views/StatisticView';


const ProfileScreen = () => {
  const { userId } = useAuthStore();
  const { notificationsAlert, upcoming_events, events, isNotificationsModal, isAvatarsModal } = useStore();
  const { loadStudent, clickAvatar, hideAvatarsModal, deleteNotifications, hideNotificationsModal, hideNotificationsAlert } = useStore();

  useFocusEffect(
    useCallback(() => {
      loadStudent(userId);
    }, [])
  );

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.background} >
      <AlertContainer visible={isNotificationsModal}
        title="Notifications!"
        buttonText='Read'
        handleYes={deleteNotifications}
        onClose={hideNotificationsModal}>
        <NotificationsView/>
      </AlertContainer>

      <AlertContainer visible={isAvatarsModal} 
        title="Chose from selection"
        onClose={hideAvatarsModal}>
        <AvatarsModal onAvatar ={clickAvatar}/>
      </AlertContainer>

      {/* <AlertContainer visible={notificationsAlert.length > 0} 
        title="Push Notifications registration"
        onClose={hideNotificationsAlert}>
        <Text style={[styles.upcomingClass]}>{notificationsAlert}</Text>
      </AlertContainer> */}

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <HeaderView />

        <StatisticView  onLiders={()=>{}}/>
        
        <Text style={[styles.upcomingClass]}>Upcoming class</Text>
        <EventsView events={upcoming_events}/>

        <Text style={[styles.upcomingClass, {marginBottom: 4}]}>Previous class</Text>
        <CalendarView/>
        <EventsView events={events}/>

      </ScrollView>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingBottom: 200
  },
  upcomingClass: {
    marginBottom: 4,
    marginLeft: 21,
    color: '#fff',
    fontSize: 22,
    fontWeight: 400
  }
});

export default ProfileScreen;
