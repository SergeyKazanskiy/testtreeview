import { Group } from '@/src/apps/coach/groups/model';
import { Button } from '@/src/components/buttons/CustomButton';
import { cellStyles } from '@/src/styles/appStyles';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export type Props = {
  type: string;
  time: string;
  desc: string;
  group1: Group;
  onGroup:(id: number, group_number: number) => void;
  group2?: Group;
};
  
export const CoachEventCell: React.FC<Props> = ({type, time, desc, group1, onGroup, group2}) => {
  return (
    <View style={styles.container}>
      <View  style={[styles.column, styles.column_left]}>
        {type === 'Training' && <Text style={styles.icon}>❤️</Text>}
        {type === 'Exam' && <Text style={styles.icon}>🥇</Text>}
        {type === 'Game' && <Text style={styles.icon}>🏆</Text>}
        <Text style={[cellStyles.type, {marginTop: 4}]}>{type}</Text>
      </View>

      <View style={[styles.column, {width: '80%', paddingLeft: 8}]}>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Button title={group1.name} type='outline' 
              buttonStyle={styles.button} titleStyle={styles.title}
              onPress={() => onGroup(group1.id, 1)}
            />
            {group2 && <Button title={group2.name} type='outline' 
              buttonStyle={styles.button} titleStyle={styles.title}
              onPress={() => onGroup(group2.id, 2)}
            />}
          </View>
          
          <Text style={[styles.camp, {padding: 4}]}>{group1.camp_name}</Text>
        </View>

        <View style={styles.section}>
          <Text style={[cellStyles.description, {marginTop: 8}]}>{desc}</Text>
          <Text style={[cellStyles.date, {paddingRight: 4, marginTop: 6}]}>{time}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 10,
    paddingLeft: 0,
    backgroundColor: 'rgba(45, 75, 10, 0.3)',
    borderWidth: 1,
    borderColor: 'rgb(110, 151, 6)',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 4
  },
  column: {
    flexDirection: 'column',
  },
  column_left: {
    paddingTop: 4,
     width: '20%',
     borderRightWidth: 1,
     borderColor:'rgb(110, 151, 6)',
     alignItems: 'center'
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    fontSize: 20,
  },
  desc: {
    flexDirection: 'row',
  },
  button: {
    height: 32,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  title: {
    fontSize: 14,
    color: 'gold'
  },
  camp: {
    fontSize: 16,
    color: '#ddd'
  },
});

