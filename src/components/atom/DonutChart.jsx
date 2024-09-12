// Donut Chart Component:
import { useState } from 'react';
import { getActualColor } from './Utils';
import { PieChart, Pie, Cell, Label, Text, ResponsiveContainer } from "recharts";

const DonutChart = ({ num = 90, width = 200, height = 180 }) => {

  const baseData = [{ name: "A", value: 100 }];
  const numData = [{ name: "A", value: num }, { name: "B", value: (100 - num) }];
  const startAngle = 180 + 30;
  const endAngle = -30;

  const chartSize = {width: width, height: height};

  return (
    <ResponsiveContainer width={width} height={height}>
      <PieChart width={width} height={height}>
        <Pie
          data={baseData}
          dataKey="value"
          cx={width / 2}
          cy={height / 2}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={height / 2 - 6}
          outerRadius={height / 2 - 4}
          fill="#58595B"
          paddingAngle={0}
          cornerRadius={4}
          stroke='none'
        />
        <Pie
          data={numData}
          dataKey="value"
          cx={width / 2}
          cy={height / 2}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={height / 2 - 9}
          outerRadius={height / 2 - 1}
          paddingAngle={0}
          cornerRadius={4}
          stroke='none'
        >
          {
            numData.map((entry, index) => {
              const fill = index === 1 ? "transparent" : getActualColor(num);
              return <Cell key={`cell-${index}`} fill={fill} />
            })
          }
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DonutChart;