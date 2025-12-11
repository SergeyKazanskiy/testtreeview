import { useAuthState } from '@/src/api/state';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback } from 'react';
import { ActivityIndicator, Platform, StyleSheet } from 'react-native';
import { useStore } from '../store';
import { CalendarView } from './views/CalendarView';
import { CampsView } from './views/CampsView';


type Props = {
  onCamp:() => void;
};

export default function CampsScreen({ onCamp }: Props) {
  const { isLoading } = useAuthState();
  const { loadCamps, camps } = useStore();

  useFocusEffect(
    useCallback(() => {
      loadCamps();
    }, [])
  );

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper}>
      <CalendarView/>

      <CampsView onCamp={onCamp} />

      { camps.length === 0 && isLoading &&
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
});