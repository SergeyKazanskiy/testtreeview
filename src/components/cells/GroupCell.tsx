import { cellStyles, groupStyles } from '@/src/styles/appStyles';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export type Props = {
  name: string;
  desc: string;
};
  
export const GroupCell: React.FC<Props> = ({name, desc}) => {
  return (
    <View style={styles.container}>
        <View style={styles.section}>
            <Text style={[groupStyles.title, {marginRight: 10}]}>{name}</Text>
            <Text style={cellStyles.description}>{desc}</Text>
        </View>
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
  section: {
    paddingTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});


