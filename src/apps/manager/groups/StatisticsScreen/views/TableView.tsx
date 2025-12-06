import { MetricTable } from '@/src/components/widgets/MetricTable';
import { StyleSheet, View } from 'react-native';
import { useStore } from '../../store';


export function TableView() {
  const { timestamp, metrics, metricName } = useStore();
  const { selectMetric } = useStore();

  return (
    <View style={styles.container}>
        <MetricTable
          metricName={metricName}
          metrics={metrics.filter(el => el.timestamp === timestamp)}
          onClick={selectMetric}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8
  },
});

