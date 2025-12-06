import { CustomNavbar } from '@/src/components/bars/CustomNavbar';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useStore } from '../store';
import { AddStudentAlert } from './alerts/AddStudentAlert';
import { StudentsView } from './views/StudentsView';


type Props = {
  onStudent: () => void;
};

export default function StudentsScreen({ onStudent }: Props) {
  const { group_id, groups } = useStore();
  const { loadStudents, clearStudents, showAddAlert } = useStore();

  const group = groups.find(el => el.id === group_id)
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      loadStudents(group_id);
    }, [])
  );

  function handleBack() {
    //router.navigate('/dashboards/manager/groups/GroupScreen');
    router.back();
    clearStudents();
  }

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <Stack.Screen options={{ headerShown: false }} />
      <CustomNavbar title={ group?.name || 'Group'} onClick={handleBack}>
        <Ionicons name='add-circle-outline' size={21} color="#D1FF4D" onPress={showAddAlert}/>
      </CustomNavbar>

      <AddStudentAlert/>

      <StudentsView onStudent={onStudent} />
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
});