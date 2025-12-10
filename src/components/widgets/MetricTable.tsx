import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export interface Metric {
  timestamp: number;
  name: string;
  score: number;
  unit: string;
  time: string;
};

interface Props {
    metricName: string;
    metrics: Metric[];
    onClick: (name: string) => void;
}

export function MetricTable({ metricName, metrics, onClick }: Props) {
  return (
    <View style={styles.container}>
        <View style={styles.tableHeader}>
            <Text style={styles.tableCol}>Metric</Text>
            <Text style={styles.tableCol}>Score</Text>
            <Text style={styles.tableCol}>Time</Text>
            <Text style={styles.tableCol}>Unit</Text>
        </View>

        {metrics.map((item) => (
            <TouchableOpacity key={item.name}
                style={[styles.tableRow, item.name === metricName && styles.selectedRow]}
                onPress={() => onClick(item.name)} >

                <Text style={styles.tableCol1}>{item.name}</Text>
                <Text style={styles.tableCol2}>{item.score}</Text>
                <Text style={styles.tableCol3}>{item.time}</Text>
                <Text style={styles.tableCol3}>{item.unit}</Text>
            </TouchableOpacity>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(54, 72, 32, 0.3)',
        borderRadius: 8,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: 'rgb(110, 151, 6)',
    },
    selectedRow: {
        backgroundColor: 'green'
    },
    tableCol: {
        fontSize: 15,
        color: '#FFFFFF',
        fontWeight: '500',
        flex: 1,
        textAlign: 'center',
    },
    tableCol1: {
        fontSize: 15,
        color: '#EEEEEE', //#D1FF4D
        flex: 1,
        textAlign: 'left',
        paddingLeft: 14,
    },
    tableCol2: {
        fontSize: 15,
        color: 'gold',
        fontWeight: 500,
        flex: 1,
        textAlign: 'center',
    },
    tableCol3: {
        fontSize: 15,
        color: '#A7CFF5',
        flex: 1,
        textAlign: 'center',
    },
});
