import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useStore } from '../../store';


type Props = {
  onGroup:() => void;
};

export function GroupsView({ onGroup }: Props) {
  const { groups } = useStore();
  const { selectGroup, showAddGroupAlert, setGroup } = useStore();

  function handleSelect(group_id: number, groupInx: number) {
    selectGroup(group_id, groupInx);
    setGroup(groups[groupInx]);
    onGroup();
  }

  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 100}}
      showsVerticalScrollIndicator={false}
    >
      {groups.map((item, index) => (

        <TouchableOpacity key={item.id}
          style={styles.group}
          onPress={() => handleSelect(item.id, index)}
        >
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </TouchableOpacity>
      ))}

      <Pressable onPress={showAddGroupAlert} style={{ marginTop: 16, marginLeft: 8}}>
        <Ionicons name='add-circle-outline' size={26} color='rgb(180, 216, 158)' />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  group: {
    backgroundColor: '#152B52',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#216176',
    marginVertical: 3,
    padding: 10,
    borderRadius: 4
  },
  title: {
    color: '#ddd',
    fontWeight: '500',
    fontSize: 16,
    paddingBottom: 4
  },
  description: {
    color: '#A7CFF5',
    fontSize: 14,
    fontWeight: 'medium'
  }
});