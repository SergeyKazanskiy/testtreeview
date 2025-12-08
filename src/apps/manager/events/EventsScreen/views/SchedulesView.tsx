import { ScheduleEventCell } from '@/src/components/cells/ScheduleEventCell';
import { Icon } from '@/src/components/icons/CustomIcon';
import { ListItem } from '@/src/components/widgets/CustomListItem';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useStore } from '../../store';


export function SchedulesView({ day, weekday }: {day: number, weekday: string}) {
  const [expanded, setExpanded] = useState(false);

  const { filtredSchedules, groups } = useStore();
  const { showCoachesView } = useStore();

  const dayEvents = filtredSchedules.filter(el => el.weekday === day);

  return (
    <View style={styles.container}>
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
        <>
          {dayEvents.map(item => (
              <TouchableOpacity key={item.id}
                style={item.id === 0 && { opacity: 0.6}}
                onPress={() => showCoachesView(item.id)}
              >
                <ScheduleEventCell
                  group={groups.find(el => el.id === item.group_id)?.name || ''}
                  time={item.hour + ':' + item.minute + ' - ' + (item.hour + 1) + ':' + item.minute }
                  coach={item.coach_name}
                />  
              </TouchableOpacity>
            ))}
          </>
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  group: {
    backgroundColor: '#152B52',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'green',
    marginVertical: 3
  },
  title: { color: '#ddd', fontWeight: '500', fontSize: 16 },
});