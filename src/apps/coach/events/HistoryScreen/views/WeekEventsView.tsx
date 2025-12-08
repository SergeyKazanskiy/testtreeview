import { CoachEventCell } from '@/src/components/cells/CoachEventCell';
import { Icon } from '@/src/components/icons/CustomIcon';
import { ListItem } from '@/src/components/widgets/CustomListItem';
import { formatDateTime } from '@/src/utils/utils';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useStore } from '../../store';


export function WeekEventsView({ day,  weekday }: {day: number, weekday: string}) {
  const [expanded, setExpanded] = useState(false);
  const { events, groups } = useStore();
 
  const dayEvents = events.filter(el => el.day === day);

  function handlePress(event_id: number, group_id: number) {
  }

  return (
    <>
        <ListItem.Accordion containerStyle={styles.group} isExpanded={expanded} icon={{}}
          content={
            <>
              <Icon name={expanded ? 'chevron-down' : 'chevron-right'}
                type="material-community" color="white" style={{ marginRight: 10 }} />
              <ListItem.Content>
                <ListItem.Title style={styles.title}>{day}. {weekday}</ListItem.Title>
              </ListItem.Content>
            </>
          }
          onPress={() => setExpanded(!expanded)}
        />
      {expanded &&
        <>
          {dayEvents.map(item => (

              <CoachEventCell key={item.id}
                type={item.type}  
                time={formatDateTime(item.timestamp).time}
                desc={item.desc}
                group1={groups.find(el => el.id === item.group1_id)!}
                onGroup={(group_id) => handlePress(item.id, group_id)}
                group2={groups.find(el => el.id === item.group2_id)}
              />
            ))}
          </>
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