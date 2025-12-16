import { GroupEventCell } from '@/src/components/cells/GroupEventCell';
import { formatDateTime } from '@/src/utils/utils';
import { FlatList, StyleSheet } from 'react-native';
import { useStore } from '../../store';


export function GroupEventsView() {
  const { group_events } = useStore();

  return (
    <FlatList
      data={group_events}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 24}}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) =>

        <GroupEventCell key={item.id}
          type={item.type}  
          datetime={formatDateTime(item.timestamp).date + ', ' + formatDateTime(item.timestamp).time}
          desc={item.desc}
          amount={item.amound}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  group: {
    backgroundColor: '#152B52',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#216176',
    marginVertical: 3
  },
  title: {
    color: '#ddd',
    fontWeight: '500',
    fontSize: 16
  },
});