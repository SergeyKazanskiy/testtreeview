import { Button } from '@/src/components/buttons/CustomButton';
import { PopupContainer } from '@/src/components/containers/PopupContainer';
import { Icon } from '@/src/components/icons/CustomIcon';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Student } from '../../model';
import { useStore } from '../../store';

const COLUMN_HEIGHT = 5;


export function AddingPopup() {
  const { isAddingPopup, students, players, selectedStudentIds } = useStore();
  const { hideAddingPopup, selectStudent, addPlayers, showAddNewDialog } = useStore();

  const columns: Student[][] = [];
  const playersIds = players.map(el => (el.id))
  const availables = students.filter(el => !playersIds.includes(el.id))

  for (let i = 0; i < availables.length; i += COLUMN_HEIGHT) {
    columns.push(availables.slice(i, i + COLUMN_HEIGHT));
  }

  return (
     <PopupContainer visible={isAddingPopup}>

      <View style={styles.header}>
        <Text style={styles.title}>  </Text>
        <Text style={styles.title}>'Choose players to add'</Text>
        <Icon size={20} color="#D1FF4D" name="close" onPress={hideAddingPopup} />
      </View>

      {columns.length === 0 && <Text style={styles.title}>No available students</Text>}

      <ScrollView horizontal contentContainerStyle={styles.rowScroll} showsHorizontalScrollIndicator={false}>
        {columns.map((column, colIndex) => (

          <View key={colIndex} style={styles.column}>
            {column.map((student) => {
              const isSelected = selectedStudentIds.includes(student.id);

              return (
                <Pressable key={student.id}
                  style={[styles.cell, { backgroundColor: isSelected ?  '#D1FF4D' : 'white'}]}
                  onPress={() => selectStudent(student.id)}
                >
                  <View style={styles.cellContent}>
                    <Text style={styles.playerName}>
                      {student.last_name} {student.first_name[0]} | {student.age}
                    </Text>
                    <Icon name="check-circle" size={20} color='#222'/>
                  </View>
                </Pressable>
              );
            })}
          </View>
        ))}
      </ScrollView>

      <View style={styles.buttonRow}>
        <Button title="ADD NEW PLAYER" buttonStyle={styles.greyBtn} titleStyle={{color:'#222'}}
          onPress={() => (hideAddingPopup(), showAddNewDialog())}
        />
        <Button title="ADD PLAYERS" buttonStyle={styles.greenBtn} titleStyle={{color:'#eee'}}
          onPress={() => (addPlayers(), hideAddingPopup())}
        />
      </View>
    </PopupContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 5,
    padding: 20
  },
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  rowScroll: {
    paddingBottom: 16,
  },
  column: {
    marginHorizontal: 8,
  },
  cell: {
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    width: 180,
    justifyContent: 'center',
  },
  cellContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerName: {
    color: '#222',
    flexShrink: 1,
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 4,
    margin: 12,
  },
  greenBtn: {
    backgroundColor: '#22c55e',
    borderRadius: 24,
    paddingHorizontal: 20,
  },
  greyBtn: {
    backgroundColor: '#d1d5db',
    borderRadius: 24,
    paddingHorizontal: 20,
  },
});