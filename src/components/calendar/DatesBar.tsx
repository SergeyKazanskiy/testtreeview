import { formatDateTime } from '@/src/utils/utils';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';


interface Props {
    timestamp: number
    timestamps: number[];
    onClick: (timestamps: number) => void;
}

export function DatesBar({ timestamp, timestamps, onClick }: Props) {
  return (
    <FlatList horizontal
      data={timestamps}
      contentContainerStyle={{ justifyContent: 'space-around', alignItems: 'center', flexGrow: 1}}
      keyExtractor={(item) => '№' + item}
      renderItem={({ item }) => 
        
          <TouchableOpacity style={item === timestamp ? styles.selectedItem : styles.item}
              onPress={() => onClick(item)} >

              <Text style={styles.text}>{formatDateTime(item).date}</Text>
          </TouchableOpacity>
      } style={styles.list} />
  );
};

const styles = StyleSheet.create({
  item: {
    borderWidth: 1,
    borderColor: 'yellow',
    borderRadius: 8,
    backgroundColor: 'rgba(58, 46, 159, 0.3)',
  },
  selectedItem: {
    borderWidth: 1,
    borderColor: 'yellow',
    borderRadius: 8,
    backgroundColor: 'green',
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    color: 'gold', // blue.500
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  list: {
    paddingVertical: 6,
  },
});
