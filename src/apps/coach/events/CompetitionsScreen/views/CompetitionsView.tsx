import { CompetitionCell } from '@/src/components/cells/CompetitionCell';
import { formatDateTime } from '@/src/utils/utils';
import { FlatList, StyleSheet } from 'react-native';
import { useStore } from '../../store';


export function CompetitionsView() {
  const { competitions, groups } = useStore();

  return (
      <FlatList
        data={competitions}
        contentContainerStyle={{paddingBottom: 24}}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) =>

          <CompetitionCell
            date={formatDateTime(item.timestamp).date}  
            time={formatDateTime(item.timestamp).time}
            desc={item.desc}
            group1={groups.find(el => el.id === item.group1_id)!}
            onGroup={(group_id) => {}}
            group2={groups.find(el => el.id === item.group2_id)}
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
    borderColor: 'green',
    marginVertical: 3
  },
  title: {
    color: '#ddd',
    fontWeight: '500',
    fontSize: 16
  },
});