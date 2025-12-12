import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text } from 'react-native';
import { LineChart as RNLineChart } from 'react-native-chart-kit';


interface Props {
  labels: string[];
  values: number[];
  w: number;
  h?: number;
}

export function LineChart({ labels, values, w, h = 200 }: Props) {

  // Если нет данных — показываем заглушку
  if (!values || values.length === 0) {
    return (
      <LinearGradient
        colors={['#2E4A7C', '#152B52']}
        style={{
          width: w,
          height: h,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 16 }}>
          No data
        </Text>
      </LinearGradient>
    );
  }

  // Безопасные данные
  const safeValues = (values?.length ? values : [0]).map((v) => {
    const n = Number(v);
    return isFinite(n) ? n : 0;
  });

  const safeLabels = labels?.length ? labels : [''];

  const data = {
    labels: safeLabels,
    datasets: [
      {
        data: safeValues,
        color: (opacity = 1) => `rgba(209, 255, 77, ${opacity})`,
        strokeWidth: 8,
      },
    ],
  };

  return (
    <RNLineChart
      data={data}
      width={w}
      height={h}
      chartConfig={{
        propsForLabels: { fontSize: 14 },
        backgroundGradientFrom: '#2E4A7C',
        backgroundGradientTo: '#152B52',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        decimalPlaces: 2,
        propsForDots: { r: '4', strokeWidth: '1', stroke: 'gold' },
      }}
      bezier
      style={{ borderRadius: 8 }}
    />
  );
}
