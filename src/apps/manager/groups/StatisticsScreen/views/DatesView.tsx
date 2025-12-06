import { DatesBar } from '@/src/components/calendar/DatesBar';
import { StyleSheet, View } from 'react-native';
import { useStore } from '../../store';


export function DatesView() {
  const { timestamp, timestamps } = useStore();
  const { selectTimestamp } = useStore();

  return (
    <View style={styles.container}>
        <DatesBar
          timestamp={timestamp}
          timestamps={timestamps}
          onClick={selectTimestamp}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    marginTop: 8,
    marginBottom: 4
  },
});

