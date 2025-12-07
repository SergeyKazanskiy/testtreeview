import { CustomAlert } from '@/src/components/alerts/CustomAlert';
import { CustomNavbar } from '@/src/components/bars/CustomNavbar';
import { screenStyles } from '@/src/styles/appStyles';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useStore } from '../store';
import { CalendarView } from './views/CalendarView';
import { ChartView } from './views/ChartView';
import { DatesView } from './views/DatesView';
import { TableView } from './views/TableView';


type Props = {
  onBack: () => void;
};

export default function StatisticsScreen({ onBack }: Props) {
  const { timestamp, summary } = useStore();
  const { loadStatistics, togleStatistic, setSummary } = useStore();

  useFocusEffect(
    useCallback(() => {
      loadStatistics();
    }, [])
  );

  const [isSummaryInput, setIsSummaryInput] = useState<boolean>(false);
  const [summaryText, setSummaryText] = useState<string>(summary);

  useEffect(() => {
    setSummaryText(summary);
  }, [summary]);

  return (
    <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.wrapper} >
      <CustomNavbar title='Statistics' onClick={onBack}>
        <Pressable style={{ marginRight: 15 }} onPress={togleStatistic} >
          <Ionicons name='repeat-outline' size={21} color="#D1FF4D" />
        </Pressable>
      </CustomNavbar>

      <CustomAlert visible={isSummaryInput} 
        title="Summary for student!"
        buttonText='Save'
        handleYes={() => {setSummary(summaryText); setIsSummaryInput(false)}}
        onClose={() => setIsSummaryInput(false)}>
          <TextInput
              style={styles.dialogInput}
              onChangeText={setSummaryText}
              value={summaryText}
              placeholder="Enter summary"
              keyboardType='default'
          />
      </CustomAlert>

      <View style={{paddingTop: 12}}>
        <CalendarView/>
      </View>

      {timestamp > 0 &&
        <>
          {/* <Text style={styles.metric}>{metricName}</Text> */}
          <ChartView/>
          <DatesView/>
          <TableView/>

          <Text style={[screenStyles.gold, styles.summary]}
            onPress={() => setIsSummaryInput(true)}>
              {summaryText === '' ? 'Enter summary' : summaryText}
          </Text>
        </>
      }
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignSelf: Platform.OS === 'web' ? 'flex-start' : 'stretch',
    maxWidth: Platform.OS === 'web' ? 360 : undefined,
    width: '100%',
    height: '100%',
  },
  navButton: {
    color: '#D1FF4D',
    fontSize: 15,
  },
  metric: {
    color: 'gold',
    fontSize: 15,
    fontWeight: 400,
    left: 26,
    paddingTop: 10
  },
  comment: {
    marginTop: 'auto', 
    textAlign: 'center',
    paddingBottom: 20
  },
  dialogInput: {
    color: '#eee',
    fontSize: 16,
    padding: 8,
    backgroundColor: '#2E4A7C',
  },
  summary: { 
    marginTop: 'auto', 
    textAlign: 'center',
    paddingBottom: 20
  },
});

//<Text style={styles.navButton}>{isTests ? 'Test' : 'Game'}</Text>