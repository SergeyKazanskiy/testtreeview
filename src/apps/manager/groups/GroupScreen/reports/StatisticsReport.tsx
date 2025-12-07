import { PopupContainer } from '@/src/components/containers/PopupContainer';
import { formatDateTime } from '@/src/utils/utils';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { get_group_statistics } from '../../http';
import { Metric, Statistic } from '../../model';
import { useStore } from '../../store';
import { CalendarWidget } from '../widgets/CalendarWidget';
import { StaticticsWidget } from '../widgets/StaticticsWidget';


export const StatisticsReport = () => {
  const { isStatisticsScreen, group_id } = useStore();
  const { hideStatisticsScreen } = useStore();

  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(6);

  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [dates, setDates] = useState<string[]>([]);

  function convertStatisticsToMetrics(statistics: Statistic[]): Metric[] {
      const metrics: Metric[] = [];
      
      for (const test of statistics) {
          const { timestamp, speed, stamina, climbing, evasion, hiding } = test;
          
          metrics.push({ timestamp, name: 'Speed', score: speed, unit:'', time:''});
          metrics.push({ timestamp, name: 'Stamina', score: stamina, unit:'', time:''});
          metrics.push({ timestamp, name: 'Climbing', score: climbing, unit:'', time:''});
          metrics.push({ timestamp, name: 'Evasion', score: evasion, unit:'', time:''});
          metrics.push({ timestamp, name: 'Hiding', score: hiding, unit:'', time:''});
      }
      return metrics;
  }

  useFocusEffect(
    useCallback(() => {
      get_group_statistics(group_id, year, month, (statistics => {
        const dates = statistics.map(el => formatDateTime(el.timestamp).date);
        setDates(dates);

        const metrics = convertStatisticsToMetrics(statistics);
        setMetrics(metrics);
      }));
    }, [year, month])
  );

  return (
    <PopupContainer visible={isStatisticsScreen} title='Group Statistics' onClose={hideStatisticsScreen}>
      <LinearGradient colors={['#2E4A7C', '#152B52']}>
        <CalendarWidget year={year} month={month}
          selectDate={(year, month) => (setYear(year), setMonth(month))}/>

        <ScrollView style={styles.container}>
          <StaticticsWidget dates={dates} metrics={metrics} metricName='Speed'/>
          <StaticticsWidget dates={dates} metrics={metrics} metricName='Stamina'/>
          <StaticticsWidget dates={dates} metrics={metrics} metricName='Climbing'/>
          <StaticticsWidget dates={dates} metrics={metrics} metricName='Evasion'/>
          <StaticticsWidget dates={dates} metrics={metrics} metricName='Hiding'/>
        </ScrollView>
      </LinearGradient>
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
