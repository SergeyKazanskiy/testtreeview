import { AttendanceCell } from '@/src/components/cells/AttendanceCell';
import { DrillCell } from '@/src/components/cells/DrillCell';
import { PopupContainer } from '@/src/components/containers/PopupContainer';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { get_attendances, get_event_drills } from '../../http';
import { Attendance, ShortDrill } from '../../model';
import { useStore } from '../../store';


export const AttendanceReport = () => { 
  const { isAttendanceReport, event_id, attendance_group_id } = useStore();
  const { hideAttendanceReport } = useStore();

  const [drills, setDrills] = useState<ShortDrill[]>([]);
  const [attendances, setAttendances] = useState<Attendance[]>([]);


  useFocusEffect(
    useCallback(() => {
      get_event_drills(event_id, (drills => {
        setDrills(drills);
      }));

      get_attendances(event_id, attendance_group_id, (attendances => {
        setAttendances(attendances);
      }));
    }, [])
  );

  return (
    <PopupContainer visible={isAttendanceReport} title='Attendance report' onClose={hideAttendanceReport}>
      <ScrollView
        contentContainerStyle={{backgroundColor: '#152B52'}}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient colors={['#2E4A7C', '#152B52']} style={styles.container}>
        <Text style={styles.title}>Drills</Text>
        {drills.map((item) => (
          <DrillCell
            key={item.id}
            name={item.category + ' ' + item.name}
            time={item.time}
            level={item.level}
            actors={item.actors}
            checked={item.completed}
            onCheck={() => {}}
          />
        ))}

        <Text style={styles.title}>Students</Text>
        {attendances.map((item) => (
          <AttendanceCell
            key={item.id}
            first_name={item.first_name}
            last_name={item.last_name}
            checked={item.present}
            onCheck={() => {}}
            comment={item.comment ?? ""}
            onUpdate={() => {}}
            onSelect={()=>{}}
          />
        ))}
        </LinearGradient>
      </ScrollView>
    </PopupContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  title: {
    color: '#ddd',
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 8,
  },
  item: {
    marginVertical: 4
  },
  itemSelected: {
    marginVertical: 4,
    backgroundColor: "#555"
  },
});
