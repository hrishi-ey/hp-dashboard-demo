import { useState } from "react";
import Alert from "./atom/Alert";
import Pill from "./atom/Pill"
import Icon from "./atom/Icon";
import { getColor } from "./atom/Utils";
import machine from "../assets/img/icns/machine.png";
import { useNavigate } from "react-router-dom";

const TableList = ({ dataType, data = [] }) => {
  
  const [list, setList] = useState(data);
  const navigate = useNavigate();

  let headers = null;
  let rows = [];
  
  const handleShowPredictions = () => {};

  const handleShowDetails = (dataType, id) => {
    navigate("/dashboard/" + dataType + "/" + id);
  };

  const handleReverseOrder = () => {};

  if(dataType === "owners") {
    headers = <div className="flex items-center justify-center">
      <div className="flex-grow">
        <span className="opacity-0"></span>
      </div>
      <p className="w-[100px] text-center font-medium">Uptime</p>
      <p className="w-[100px] text-center font-medium">Operation</p>
      <p className="w-[100px] text-center font-medium">Efficiency</p>
      <p className="w-[100px] text-center font-medium">Predictions</p>
      <div className="w-[50px] text-right"></div>
    </div>;
    rows = data && data.length > 0 ? data.map((d, i) => {
      return <div key={i} id={d.id} className="flex items-center py-1 border-b border-b-searchinputstroke/[0.5]">
        <p className="flex-grow">{d.name}</p>
        <div className="w-[100px] text-center">
          <Pill color={getColor(d.OwnerKPI["Owner.Uptime.Indicator"].value)} text={d.OwnerKPI["Owner.Uptime.Score"].value} />
        </div>
        <div className="w-[100px] text-center">
          <Pill color={getColor(d.OwnerKPI["Owner.Operation.Indicator"].value)} text={d.OwnerKPI["Owner.Operation.Score"].value} />
        </div>
        <div className="w-[100px] text-center">
          <Pill color={getColor(d.OwnerKPI["Owner.Efficiency.Indicator"].value)} text={d.OwnerKPI["Owner.Efficiency.Score"].value} />
        </div>
        <div className="w-[100px] text-center">
          <span onClick={handleShowPredictions} className="inline-block w-[22px] h-[22px] border border-hlblue rounded-full text-center cursor-pointer"><Icon name="predictionsArrow" size={22} /></span>
        </div>
        <div className="w-[50px] text-right">
          <span onClick={() => { handleShowDetails("owner", d.id); }} className="inline-block w-[22px] h-[22px] bg-hlblue rounded-full cursor-pointer"><Icon name="linkChevronRight" size={22} /></span>
        </div>
      </div>;}
    ): <p>No data found</p>;
  } else if(dataType === "stores") {
    headers = <div className="flex items-center w-full mb-4">
      <div className="flex-grow"></div>
      <p className="font-medium text-center w-[100px]">Uptime</p>
      <p className="font-medium text-center w-[100px]">Operation</p>
      <p className="font-medium text-center w-[100px]">Efficiency</p>
      <p className="font-medium text-center w-[100px]">Alerts</p>
      <p className="font-medium text-center w-[100px]">Predictions</p>
      <div className="text-right w-[50px]"></div>
    </div>;
    rows = data && data.length > 0 ? data.map((d, i) => {
      return <div key={i} id={d.id} className={`flex items-center py-1 ${i < data.length - 1 ? "border-b border-b-searchinputstroke/[0.3]" : ""}`}>
        <p className="flex-grow">{d.name}</p>
        <div className="text-center w-[100px]">
          <Pill color={getColor(d.storeKPI["Store.Uptime.Indicator"].value)} text={d.storeKPI["Store.Uptime.Score"].value} />
        </div>
        <div className="text-center w-[100px]">
          <Pill color={getColor(d.storeKPI["Store.Operation.Indicator"].value)} text={d.storeKPI["Store.Operation.Score"].value} />
        </div>
        <div className="text-center w-[100px]">
          <Pill color={getColor(d.storeKPI["Store.Efficiency.Indicator"].value)} text={d.storeKPI["Store.Efficiency.Score"].value} />
        </div>
        <div className="text-center w-[100px]">
          {d.errors && d.errors.length > 0 ? d.errors.map((err, i) => <div key={i}><Alert color="red" text={err} textSize={12} /></div>) : "-"}
        </div>
        <div className="text-center w-[100px]">
          <span onClick={handleShowPredictions} className="inline-block w-[22px] h-[22px] border border-hlblue rounded-full text-center cursor-pointer"><Icon name="predictionsArrow" size={22} /></span>
        </div>
        <div className="text-right w-[50px]">
          <span onClick={() => { handleShowDetails("store", d.id); }} className="inline-block w-[22px] h-[22px] bg-hlblue rounded-full cursor-pointer"><Icon name="linkChevronRight" size={22} /></span>
        </div>
      </div>
  }): <p>No data found</p>;
  } else if(dataType === "devices") {
    headers = <div className="flex items-center w-full mb-4">
      <div className="flex-grow"><Icon name="filter" size={18}></Icon></div>
      <p className="font-medium text-center w-[100px]">ID</p>
      <p className="font-medium text-center w-[100px]">Uptime</p>
      <p className="font-medium text-center w-[100px]">Operation</p>
      <p className="font-medium text-center w-[100px]">Efficiency</p>
      <p className="font-medium text-center w-[100px]">Alerts</p>
      <p className="font-medium text-center w-[100px]">Predictions</p>
      <div className="text-right w-[50px]"></div>
    </div>;
    rows = data && data.length > 0 ? data.map((d) => {
      return <div key={d.id} id={d.id} className="flex items-center py-1 border-b border-b-searchinputstroke/[0.5]">
        <p className="flex-grow">
          <img src={d.image ? d.image : machine} className="inline-block h-[32px]" />
        </p>
        <p className="text-center w-[100px]">{d.id}</p>
        <div className="text-center w-[100px]">
          {/* <Pill color={getColor(d.OwnerKPI["Owner.Uptime.Indicator"].value)} text={d.OwnerKPI["Owner.Uptime.Score"].value} /> */}
        </div>
        <div className="text-center w-[100px]">
          <Pill color={getColor(d.operation)} text={d.operation} />
        </div>
        <div className="text-center w-[100px]">
          <Pill color={getColor(d.efficiency)} text={d.efficiency} />
        </div>
        <div className="text-center w-[100px]">
          {d.errors && d.errors.length > 0 ? d.errors.map((err, i) => <div key={i}><Alert color="red" text={err} textSize={12} /></div>) : "-"}
        </div>
        <div className="text-center w-[100px]">
          <span onClick={handleShowPredictions} className="inline-block w-[22px] h-[22px] border border-hlblue rounded-full text-center cursor-pointer"><Icon name="predictionsArrow" size={22} /></span>
        </div>
        <div className="text-right w-[50px]">
          <span onClick={() => { handleShowDetails("device", d.id); }} className="inline-block w-[22px] h-[22px] bg-hlblue rounded-full cursor-pointer"><Icon name="linkChevronRight" size={22} /></span>
        </div>
      </div>;}
    ) : <p>No data found</p>;
  } else if(dataType === "assets") {
    headers = <div className="flex items-center w-full mb-4">
      <div className="w-[100px]">
        <span onClick={handleReverseOrder}>
          <Icon name="filter" size={18}></Icon>
        </span>
      </div>
      <p className="font-medium text-center w-[100px]">Model</p>
      <p className="font-medium text-center w-[100px]">ID</p>
      <p className="font-medium text-left flex-grow">Address</p>
      <p className="font-medium text-left flex-grow">Owner</p>
      <p className="font-medium text-center w-[100px]">Alerts</p>
      <p className="font-medium text-center w-[100px]">Predictions</p>
      <div className="text-right w-[50px]"></div>
    </div>;
    rows = data && data.length > 0 ? data.map((d, i) => {
      return <div key={d.id} id={d.id} className="flex items-center py-3 border-b border-b-searchinputstroke/[0.5]">
        <div className="w-[100px]"><img src={d.image ? d.image : machine} className="inline-block h-[32px]" /></div>
        <p  className="text-center w-[100px] text-[12px]">{ d.F5EC_StartupOrSettingsData && d.F5EC_StartupOrSettingsData.serNum && d.F5EC_StartupOrSettingsData.serNum}</p>
        <p className="text-center w-[100px] text-[12px]">{d.id}</p>
        <div className="text-left flex-grow text-[12px]">
          <p>{d.hp_Commissioning_details.store_details && d.hp_Commissioning_details.store_details.name && d.hp_Commissioning_details.store_details.name}</p>
          <p className="text-white/[0.5] text-[12px]">{d.hp_Commissioning_details.store_details && d.hp_Commissioning_details.store_details.address.line1}, {d.hp_Commissioning_details.store_details && d.hp_Commissioning_details.store_details.address.city} {d.hp_Commissioning_details.store_details && d.hp_Commissioning_details.store_details.address.zip} </p>
        </div>
        <div className="flex-grow text-center text-[12px]">
          <p>{d.owner}</p>
        </div>
        <div className="w-[100px] text-center text-[12px]">
          {d.errors && d.errors.length > 0 ? d.errors.map((err, i) => <div key={i}><Alert color="red" text={err} textSize={12} /></div>) : "-"}
        </div>
        <div className="w-[100px] text-center">
          <span onClick={handleShowPredictions} className="inline-block w-[22px] h-[22px] border border-hlblue rounded-full text-center cursor-pointer"><Icon name="predictionsArrow" size={22} /></span>
        </div>
        <div className="text-right w-[50px]">
          <span onClick={() => { handleShowDetails("device", d.id ); }} className="inline-block w-[22px] h-[22px] bg-hlblue rounded-full cursor-pointer"><Icon name="linkChevronRight" size={22} /></span>
        </div>
      </div>
    }) : <p>No data found</p>;
  } else if(dataType === "uptime") {
    headers = <div className="flex items-center justify-center mb-4">
      <div className="w-[100px] text-center">
        <span onClick={handleReverseOrder}>
          <Icon name="filter" size={18}></Icon>
        </span>
      </div>
      <p className="flex-grow">Address</p>
      <p className="w-[100px] text-center">Uptime</p>
      <p className="w-[100px] text-center">Alerts</p>
      <p className="w-[100px] text-center">Predictions</p>
      <div className="w-[50px] text-right"></div>
    </div>;
    rows = data && data.length > 0 ? data.map((d, i) => <div key={d.id} id={d.id} className="flex items-center py-1 border-b border-b-searchinputstroke/[0.5]">
        <div className="flex-grow">
          <p>{d.hp_Commissioning_details.store_details && d.hp_Commissioning_details.store_details.name && d.hp_Commissioning_details.store_details.name}</p>
          <p className="text-white/[0.5] text-[12px]">{d.hp_Commissioning_details.store_details && d.hp_Commissioning_details.store_details.address.line1}, {d.hp_Commissioning_details.store_details && d.hp_Commissioning_details.store_details.address.city} {d.hp_Commissioning_details.store_details && d.hp_Commissioning_details.store_details.address.zip} </p>
        </div>
        <div className="w-[100px] text-center">
          <Pill color={getColor(d.uptimeIndicator)} text={d.uptime} />
        </div>
        <div className="w-[100px] text-center">
          {d.errors && d.errors.length > 0 ? d.errors.map((err, i) => <div key={i}><Alert color="red" text={err} textSize={12} /></div>) : "-"}
        </div>
        <div className="w-[100px] text-center">
          <span onClick={handleShowPredictions} className="inline-block w-[22px] h-[22px] border border-hlblue rounded-full text-center cursor-pointer"><Icon name="predictionsArrow" size={22} /></span>
        </div>
        <div className="w-[50px] text-right">
          <span onClick={() => {
            handleShowDetails("device", d.id);
          }} className="inline-block w-[22px] h-[22px] bg-hlblue rounded-full cursor-pointer"><Icon name="linkChevronRight" size={22} /></span>
        </div>
      </div>
    ): <p>No data found</p>;
  } else if(dataType === "operation") {
    headers = <div className="flex items-center justify-center mb-4">
      <div className="w-[100px]"><Icon name="filter" size={18}></Icon></div>
      <p className="flex-grow">Address</p>
      <p className="w-[100px] text-center">Vat Utilization</p>
      <p className="w-[100px] text-center">Main Filter</p>
      <p className="w-[100px] text-center">Express Filter</p>
      <p className="w-[100px] text-center">Alerts</p>
      <p className="w-[100px] text-center">Predictions</p>
      <div className="w-[50px]"></div>
    </div>;
    rows = data && data.length > 0 ? data.map((d, i) => {
      return <div key={d.id} id={d.id} className="flex items-center py-1 border-b border-b-searchinputstroke/[0.5]">
        <div className="w-[100px]"></div>
        <div className="flex-grow">
          <p>{d.hp_Commissioning_details.store_details && d.hp_Commissioning_details.store_details.name && d.hp_Commissioning_details.store_details.name}</p>
          <p className="text-white/[0.5] text-[12px]">{d.hp_Commissioning_details.store_details && d.hp_Commissioning_details.store_details.address.line1}, {d.hp_Commissioning_details.store_details && d.hp_Commissioning_details.store_details.address.city} {d.hp_Commissioning_details.store_details && d.hp_Commissioning_details.store_details.address.zip} </p>
        </div>
        <p className="w-[100px] text-center">
          <Pill color={getColor(d.vatUtilizationIndicator)} text={d.vatUtilization} />
        </p>
        <p className="w-[100px] text-center">
          <Pill color={getColor(d.mainFilterIndicator)} text={d.mainFilter} />
        </p>
        <p className="w-[100px] text-center">
          <Pill color={getColor(d.expressFilterIndicator)} text={d.expressFilter} />
        </p>
        <div className="w-[100px] text-center">
          {d.errors && d.errors.length > 0 ? d.errors.map((err, i) => <div key={i}><Alert color="red" text={err} textSize={12} /></div>) : "-"}
        </div>
        <div className="w-[100px] text-center">
          <span onClick={handleShowPredictions} className="inline-block w-[22px] h-[22px] border border-hlblue rounded-full text-center cursor-pointer"><Icon name="predictionsArrow" size={22} /></span>
        </div>
        <div className="w-[50px] text-right">
          <span onClick={() => {handleShowDetails("device", d.id);}} className="inline-block w-[22px] h-[22px] bg-hlblue rounded-full cursor-pointer"><Icon name="linkChevronRight" size={22} /></span>
        </div>
      </div>
    }): <p>No data found</p>;
  } else if(dataType === "efficiency") {
    headers = <div className="flex items-center justify-center mb-4">
      <div className="w-[50px]"><Icon name="filter" size={18}></Icon></div>
      <p className="flex-grow">Address</p>
      <p className="w-[150px] text-center">Oil Efficiency</p>
      <p className="w-[150px] text-center">Energy Efficiency</p>
      <p className="w-[100px] text-center">Alerts</p>
      <p className="w-[100px] text-center">Predictions</p>
      <div className="w-[50px]"></div>
    </div>;
    rows = data && data.length > 0 ? data.map((d, i) => {
      return <div key={d.id} id={d.id} className="flex items-center py-1 border-b border-b-searchinputstroke/[0.5]">
        <div className="flex-grow">
          <p>{d.hp_Commissioning_details.store_details && d.hp_Commissioning_details.store_details.name && d.hp_Commissioning_details.store_details.name}</p>
          <p className="text-white/[0.5] text-[12px]">{d.hp_Commissioning_details.store_details && d.hp_Commissioning_details.store_details.address.line1}, {d.hp_Commissioning_details.store_details && d.hp_Commissioning_details.store_details.address.city} {d.hp_Commissioning_details.store_details && d.hp_Commissioning_details.store_details.address.zip} </p>
        </div>
        <p className="w-[150px] text-center">
          <Pill color={getColor(d.oilEfficiencyIndicator)} text={d.oilEfficiency} />
        </p>
        <p className="w-[150px] text-center">
          <Pill color={getColor(d.energyEfficiencyIndicator)} text={d.energyEfficiency} />
        </p>
        <div className="w-[100px] text-center">
          {d.errors && d.errors.length > 0 ? d.errors.map((err, i) => <div key={i}><Alert color="red" text={err} textSize={12} /></div>) : "-"}
        </div>
        <div className="w-[100px] text-center">
          <span onClick={handleShowPredictions} className="inline-block w-[22px] h-[22px] border border-hlblue rounded-full text-center cursor-pointer"><Icon name="predictionsArrow" size={22} /></span>
        </div>
        <div className="w-[50px] text-right">
          <span onClick={() => {
            handleShowDetails("device", d.id);
          }} className="inline-block w-[22px] h-[22px] bg-hlblue rounded-full cursor-pointer"><Icon name="linkChevronRight" size={22} /></span>
        </div>
      </div>
    }): <p>No data found</p>;
  } else if(dataType === "notifications") {
    headers = <div className="flex items-center justify-center mb-4">
      <div className="w-[100px]"><Icon name="filter" size={18}></Icon></div>
      <p className="w-[100px] text-center">Model</p>
      <p className="w-[100px] text-center">ID</p>
      <p className="flex-grow">Address</p>
      <p className="w-[150px] text-center">Owner</p>
      <p className="w-[150px] text-center">Alerts</p>
      <p className="w-[100px] text-center">Predictions</p>
      <div className="w-[50px]"></div>
    </div>;
    rows = data && data.length > 0 ? data.map((d, i) => {
      return <div key={d.id} id={d.id} className="flex items-center py-1 border-b border-b-searchinputstroke/[0.5]">
        <div className="w-[100px] text-center">
          <img src={d.image ? d.image : machine} className="inline-block h-[32px]" />
        </div>
        <p className="w-[100px] text-[12px] text-center">
          {d.F5EC_StartupOrSettingsData.serNum && d.F5EC_StartupOrSettingsData.serNum}
        </p>
        <p className="w-[100px] text-[12px] text-center">
          {d.id}
        </p>
        <div className="flex-grow-2">
          <p>{d.hp_Commissioning_details.store_details && d.hp_Commissioning_details.store_details.name && d.hp_Commissioning_details.store_details.name}</p>
          <p className="text-white/[0.5] text-[12px]">{d.hp_Commissioning_details.store_details && d.hp_Commissioning_details.store_details.address.line1}, {d.hp_Commissioning_details.store_details && d.hp_Commissioning_details.store_details.address.city} {d.hp_Commissioning_details.store_details && d.hp_Commissioning_details.store_details.address.zip} </p>
        </div>
        <p className="text-center text-[12px] w-[150px]">
          {d.hp_Commissioning_details.owner_details && d.hp_Commissioning_details.owner_details.name && d.hp_Commissioning_details.owner_details.name}
        </p>
        <div className="text-center text-[12px] w-[150px]">
          {d.errors && d.errors.length > 0 ? d.errors.map((err, i) => <div key={i}><Alert color="red" text={err} textSize={12} /></div>) : "-"}
        </div>
        <div className="text-center w-[100px]">
          <span onClick={handleShowPredictions} className="inline-block w-[22px] h-[22px] border border-hlblue rounded-full text-center cursor-pointer"><Icon name="predictionsArrow" size={22} /></span>
        </div>
        <div className="text-right w-[50px]">
          <span onClick={() => { handleShowDetails("device", d.id); }} className="inline-block w-[22px] h-[22px] bg-hlblue rounded-full cursor-pointer"><Icon name="linkChevronRight" size={22} /></span>
        </div>
      </div>
    }): <p>No data found</p>;
  }

  return <>
    {headers}
    <div className="w-full flex-grow overflow-y-auto">
      {rows}
    </div>
  </>;
}

export default TableList;
