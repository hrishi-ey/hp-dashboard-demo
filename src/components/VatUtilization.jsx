import Icon from "./atom/Icon";
import { getCurrentDateTime } from "./atom/Utils";
import VatUtilizationChart from "./atom/VatUtilizationChart"

const VatUtilization = () => {
  return (
    <div className="w-8/12 h-8/12 bg-black border border-white/[0.5] p-4 rounded-lg">
      <header className="w-full flex items-center justify-between">
        <p className="text-[12px] text-sidebaricontext">Equipment &nbsp; &gt; &nbsp; Vat utilization</p>
        <button className="w-[28px] h-[28px] rounded-full border border-hlblue flex items-center justify-center">
          <Icon name="closeBlue" size={14} />
        </button>
      </header>
      <div className="w-[80%] mx-auto my-6">
        <h1>Vat Utilization</h1>
        <p className="text-[10px] text-left text-sidebaricontext">
          {getCurrentDateTime()}
        </p>
        <VatUtilizationChart />
      </div>
    </div>
  );
}

export default VatUtilization;
