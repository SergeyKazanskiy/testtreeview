import { CustomNavbar } from '@/src/components/bars/CustomNavbar';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React, { useCallback } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { useStore } from '../store';
import { DeleteCoachAlert } from './alerts/DeleteCoachAlert';
import { DeleteGroupAlert } from './alerts/DeleteGroupAlert';
import { ButtonsView } from './views/ButtonsView';
import { FreeGroupsView } from './views/FreeGroupsView';
import { GroupsView } from './views/GroupsView';
import { ProfileView } from './views/ProfileView';
import { SignatureView } from './views/SignatureView';


type Props = {
  onBack: () => void;
};

export default function CoachScreen({ onBack }: Props) {
  const { coach_id, isSignature } = useStore();
  const { loadCoach, showDeleteAlert } = useStore();

  useFocusEffect(
    useCallback(() => {
      loadCoach(coach_id);
    }, [])
  );

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper}>
      <Stack.Screen options={{ headerShown: false }} />

      <CustomNavbar title='Profile' onClick={() => onBack()}>
        <Pressable onPress={showDeleteAlert} style={{ marginRight: 4}}>
          <Ionicons name='trash-outline' size={20} color="rgb(180, 216, 158)" />
        </Pressable>
      </CustomNavbar>

      <DeleteCoachAlert onDelete={() => onBack()}/>
      <DeleteGroupAlert/>

      <ProfileView/>
      <ButtonsView/>

      {isSignature && <SignatureView/>}
      {!isSignature &&  <GroupsView/>}
      
      <FreeGroupsView/>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
    //paddingHorizontal: 16,
  },
  title: {   
    paddingTop: 10,
    alignSelf:'center',
    color: '#eee'
  },
});