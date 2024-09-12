// Donut Chart Component:
import { useRef, useEffect, useState } from 'react';
import * as d3 from "d3"
import { getActualColor } from './Utils';
import { PieChart, Pie, Cell, Label, Text } from "recharts";

const DonutChart = ({ num = 90 }) => {

  const baseData = [{ name: "A", value: 100 }];
  const numData = [{ name: "A", value: num }, { name: "B", value: (100 - num) }];
  const startAngle = 180 + 30;
  const endAngle = -30;

  const wrapperRef = useRef();
  const [chartSize, setChartSize] = useState(null);

  useEffect(() => {
    let $wrapper = d3.select(wrapperRef.current);
    let wrapperSize = $wrapper.node().getBoundingClientRect();

    setChartSize({width: wrapperSize.width, height: wrapperSize.width * .7});
    
  }, []);

  return (
    <div className='flex-grow max-w-[256px]' ref={wrapperRef}>
      {
        chartSize && chartSize.width &&
        <PieChart width={chartSize.width} height={chartSize.height}>
          <Pie
            data={baseData}
            dataKey="value"
            cx={chartSize.width / 2}
            cy={chartSize.height / 2}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={chartSize.height / 2 - 6}
            outerRadius={chartSize.height / 2 - 4}
            fill="#58595B"
            paddingAngle={0}
            cornerRadius={4}
            stroke='none'
          />
          <Pie
            data={numData}
            dataKey="value"
            cx={chartSize.width / 2}
            cy={chartSize.height / 2}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={chartSize.height / 2 - 9}
            outerRadius={chartSize.height / 2 - 1}
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
      }
    </div>
  )
};

export default DonutChart;