import { useAuthState } from '@/src/api/state';
import { CustomNavbar } from '@/src/components/bars/CustomNavbar';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React, { useCallback } from 'react';
import { ActivityIndicator, Platform, StyleSheet } from 'react-native';
import { useStore } from '../store';
import { AddStudentAlert } from './alerts/AddStudentAlert';
import { StudentsView } from './views/StudentsView';


type Props = {
  onStudent: () => void;
  onBack: () => void;
};

export default function StudentsScreen({ onStudent, onBack }: Props) {
  const { isLoading } = useAuthState();

  const { group_id, groups, students } = useStore();
  const { loadStudents, clearStudents, showAddAlert } = useStore();

  const group = groups.find(el => el.id === group_id)

  useFocusEffect(
    useCallback(() => {
      loadStudents(group_id);
    }, [])
  );

  function handleBack() {
    onBack();
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
      
      { (groups.length === 0 || students.length === 0) && isLoading &&
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
  },
});