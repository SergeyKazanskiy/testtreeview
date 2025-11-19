import { widgetStyles } from '@/src/styles/appStyles';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export type Props = {
  label: string;
  value: string;
};
  
export const AddressCell: React.FC<Props> = ({label, value}) => {
  return (
    <View style={styles.container}>
        <Text style={[widgetStyles.label, styles.address]}>{label}</Text>
        <Text style={widgetStyles.input}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 6,
    paddingLeft: 4,
    width: '100%'
  },
  address: {
    width: 80
  },
});

