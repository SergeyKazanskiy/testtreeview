import { DrillCell } from '@/src/components/cells/DrillCell';
import { Icon } from '@/src/components/icons/CustomIcon';
import { ListItem } from '@/src/components/widgets/CustomListItem';
import { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStore } from '../../store';


type Props = {
  onDrill: () => void;
}

export function DrillsView({ onDrill }: Props) {
  const { eventDrills } = useStore();
  const { loadDrill, updateEventDrill } = useStore();

  const [expanded, setExpanded] = useState(false);

  function handleSelect( eventDrill_id: number) {
    loadDrill(eventDrill_id);
    onDrill();
  }

  return (
    <View style={styles.container}>
      <ListItem.Accordion containerStyle={styles.group} isExpanded={expanded} icon={{}}
        content={
          <>
            <Icon name={expanded ? 'chevron-down' : 'chevron-right'}
              type="material-community" color="white" style={{ marginRight: 10 }} />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>Drills</ListItem.Title>
            </ListItem.Content>
          </>
        }
        onPress={() => setExpanded(!expanded)}
      />
      {expanded &&
        <FlatList data={eventDrills}
          contentContainerStyle={{paddingBottom: 24}}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) =>

            <TouchableOpacity onPress={() => handleSelect(item.drill_id)}>
              <DrillCell
                name={item.category + ' ' + item.name}
                time={item.time}
                level={item.level}
                actors={item.actors}
                checked={item.completed}
                onCheck={() => updateEventDrill(item.id, !item.completed)}
              />
            </TouchableOpacity>
          } style={styles.list}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16
  },
  group: {
    backgroundColor: '#152B52',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'green',
    marginVertical: 3
  },
  title: {
    color: '#ddd',
    fontWeight: '500',
    fontSize: 16
  },
  list: {
    borderRadius: 10
  },
});