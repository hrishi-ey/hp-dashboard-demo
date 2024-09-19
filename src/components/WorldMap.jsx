import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from "topojson-client";
import { getColor } from './atom/Utils';

const WorldMap = () => {
  const mapRef = useRef(null);
  const wrapperRef = useRef(null);

  // const [geoData, setGeoData] = useState(null);

  const zoomed = (evt) => {
    let svg = d3.select(mapRef.current);
    svg.selectAll(".mapGroup").attr("transform", evt.transform);
  }

  const getRandomValues = (arr) => {
    const min = 3;
    const max = 8;
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    const randomValues = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      randomValues.push(arr[randomIndex]);
    } 
    return randomValues;
  };

  const randomMarkerPositions = [
    {"latitude": 44.3538, "longitude": -115.5778, num: 80},
    {"latitude": 28.4808, "longitude": -106.9792, num: 60},
    {"latitude": 43.5493, "longitude": -110.7, num: 80},
    {"latitude": 33.0211, "longitude": -84.5592, num: 80},
    {"latitude": 36.7284, "longitude": -94.5588, num: 74},
    {"latitude": 34.7660, "longitude": -75.6192, num: 90},
    {"latitude": 47.5214, "longitude": -69.6841, num: 60},
    {"latitude": 36.0827, "longitude": -100.6386, num: 80},
    {"latitude": 30.4409, "longitude": -99.3631, num: 80},
    {"latitude": 37.9591, "longitude": -117.7505, num: 90},
    {"latitude": 33.7896, "longitude": -115.9180, num: 80},
    {"latitude": 33.8121, "longitude": -84.9516, num: 60},
    {"latitude": 28.8966, "longitude": -106.3568, num: 80},
    {"latitude": 30.9416, "longitude": -69.6377, num: 80},
    {"latitude": 47.3215, "longitude": -90.3980, num: 80},
    {"latitude": 36.8948, "longitude": -109.9604, num: 80},
    {"latitude": 36.4972, "longitude": -120.3334, num: 80},
    {"latitude": 24.8876, "longitude": -85.0026, num: 50},
    {"latitude": 42.9257, "longitude": -86.8200, num: 90},
    {"latitude": 38.2245, "longitude": -99.9497, num: 80}
  ];

  const randomLocations = getRandomValues(randomMarkerPositions);

  // useEffect(() => {
  //   d3.json("/src/assets/world-map.json").then(setGeoData);
  // }, []);

  useEffect(() => {
    if(geoData) {
      let projection = d3.geoMercator().center([50, -29]).scale(140).rotate([0,0]);
      let svg = d3.select(mapRef.current);
      let path = d3.geoPath().projection(projection);
      let g = svg.append("g").attr("class", "mapGroup");

      let $wrapper = d3.select(wrapperRef.current);
      let elementSize = $wrapper.node().getBoundingClientRect();

      svg.attr("width", elementSize.width).attr("height", elementSize.height).call(d3.zoom().scaleExtent([1,10]).on("zoom", zoomed));
      
      // load and display the World
      g.selectAll("path")
        .data(topojson.feature(geoData, geoData.objects.countries).features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "#22303E");
      
      let markerGroup = g.append("g").attr("class", "markerGroup");

      markerGroup.selectAll("circle")
        .data(randomLocations)
        .enter()
        .append("path")
        .attr("d", "M8.43035 10.7C7.27369 10.7 6.33233 9.73249 6.33233 8.54249C6.33233 7.3534 7.27369 6.38501 8.43035 6.38501C9.58702 6.38501 10.5284 7.3534 10.5284 8.54249C10.5284 9.73249 9.58702 10.7 8.43035 10.7ZM8.43035 4.7392C6.36566 4.7392 4.68651 6.44537 4.68651 8.54249C4.68651 10.6396 6.36566 12.3467 8.43035 12.3467C10.495 12.3467 12.1751 10.6396 12.1751 8.54249C12.1751 6.44537 10.495 4.7392 8.43035 4.7392ZM8.42945 19.9983C7.79347 19.293 6.78904 18.1174 5.78913 16.6986C3.67038 13.6934 2.55065 11 2.55065 8.90823C2.55065 3.02042 7.05119 2.5628 8.43035 2.5628C13.8858 2.5628 14.3101 7.42006 14.3101 8.90823C14.3101 13.0493 10.0969 18.1444 8.42945 19.9983ZM13.7101 2.54839C12.3589 1.34488 10.4833 0.680973 8.43035 0.680973C6.37647 0.680973 4.50184 1.34488 3.1506 2.54839C1.52731 3.99512 0.668823 6.19404 0.668823 8.90823C0.668823 14.8204 7.47277 21.7486 7.76194 22.0405C7.9385 22.218 8.17902 22.3188 8.43035 22.3188C8.68078 22.3188 8.9213 22.218 9.09787 22.0405C9.38793 21.7486 16.191 14.8204 16.191 8.90823C16.191 6.19404 15.3334 3.99512 13.7101 2.54839Z")
        .attr("transform", (d) => `translate(${projection([d.longitude, d.latitude])[0]}, ${projection([d.longitude, d.latitude])[1]})`)
        .attr("fill", (d) => getColor(d.num));
    }
    
  }, [geoData]);

  return <div className='w-full h-full relative' ref={wrapperRef}>
    <svg ref={mapRef}></svg>
    <div className="absolute left-[10px] bottom-[0]">
      <button className='w-[20px] h-[20px] border border-white leading-[4px] text-center rounded-full cursor-pointer mr-3'>-</button>
      <button className='w-[20px] h-[20px] border border-white leading-[20px] text-center rounded-full cursor-pointer'>+</button>
    </div>
  </div>;
};

export default WorldMap;