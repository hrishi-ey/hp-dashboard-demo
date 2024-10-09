// Donut Chart Component:
import { getColor } from './Utils';
import { PieChart, Pie, Cell, Label, Text, ResponsiveContainer } from "recharts";

const DonutChart = ({ num = 90, width = 200, height = 180, indicator = 0 }) => {

  const baseData = [{ name: "A", value: 100 }];
  const numData = [{ name: "A", value: num }, { name: "B", value: (100 - num) }];
  const startAngle = 180 + 30;
  const endAngle = -30;

  const halfWidth = width / 2 - 6;
  const halfHeight = height / 2;
  

  return (
    <ResponsiveContainer width={width} height={height}>
      <PieChart width={width} height={height}>
        <Pie
          data={baseData}
          dataKey="value"
          cx={halfWidth}
          cy={halfHeight}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={halfHeight - 6}
          outerRadius={halfHeight - 4}
          fill="#58595B"
          paddingAngle={0}
          cornerRadius={4}
          stroke='none'
        />
        <Pie
          data={numData}
          dataKey="value"
          cx={halfWidth}
          cy={halfHeight}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={halfHeight - 9}
          outerRadius={halfHeight - 1}
          paddingAngle={0}
          cornerRadius={4}
          stroke='none'
        >
          {
            numData.map((entry, index) => {
              const fill = index === 1 ? "transparent" : getColor(indicator);
              return <Cell key={`cell-${index}`} fill={fill} />
            })
          }
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DonutChart;