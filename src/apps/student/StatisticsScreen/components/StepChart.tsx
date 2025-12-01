import React from "react";
import { View } from "react-native";
import Svg, { Line, Path, Text } from "react-native-svg";


type Point = { x: string; y: number };

interface StepChartProps {
  data: Point[];
  width: number;
  height: number;
}

export const StepChart: React.FC<StepChartProps> = ({ data, width, height }) => {
  const margin = { top: 16, right: 16, bottom: 30, left: 30 };

  // Если данных мало — просто рисуем пустой холст
  if (!data || data.length === 0) {
    return (
      <View>
        <Svg width={width} height={height} />
      </View>
    );
  }

  // Ось Y
  const maxY = Math.max(...data.map(d => d.y), 0);
  const stepY = maxY <= 3 ? 1 : maxY <= 6 ? 2 : 3;
  const yTicks = Array.from(
    { length: Math.floor(maxY / stepY) + 1 },
    (_, i) => i * stepY
  );

  const yScale = (value: number) => {
    if (maxY === 0) return height - margin.bottom;
    return (
      height -
      margin.bottom -
      (value / maxY) * (height - margin.top - margin.bottom)
    );
  };

  // Ось X — защищено от деления на ноль
  const xScale = (index: number) => {
    if (data.length <= 1) return margin.left;
    return (
      margin.left +
      (index / (data.length - 1)) * (width - margin.left - margin.right)
    );
  };

  // Создание ступенчатого path
  let pathD: string | null = null;

  data.forEach((d, i) => {
    const x = xScale(i);
    const y = yScale(d.y);

    if (i === 0) {
      pathD = `M${x},${y}`;
    } else {
      pathD += ` H${x} V${y}`;
    }
  });

  return (
    <View>
      <Svg width={width} height={height}>
        {/* Горизонтальные линии + подписи Y */}
        {yTicks.map((t, i) => (
          <React.Fragment key={`ytick-${t}-${i}`}>
            <Line
              x1={margin.left}
              x2={width - margin.right}
              y1={yScale(t)}
              y2={yScale(t)}
              stroke="#ccc"
              strokeDasharray="4"
            />
            <Text
              x={margin.left - 10}
              y={yScale(t) + 4}
              fontSize="12"
              fill="gray"
              textAnchor="end"
            >
              {t}
            </Text>
          </React.Fragment>
        ))}

        {/* Вертикальные линии + подписи X */}
        {data.map((d, i) => (
          <React.Fragment key={`xtick-${d.x}-${i}`}>
            <Line
              x1={xScale(i)}
              x2={xScale(i)}
              y1={margin.top}
              y2={height - margin.bottom}
              stroke="#ccc"
              strokeDasharray="4"
            />
            <Text
              x={xScale(i)}
              y={height - margin.bottom + 20}
              fontSize="12"
              fill="gray"
              textAnchor="middle"
            >
              {d.x}
            </Text>
          </React.Fragment>
        ))}

        {/* Если минимум 2 точки — рисуем график и заливку */}
        {pathD && data.length > 1 && (
          <>
            <Path
              d={`${pathD} V${yScale(0)} H${xScale(0)} Z`}
              fill="orange"
              opacity={0.1}
            />

            <Path
              d={pathD}
              stroke="orange"
              strokeWidth={3}
              fill="none"
            />
          </>
        )}

        {/* Если одна точка — рисуем просто кружок */}
        {data.length === 1 && pathD && (
          <Path
            d={pathD}
            stroke="orange"
            strokeWidth={4}
            fill="none"
          />
        )}
      </Svg>
    </View>
  );
};