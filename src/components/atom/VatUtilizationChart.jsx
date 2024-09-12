import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const StackedBarChart = () => {
  const chartRef = useRef();
  const wrapperRef = useRef();

  useEffect(() => {
    // Generate date array from Feb 14 to Mar 19
    const dates = [];
    const startDate = new Date('2024-02-14');
    const endDate = new Date('2024-03-19');

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }
    

    // Generate random data for each day with values between 50 and 110
    const data = dates.map((date) => ({
      date: date,
      values: [Math.random() * (110 - 50) + 50, Math.random() * (110 - 50) + 50, Math.random() * (110 - 50) + 50],
    }));
    let $wrapper = d3.select(wrapperRef.current);
    let elementSize = $wrapper.node().getBoundingClientRect();

    // Set chart dimensions
    const margin = { top: 20, right: 30, bottom: 60, left: 40 },
      width = elementSize.width - margin.left - margin.right,
      height = elementSize.width * 0.5 - margin.top - margin.bottom;

    // Select the SVG element and clear previous content
    const svg = d3.select(chartRef.current);
    svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Prepare the data for the stacked chart
    const subgroups = ['Group1', 'Group2', 'Group3'];

    const stackedData = d3.stack().keys([0, 1, 2])(data.map((d) => d.values));

    // Define the scales
    const x = d3.scaleTime().domain([startDate, endDate]).range([0, width]);

    const y = d3.scaleLinear().domain([0, 300]).range([height, 0]);

    const color = d3
      .scaleOrdinal()
      .domain(subgroups)
      .range(['#0075d3', '#0b1e82', '#0026ef']);

    // Add X axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(
        d3.axisBottom(x)
          .ticks(d3.timeDay.every(1))
          // .ticks(d3.timeDay.filter(d => d3.timeDay.count(startDate, d) % 30 === 0))
          .tickFormat(d3.timeFormat('%b %d'))
      )
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    // Add Y axis
    svg.append('g').call(d3.axisLeft(y));

    // Create bars
    svg
      .selectAll('g.layer')
      .data(stackedData)
      .enter()
      .append('g')
      .attr('fill', (d, i) => color(i))
      .selectAll('rect')
      .data((d) => d)
      .enter()
      .append('rect')
      .attr('x', (d, i) => x(data[i].date) - 10) // Adjust the width for better fit
      .attr('y', (d) => y(d[1]))
      .attr('height', (d) => y(d[0]) - y(d[1]))
      .attr('width', 20); // Narrower bars for daily data

    // Cleanup on component unmount
    return () => d3.select(chartRef.current).selectAll('*').remove();
  }, []);

  return (
    <div ref={wrapperRef} className="w-full h-full">
      <svg ref={chartRef}></svg>
    </div>
  );
};

export default StackedBarChart;
