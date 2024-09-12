import DonutChart from './atom/DonutChart';
import PanelHeader from './atom/PanelHeader';
import Pill from './atom/Pill';
import { getColor, getRemark } from './atom/Utils';

const InfoChartPanel = ({ title, num }) => {
  return (
    <div className='w-full h-full bg-panel border border-panelborder flex flex-col'>
      <PanelHeader text={title} />
      <div className='w-full flex-grow flex flex-col items-center p-3'>
        <div className="flex-grow w-full h-full flex relative">
          <DonutChart num={num} />
          <div className={`absolute left-0 right-0 bottom-0 flex items-center justify-center text-black text-center px-[1em] rounded-full font-medium`}>
            {getRemark(num)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoChartPanel;