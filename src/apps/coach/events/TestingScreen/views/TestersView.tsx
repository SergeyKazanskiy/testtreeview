import { TesterCell } from '@/src/components/cells/TesterCell';
import { MeasureUnits } from '@/src/constants/constants';
import { formatSeconds, formatSecondsWithMilli } from '@/src/utils/utils';
import React from "react";
import { FlatList, ScrollView, StyleSheet } from "react-native";
import { Tester } from "../../model";
import { useStore } from '../../store';


export const TestersView = () => { 
  const { testers, exam, onTesterCheck, onTesterClick } = useStore();
  
  function getValue(item: Tester, exam: string) {
    let value: string = ''

    if (exam === 'speed') value = item.speed + ' (' + formatSeconds(item.speed_time) + MeasureUnits['Speed'] + ')'
    if (exam === 'stamina') value = item.stamina + ' (' + formatSecondsWithMilli(item.stamina_time) + ')'
    if (exam === 'climbing') value = item.climbing + ' (' + formatSeconds(item.climbing_time) + MeasureUnits['Climbing'] + ')'
    if (exam === 'evasion') value = item.evasion + ' (' + MeasureUnits['Evasion'] + ')'
    if (exam === 'hiding') value = item.hiding + ' (' + MeasureUnits['Hiding'] + ')'
    return value
  }

  return (
    <ScrollView style={styles.container}>
      <FlatList data={testers} 
        keyExtractor={(index) => index.toString()}
        renderItem={({ item }) =>
          <TesterCell
            checked={item.participate}
            onCheck={() => onTesterCheck(item.id)}
            name={`${item.first_name} ${item.last_name}`}
            value={getValue(item, exam)}
            onClick={() => onTesterClick(item.id)}
          />
        }/>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 0,
  },
  item: {
    marginVertical: 4
  },
  itemSelected: {
    marginVertical: 4,
    backgroundColor: "#555"
  },
});
