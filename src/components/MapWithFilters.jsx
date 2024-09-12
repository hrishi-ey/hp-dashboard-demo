import Icon from "./atom/Icon";
import GoogleMapComponent from "./atom/GoogleMapComponent";

const MapWithFilters = ({ stores }) => {
  return (
    <div className="w-8/12 h-8/12 bg-black border border-white/[0.5] p-4 rounded-lg">
      <header className="w-full flex items-center justify-between">
        <div>
          <select className="bg-input px-6 py-1 rounded-md mr-3" name="uptime">
            <option>Uptime</option>
          </select>
          <select className="bg-input px-6 py-1 rounded-md mr-3" name="operation">
            <option>Operation</option>
          </select>
          <select className="bg-input px-6 py-1 rounded-md mr-3" name="efficiency">
            <option>Efficiency</option>
          </select>
        </div>
        <button className="w-[28px] h-[28px] rounded-full border border-hlblue flex items-center justify-center">
          <Icon name="closeBlue" size={14} />
        </button>
      </header>
      <div className="w-[100%] mt-6">
        <GoogleMapComponent stores={stores} />
      </div>
    </div>
  );
}

export default MapWithFilters;
