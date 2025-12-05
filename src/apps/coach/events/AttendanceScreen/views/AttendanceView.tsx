import { CustomAlert } from '@/src/components/alerts/CustomAlert';
import { AttendanceCell } from '@/src/components/cells/AttendanceCell';
import { useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text } from "react-native";
import { useStore as useStudentsStore } from '../../../groups/store';
import { useStore } from '../../store';


type Props = {
  onStudent: () => void;
};

export const AttendanceView = ({ onStudent }: Props) => { 
  const { attendances, event_timestamp } = useStore();
  const { checkStudent, updateComment } = useStore();
  const { selectStudent } = useStudentsStore();

  const [isUpdateAlert, setIsUpdateAlert] = useState<boolean>(false);

  function handleCheckStudent(id: number) {
      checkStudent(id);
  }
  
    function handleSelect(id: number) {
      selectStudent(id);
      onStudent();
    }

  return (
    <>
      <CustomAlert visible={isUpdateAlert}  title="Attention!"
        onClose={() => setIsUpdateAlert(false)}>
        <Text style={{color:'#ddd'}}>It is not possible to change attendance in the past</Text>
      </CustomAlert>

      <ScrollView style={styles.container}>
        <FlatList data={attendances} 
            keyExtractor={(index) => index.toString()}
            renderItem={({ item, index }) =>
              <AttendanceCell
                first_name={item.first_name}
                last_name={item.last_name}
                checked={item.present}
                onCheck={() => handleCheckStudent(item.id)}
                comment={item.comment ?? ""}
                onUpdate={(comment) => updateComment(item.id, comment)}
                onSelect={()=>handleSelect(item.student_id)}
              />
        }/>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    //marginTop: 60,
  },
  item: {
    marginVertical: 4
  },
  itemSelected: {
    marginVertical: 4,
    backgroundColor: "#555"
  },
});
