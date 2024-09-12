import { useRef, useState, useEffect } from "react";
import * as d3 from "d3";
import DonutChart from './atom/DonutChart';
import PanelHeader from './atom/PanelHeader';
import { getActualColor, getRemark } from './atom/Utils';

const InfoChartPanel = ({ title, num }) => {
  const wrapperRef = useRef();
  const [wrapperSize, setWrapperSize] = useState(null);

  useEffect(() => {
    let $wrapper = d3.select(wrapperRef.current);
    let wrapperSize = $wrapper.node().getBoundingClientRect();

    setWrapperSize({width: wrapperSize.width, height: wrapperSize.width});
 
  }, []);

  const buttonColor = getActualColor(num);

  return (
    <div className='w-full h-full bg-panel border border-panelborder flex flex-col'>
      <PanelHeader text={title} />
      <div className='w-full flex-grow flex flex-col items-center p-3'>
        <div className="w-[80%] h-full relative" ref={wrapperRef}>
          { wrapperSize && wrapperSize.width && <DonutChart num={num} width={wrapperSize.width} height={wrapperSize.width} />}
          <h1 className='absolute text-center w-full left-0 right-0 top-[45%] translate-y-[-50%]'>{num}</h1>
          <div className={`absolute left-[18%] right-[18%] bottom-4 flex items-center justify-center text-black text-center px-[1em] rounded-full font-medium`} style={{backgroundColor: buttonColor}}>
            {getRemark(num)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoChartPanel;