import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useStore } from '../../store';


export function GroupsView() {
  const { coachGroups, coach_group_id } = useStore();
  const { selectGroup, loadFreeGroups } = useStore();

  return (
    <View style={styles.container}>
      {coachGroups.map((item) => (
        
        <TouchableOpacity
          key={item.id}
          style={[styles.group, item.id === coach_group_id && styles.selected ]}
          onPress={() => selectGroup(item.id)}>

            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>{item.desc}</Text>
        </TouchableOpacity>
      ))}
      
      
      <Pressable onPress={loadFreeGroups} style={{ marginLeft: 6, marginTop: 18}}>
          <Ionicons name='add-circle-outline' size={26} color='rgb(180, 216, 158)' />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  group: {
    backgroundColor: '#152B52',
    borderWidth: 1,
    borderColor: '#152B52',
    marginVertical: 3,
    padding: 10,
    borderRadius: 8
  },
  sections: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  list: {
    marginTop: 8
  },
  title: {
    color: '#ddd',
    fontWeight: '500',
    fontSize: 15,
    paddingBottom: 8
  },
  description: {
    color: '#A7CFF5',
    fontSize: 14,
    fontWeight: 'medium'
  },
  selected: {
    borderColor: '#ddd',
  },
  button: {
    height: 28,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  text: {
      fontSize: 16,
      color: 'gold'
  },
});