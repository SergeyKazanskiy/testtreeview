import { Button } from '@/src/components/buttons/CustomButton';
import { StyleSheet, Text, View } from 'react-native';


interface Props {
  onPast: () => void;
  onFuture: () => void;
}

export function ButtonsView({onPast, onFuture}: Props) {
  return (
    <View style= {styles.container}>
      <Button title='History' type='outline' 
        buttonStyle={styles.button} titleStyle={styles.title}
        onPress={onPast}
      />

      <Text style={styles.schedule}>Schedule</Text>

      <Button title='Future' type='outline' 
        buttonStyle={styles.button} titleStyle={styles.title}
        onPress={onFuture}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 6,
  },
  schedule: {
    color: 'gold',
    fontSize: 22
  },
  button: {
    height: 32,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  title: {
    fontSize: 14,
    color: '#ddd'
  },
});
