import { CommentCell } from '@/src/components/cells/CommentCell';
import { months } from '@/src/constants/constants';
import { getDayAndWeekday, getYearAndMonth } from '@/src/utils/utils';
import { FlatList, StyleSheet } from 'react-native';
import { useStore } from '../../store';


export function CommentsView() {
  const { comments } = useStore();

  function getDate(timestamp: number) {
    const {year, month} = getYearAndMonth(timestamp);

    return getDayAndWeekday(timestamp).day + ' ' +  months[month - 1] + ' ' + year 
  }
  
  return (
      <FlatList
        data={comments}
        contentContainerStyle={{paddingBottom: 24}}
        keyExtractor={(index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => 

          <CommentCell
            date={getDate(item.timestamp)}  
            comment={item.comment}
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