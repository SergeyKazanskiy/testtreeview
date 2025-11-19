import { useAuthStore } from '@/src/api/store';
import { AlertContainer } from '@/src/components/containers/AlertContainer';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text } from 'react-native';
import { CalendarView } from '../EventsScreen/views/CalendarView';
import { EventsView as EventsView2 } from '../EventsScreen/views/EventsView';
import { useStore } from '../store';
import { AvatarsModal } from './components/AvatarsModal';
import { EventsView } from './views/EventsView';
import { HeaderView } from './views/HeaderView';
import { NotificationsView } from './views/NotificationsView';
import { StatisticView } from './views/StatisticView';


const ProfileScreen = () => {
  const { notificationsAlert, last_test, last_game, isNotificationsModal, isAvatarsModal } = useStore();

  const { loadStudent, clickAvatar, hideAvatarsModal, deleteNotifications } = useStore();
  const { loadTest, loadGame, loadEvent, setBackDrawer, hideNotificationsModal, hideNotificationsAlert } = useStore();
  
  const [showHeaderButton, setShowHeaderButton] = useState(false);
  const { userId } = useAuthStore();
  //alert(userId)
  const navigation = useNavigation();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadStudent(userId);
    }, [])
  );

  // const handleClickAchievement = (achievement_id: number) => {
  //   setShowHeaderButton(true);
  //   clickAchievement(achievement_id);

  //   setTimeout(() => {
  //     setShowHeaderButton(false);
  //   }, 3000);
  // };

  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showHeaderButton) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5, // Параметры пружины
        tension: 100,
      }).start();
    } else {
      scaleAnim.setValue(0); // Сброс масштаба обратно
    }
  }, [showHeaderButton]);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => 
  //       showHeaderButton ? (
  //         <Animated.View style={{ marginRight: 15, transform: [{ scale: scaleAnim }] }}>
  //           <Pressable onPress={detachAchievement} >
  //             <Ionicons name='trash-outline' size={24} color="red" />
  //           </Pressable>
  //         </Animated.View>
  //       ): null,
  //   });
  // }, [navigation, showHeaderButton]);
  
  // const openAchievesScreen = () => {
  //   showAchievesModal()
  //   router.push("/dashboards/student/AchievesScreen");
  // };

  // const openTestStatistic = (metric: string) => {
  //   const metricName = metric.charAt(0).toUpperCase() + metric.slice(1);
  //   loadTest(last_test.timestamp || 0, metricName);
  //   router.push("/dashboards/student/StatisticsScreen");
  //   setBackDrawer(false);
  // }
  
  // const openGameStatistic = (metric: string) => {
  //   loadGame(last_game.timestamp || 0, metric);
  //   router.push("/dashboards/student/StatisticsScreen");
  //   setBackDrawer(false);
  // }

  // const openEventsScreen = (event_id: number, timestamp: number) => {
  //   loadEvent(event_id, timestamp);
  //   router.push("/dashboards/student/EventsScreen");
  //   setBackDrawer(false);
  // }

  // const openLidersScreen = () => {
  //   router.push("/dashboards/student/LidersScreen");
  //   setBackDrawer(false);
  // }

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

      <AlertContainer visible={notificationsAlert.length > 0} 
        title="Push Notifications registration"
        onClose={hideNotificationsAlert}>
        <Text style={[styles.upcomingClass]}>{notificationsAlert}</Text>
      </AlertContainer>

      <ScrollView style={styles.container}>
        <HeaderView />

        <StatisticView
            onExam={()=>{}}
            onGame={()=>{}}
            onLiders={()=>{}}
        />
        <Text style={[styles.upcomingClass]}>Upcoming class</Text>
        
        <EventsView onClick={()=>{}}/>

        <Text style={[styles.upcomingClass, {marginBottom: 4}]}>Previous class</Text>
        <CalendarView/>
        <EventsView2 onClick={()=>{}}/>
      </ScrollView>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    //paddingTop: 16,
  },
  container: {
    flex: 1,
    paddingBottom: 100
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
