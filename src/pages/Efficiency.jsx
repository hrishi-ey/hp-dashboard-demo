import { useSelector } from "react-redux";
import PanelHeader from "../components/atom/PanelHeader";
import TableList from "../components/TableList";
import { useState, useEffect } from "react";
import { getColor, getCurrentDateTime } from "../components/atom/Utils";
import Alert from "../components/atom/Alert";
import InfoChartPanel from "../components/InfoChartPanel";
import Icon from "../components/atom/Icon";
import GoogleMapComponent from "../components/atom/GoogleMapComponent";
import MapWithFilters from "../components/MapWithFilters";

const Operation = () => {
  const userData = useSelector((state) => state.user.inventory);  
  const [dataSet, setDataSet] = useState(null);
  const [tableDataType, setTableDataType] = useState("");
  const [tableListData, setTableListData] = useState([]);

  const [popupData, setPopupData] = useState(null);

  useEffect(() => {
    if(userData.inventory.userType === "admin") {
      setDataSet(userData.inventory.owners);
    } else if(userData.inventory.userType === "owner") {
      setDataSet(userData.inventory.stores);
    } else if(userData.inventory.userType === "store") {
      setDataSet(userData.inventory.devices);
    }
    setTableDataType("efficiency");
    setTableListData([...userData.inventory.devices.children]);
  }, [userData]);

  // useEffect(() => {
  //   console.log(tableListData, tableDataType, dataSet);
    
  // }, [tableListData]);

  const showFullMap = () => {
    setPopupData(<div onClick={() => { setPopupData(null); }} className="fixed left-0 top-0 right-0 bottom-0 backdrop-blur-sm bg-black/[0.5] z-40 flex items-center justify-center"><MapWithFilters stores={userData.inventory.stores.children} /></div>);
  }

  return (
    <div className="p-2 h-full flex flex-col gap-2">
      {popupData ? popupData : ""}
      <div className="flex-grow flex gap-2 min-h-[220px]">
        <article className="flex-grow w-1/3">
          {dataSet !== null ? <InfoChartPanel title="Oil Efficiency" num={dataSet.oilEfficiency} /> : <InfoChartPanel title="Uptime" num={90} />}
        </article>
        <article className="flex-grow w-1/3">
          {dataSet !== null ? <InfoChartPanel title="Energy Efficiency" num={dataSet.energyEfficiency} /> : <InfoChartPanel title="Uptime" num={90} />}
        </article>
        <div className="flex-grow w-1/3">
        <div className='w-full h-full bg-panel border border-panelborder flex flex-col'>
            <div className="flex items-center">
              <div className="flex-grow">
                <PanelHeader text="Assets" />
              </div>
              <div className="flex-grow">
                <Alert color={getColor(100)} text="100%" oriantation="right" />
              </div>
            </div>
            <div className='w-full flex-grow flex flex-col px-3 pb-3'>
              <p className="text-[10px] text-left text-sidebaricontext">
                {getCurrentDateTime()}
              </p>
              <div className="flex-grow gap-6 flex items-center justify-center text-left">
                <div className="w-1/2">
                  <p className="text-sidebaricontext text-[12px] mb-2">Registered Equipments</p>
                  <h1 className="text-white text-3xl">{dataSet && dataSet.registeredEquipements ? dataSet.registeredEquipements : ""}</h1>
                </div>
                <div className="w-1/2">
                  <p className="text-sidebaricontext text-[12px] mb-2">Online Equipments</p>
                  <h1 className="text-white text-3xl">{dataSet && dataSet.onlineEquipments ? dataSet.onlineEquipments : ""}</h1>
                </div>
                <div className="w-1/2">
                  <p className="text-sidebaricontext text-[12px] mb-2"><br />Operators</p>
                  <h1 className="text-white text-3xl">{dataSet && dataSet.operators ? dataSet.operators : ""}</h1>
                </div>
                <div className="w-1/2">
                  <p className="text-sidebaricontext text-[12px] mb-2"><br />Locations</p>
                  <h1 className="text-white text-3xl">{dataSet && dataSet.locations ? dataSet.registeredEquipements : ""}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow-2 flex gap-2">
        <div className="flex-grow">
          <article className="w-full h-full bg-panel border border-panelborder">
            <PanelHeader text="Locations" />
            <div className="p-3">
              {tableDataType !== "" && tableListData.length > 0 ?
                <TableList dataType={tableDataType} data={tableListData} />:
                <p>No data found</p>
              }
            </div>
          </article>
        </div>
        <div className="w-1/4 flex flex-col gap-2">
          <div className="flex-grow">
            <article className="h-full">
              <div className='w-full h-full bg-panel border border-panelborder flex flex-col'>
                <div className="flex items-center">
                  <div className="flex-grow">
                    <PanelHeader text="Errors" />
                  </div>
                </div>
                <div className='w-full flex-grow flex flex-col px-3 pb-3'>
                  <p className="text-[10px] text-left text-sidebaricontext">
                    {getCurrentDateTime()}
                  </p>
                  <div className="flex-grow flex items-center justify-center text-center">
                    <div className="h-full p-3 overflow-x-auto">
                      {
                        dataSet && dataSet.errors && dataSet.errors.length > 0 ? dataSet.errors.map((err, i) => <div key={i}><Alert color="red" text={err} textSize={12} /></div>) : "-"
                      }
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
          <div className="flex-grow">
            <article className="h-full">
              <div className='w-full flex-grow h-full bg-panel border border-panelborder flex flex-col'>
                <div className="flex items-center justify-end h-[50px] px-2">
                  <button className="mr-3" onClick={showFullMap}><Icon name="fullScreen" /></button>
                  <button className="w-[85px]">
                    <Alert color={getColor(100)} text="Real time" />
                  </button>
                  <button className=""><Icon name="cog" /></button>
                </div>
                {
                  userData && userData.inventory.stores.children ? <GoogleMapComponent stores={userData.inventory.stores.children} />: ""
                }
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Operation;