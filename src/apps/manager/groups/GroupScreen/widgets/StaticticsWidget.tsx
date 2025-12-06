import { LineChart } from '@/src/components/widgets/LineChart';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Metric } from '../../model';


export type Props = {
    metrics: Metric[];
    metricName: string;
    dates: string[];
};

export const StaticticsWidget: React.FC<Props> = ({ metrics, metricName, dates }) => {  
  
    function getValues() {
        const filtred = metrics.filter(el => el.name === metricName);
        const values = filtred.map(el => el.score);
        return values
    }

    return (
        <>
            <Text style={styles.title}>{metricName}</Text>

            <LineChart w={326} h={160}
                labels={dates}
                values={getValues()}
            />
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        color: '#eee',
        fontSize: 16,
        fontWeight: '500',
        paddingTop: 28,
        paddingBottom: 8
    }
});
