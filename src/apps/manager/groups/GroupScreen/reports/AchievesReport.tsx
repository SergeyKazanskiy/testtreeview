import { PopupContainer } from '@/src/components/containers/PopupContainer';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { get_group_achieves } from '../../http';
import { Achieve } from '../../model';
import { useStore } from '../../store';
import { AchievesWidget } from '../widgets/AchievesWidget';


export const AchievesReport = () => {
  const { isAchievesScreen, group_id } = useStore();
  const { hideAchievesScreen } = useStore();

  const [achieves, setAchieves] = useState<Achieve[]>([]);
  const [summary, setSummary] = useState(0);

  useFocusEffect(
    useCallback(() => {
      get_group_achieves(group_id, (achieves => {
        setAchieves(achieves);
        setSummary(achieves.reduce((sum, item) => sum + (item.count ?? 0), 0))
      }));
    }, [])
  );

  return (
    <PopupContainer visible={isAchievesScreen} title='Group Achievements' onClose={hideAchievesScreen}>
      <ScrollView style={{backgroundColor: '#152B52'}}>
        <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.container}>
          
          <AchievesWidget title='Test achievements' achieves={achieves} category='Test' />
          <AchievesWidget title='Game achievements' achieves={achieves} category='Game' />
          <AchievesWidget title='Participate achievements' achieves={achieves} category='Participate' />

          <Text style={styles.summary}>Total achievements: 
            <Text style={styles.text}>{summary}</Text>
          </Text>
         
        </LinearGradient>
      </ScrollView> 
    </PopupContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  summary: {
    color: '#ddd',
    fontSize: 16,
    fontWeight: 'medium',
    marginTop: 40, 
    textAlign: 'left',
  },
  text: {
    color: 'gold',
    fontSize: 20,
    fontWeight: 'medium',
    paddingLeft: 8
  },
});