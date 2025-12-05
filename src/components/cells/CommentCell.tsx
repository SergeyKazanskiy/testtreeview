import { cellStyles } from '@/src/styles/appStyles';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export type Props = {
  date: string;
  comment: string;
};
  
export const CommentCell: React.FC<Props> = ({date, comment}) => {
  return (
    <View style={styles.container}>
      <Text style={[cellStyles.date, {alignSelf: 'flex-start'}]}>{date}</Text>
      <Text style={[cellStyles.description, {marginTop: 10}]}>{comment}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'rgba(45, 75, 10, 0.3)',
    borderWidth: 1,
    borderColor: 'rgb(110, 151, 6)',
    marginVertical: 6
  },
});
