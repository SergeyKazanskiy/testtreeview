import { formatDateTime } from '@/src/utils/utils';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Event } from "../../model";
import { EventCell } from '../components/EventCell';


interface Props {
  events: Event[];
}

export const EventsView = ({ events }: Props) => {
  return (
    <View style={styles.container}>
      {events.length === 0 && 
        <View style={styles.center}>
          <Text style={styles.text}>No events</Text>
        </View>
      }     
      {events.length > 0 &&
        events.map((item, index) => {
          const time2 = item.timestamp + item.duration

          return (
            <EventCell
              key={'№' + index}
              isSelected={false}
              date={formatDateTime(item.timestamp).date}
              time={formatDateTime(item.timestamp).time + ' - ' + formatDateTime(time2).time}
              desc={item.desc}
            />
          )
        })
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 88,
    borderBottomWidth: 1,
    borderBottomColor: '#6F6F6F',
    marginBottom: 20
  },
  center: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', 
    padding: 16,
    flex: 1 
  },
  text: {
    paddingLeft: 6,
    color: '#D1FF4D',
    fontSize: 17,
    fontWeight: 500
  },
});
