import { LineChart } from '@/src/components/widgets/LineChart';
import { formatDateTime } from '@/src/utils/utils';
import { StyleSheet, View } from 'react-native';
import { useStore } from '../../store';


export function ChartView() {
  const {  metricName, timestamps, metrics } = useStore();
  
  function getLabels() {
    const labels = timestamps.map(el => formatDateTime(el).date);
    return labels
  }

  function getValuess() {
    const filtred = metrics.filter(el => el.name === metricName);
    const values = filtred.map(el => el.score);
    return values
  }

  return (
    <View style={styles.container}>
        <LineChart w={326}
          labels={getLabels()}
          values={getValuess()}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    //backgroundColor: 'green'
  },
});

