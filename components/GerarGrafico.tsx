import Moment from 'moment';
import React, { useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View } from 'react-native';
import Svg, { Rect, Text } from 'react-native-svg';

const { width } = Dimensions.get('window');
const height = 500;

const chartConfig = {
  decimalPlaces: 0,
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const graphStyle = {
  marginLeft: -30,
  ...chartConfig,
};

const GerarGrafico: React.FC = (stats: any) => {
  let [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
    color: 'black',
    index: 0,
  });

  // Dados fictícios para teste
  const dadosTeste = Array.from({ length: 24 }, (_, i) => ({
    dataSincronizacao: new Date(2025, 9, 23, i, 0).toISOString(),
    temperatura: Math.round(20 + Math.random() * 15), // Temperatura entre 20°C e 35°C
    umidade: Math.round(40 + Math.random() * 40), // Umidade entre 40% e 80%
  }));

  // @ts-ignore
  let datas: any[] = [];
  let temps = [];
  let umids = [];

  datas = dadosTeste.map((e: any) => {
    let dateString = e.dataSincronizacao?.toString().substring(0, 19);
    let date = new Date(dateString);
    let hora = date.toString().substring(16, 21);
    return hora;
  });

  temps = dadosTeste.map((e: any) => {
    return e.temperatura;
  });

  umids = dadosTeste.map((e: any) => {
    return e.umidade;
  });

  let indexDaMetade = datas.slice(0, Math.round((datas.length - 1) / 2)).length - 1;

  const data = {
    labels: datas,
    datasets: [
      {
        data: temps,
        color: (opacity = 1) => `#e63946`, // optional
      },
      {
        data: umids,
        color: (opacity = 1) => `#457b9d`, // optional
      },
    ],
    legend: ['Temperatura', 'Umidade'], // optional
  };

  return (
    <>
      <LineChart
        yAxisInterval={2}
        segments={8}
        decorator={() => {
          return tooltipPos.visible ? (
            <View>
              <Svg>
                <Rect
                  x={tooltipPos.index <= indexDaMetade ? tooltipPos.x - 15 : tooltipPos.x - 115}
                  y={tooltipPos.y + 10}
                  width="135"
                  height="50"
                  fill={tooltipPos.color}
                />
                <Text
                  x={tooltipPos.index <= indexDaMetade ? tooltipPos.x - 10 : tooltipPos.x - 110}
                  y={tooltipPos.y + 30}
                  fill="white"
                  fontSize="16"
                  fontWeight="bold"
                  textAnchor="start">
                  {`Horário: ${datas[tooltipPos.index]}`}
                </Text>
                <Text
                  x={tooltipPos.index <= indexDaMetade ? tooltipPos.x - 10 : tooltipPos.x - 110}
                  y={tooltipPos.y + 50}
                  fill="white"
                  fontSize="16"
                  fontWeight="bold"
                  textAnchor="start">
                  {tooltipPos.color == '#e63946'
                    ? `Temperatura: ${tooltipPos.value}`
                    : `Umidade: ${tooltipPos.value}`}
                </Text>
              </Svg>
            </View>
          ) : null;
        }}
        verticalLabelRotation={-70}
        data={data}
        width={width}
        height={height}
        onDataPointClick={(data) => {
          setTimeout(() => {
            setTooltipPos({
              x: 0,
              value: 0,
              y: 0,
              index: 0,
              visible: false,
              color: 'black',
            });
          }, 5000);
          let isSamePoint = tooltipPos.x === data.x && tooltipPos.y === data.y;
          // eslint-disable-next-line no-unused-expressions
          isSamePoint
            ? setTooltipPos((previousState) => {
                return {
                  ...previousState,
                  value: data.value,
                  index: data.index,
                  color: data.getColor(0.9),
                  visible: !previousState.visible,
                };
              })
            : setTooltipPos({
                x: data.x,
                value: Math.round(data.value),
                y: data.y,
                index: data.index,
                visible: true,
                color: data.getColor(0.9),
              });
        }}
        xLabelsOffset={15}
        chartConfig={chartConfig}
        style={graphStyle}
      />
    </>
  );
};

export default GerarGrafico;
