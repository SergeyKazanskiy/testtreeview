import { CoachEventCell } from '@/src/components/cells/CoachEventCell';
import { Icon } from '@/src/components/icons/CustomIcon';
import { ListItem } from '@/src/components/widgets/CustomListItem';
import { formatDateTime } from '@/src/utils/utils';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useStore } from '../../store';


type EventsViewProps = {
  onEvent: () => void;
  day: number;
  weekday: string; 
};

export function EventsView({ onEvent, day, weekday }: EventsViewProps) {
  const [expanded, setExpanded] = useState(false);

  const { events_shedules, groups } = useStore();
  const { openAddAlert, selectEvent } = useStore();

  //alert(objectToJson(events_shedules))
  const dayEvents = events_shedules.filter(el => el.day === day);
  const router = useRouter();

  function handlePressGroup( event_id: number, group_id: number, timestamp: number, group_number: number) {
    selectEvent(event_id, group_id, timestamp, group_number);
    
    if (event_id === 0) {
      openAddAlert(group_id, timestamp);
    } else {
      onEvent();
    }
  }

  return (
    <>
        <ListItem.Accordion containerStyle={styles.group} isExpanded={expanded} icon={{}}
          content={
            <>
              <Icon name={expanded ? 'chevron-down' : 'chevron-right'}
                type="material-community" color="white" style={{ marginRight: 10 }} />
              <ListItem.Content>
                <ListItem.Title style={styles.title}>{weekday}</ListItem.Title>
              </ListItem.Content>
            </>
          }
          onPress={() => setExpanded(!expanded)}
        />
      {expanded &&
        <FlatList
          data={dayEvents}
          contentContainerStyle={{paddingBottom: 24}}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.timestamp.toString()}
          renderItem={({ item }) =>

            <View style={item.id === 0 && { opacity: 0.6}}>
              <CoachEventCell
                type={item.type}  
                time={formatDateTime(item.timestamp).time}
                desc={item.desc}
                group1={groups.find(el => el.id === item.group1_id)!}
                onGroup={(group_id, group_number) => handlePressGroup(item.id, group_id, item.timestamp, group_number)}
                group2={groups.find(el => el.id === item.group2_id)}
              />
            </View>
          }
        />
      }
    </>
  );
}

const styles = StyleSheet.create({
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
});