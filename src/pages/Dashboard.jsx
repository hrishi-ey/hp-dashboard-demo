import { useSelector } from "react-redux";
import PanelHeader from "../components/atom/PanelHeader";
import TableList from "../components/TableList";
import { useState, useEffect } from "react";
import InfoChartPanel from "../components/InfoChartPanel";
import Alert from "../components/atom/Alert";
import { getColor, getCurrentDateTime } from "../components/atom/Utils";
import { useParams } from "react-router-dom";
import GoogleMapComponent from "../components/atom/GoogleMapComponent";
import Icon from "../components/atom/Icon";
import MapWithFilters from "../components/MapWithFilters";
import ErrorBoundary from "../components/ErrorBoundary";
import Panel from "../components/atom/Panel";
import { getChartValues } from "../components/atom/Utils"

const Dashboard = () => {
  const userData = useSelector((state) => state.user.inventory);
  const [dataSet, setDataSet] = useState(null);
  const [tableDataType, setTableDataType] = useState("");
  const [tableListData, setTableListData] = useState([]);
  const [equipmentData, setEquipmentData] = useState({
    registeredEquipements: 0,
    onlineEquipments: 0,
    operators: 0,
    locations: 0,
  });

  const [uptime, setUptime] = useState({score: 0, indicator: 0});
  const [operation, setOperation] = useState({score: 0, indicator: 0});
  const [efficiency, setEfficiency] = useState({score: 0, indicator: 0});

  const [popupData, setPopupData] = useState(null);

  const params = useParams();
  let ownerType = null;
  let id = null;

  if(params) {
    ownerType = params.dataType || null;
    id = params.id || null;
  }

  useEffect(() => {
    var updatedData = {};
    var updatedList = [];
    var childAssets = [];
    if(ownerType !== null) {
      if(ownerType === "owner") {
        for (let index = 0; index < userData.owners.children.length; index++) {
          let element = userData.owners.children[index];
          if(element.id === id) {
            for(var k in element) {
              updatedData[k] = element[k];
            }
            if(element.childAssets.references.length > 0) {
              for(let l = 0; l < element.childAssets.references.length; l++) {
                childAssets.push(element.childAssets.references[l].managedObject.id);
              }
            }
          }
        }
        
        for (let index = 0; index < userData.stores.children.length; index++) {
          let element = userData.stores.children[index];

          if(childAssets.includes(element.id)) {
            updatedList.push(element);
          }
          // if(element.hp_OwnerOperatorId && element.hp_OwnerOperatorId === id) {
          //   updatedList.push(element);
          // }
        }
        
        setDataSet(updatedData.OwnerKPI);
        setTableListData(updatedList);
        setTableDataType("stores");
      }
      if(ownerType === "store") {
        for (let index = 0; index < userData.stores.children.length; index++) {
          let element = userData.stores.children[index];
          
          if(element.id === id) {
            for(var k in element) {
              updatedData[k] = element[k];
            }
            if(element.childAssets.references.length > 0) {
              for(let l = 0; l < element.childAssets.references.length; l++) {
                childAssets.push(element.childAssets.references[l].managedObject.id);
              }
            }
          }
        }
        for (let index = 0; index < userData.devices.children.length; index++) {
          let element = userData.devices.children[index];

          if(element.hp_StoreId && element.hp_StoreId === id) {
            updatedList.push(element);
          }
        }

        setDataSet(updatedData.storeKPI);
        setTableListData(updatedList);
        setTableDataType("devices");
      }
    } else {
      if(userData.userRole === "admin") {
        setDataSet(userData.baseData.adminKPI);
        setTableListData([...userData.owners.children]);
        setTableDataType("owners");
      } else if(userData.userRole === "owner") {
        setDataSet(userData.baseData.ownerKPI);
        setTableListData([...userData.stores.children]);
        setTableDataType("stores");
      } else if(userData.userRole === "store") {
        setDataSet(userData.baseData.storeKPI);
        setTableListData([...userData.devices.children]);
        setTableDataType("devices");
      }
      
      // for (let index = 0; index < userData.inventory.devices.children.length; index++) {
        //   const element = userData.inventory.devices.children[index];
        //   console.log(element, '--element');
        // }
      }
      
      let onlineDevices = 0;
      let operators = [];
      let locations = [];
      for (let index = 0; index < userData.devices.children.length; index++) {
        let dev = userData.devices.children[index];
        if(dev.c8y_Connection.status === "CONNECTED") {
          onlineDevices += 1;
        }
        if(!operators.includes(dev.hp_OwnerOperatorId)) {
          operators.push(dev.hp_OwnerOperatorId);
        }
        if(!locations.includes(dev.hp_Commissioning_details && dev.hp_Commissioning_details.store_details  && dev.hp_Commissioning_details.store_details.zip)) {
          locations.push(dev.hp_Commissioning_details.store_details.zip);
        }
      }
      setEquipmentData({
        registeredEquipements: userData.devices.children.length,
        onlineEquipments: onlineDevices,
        operators: operators.length,
        locations: locations.length
      });
      // eqipmentsData.registeredEquipements = userData.inventory.devices.children.length;
      
  }, [userData, params]);

  useEffect(() => {
    
    if(dataSet !== null) {
      let dType = ownerType || userData.userRole;
      setUptime(getChartValues(dataSet, dType, "Uptime"));
      setOperation(getChartValues(dataSet, dType, "Operation"));
      setEfficiency(getChartValues(dataSet, dType, "Efficiency"));
    }
  }, [dataSet]);

  const showFullMap = () => {
    setPopupData(<div onClick={() => { setPopupData(null); }} className="fixed left-0 top-0 right-0 bottom-0 backdrop-blur-sm bg-black/[0.5] z-40 flex items-center justify-center"><MapWithFilters stores={userData.inventory.stores.children} /></div>);
  }

  return (
    <>
      {popupData ? popupData : ""}
      
      <div className="p-2 h-full flex flex-col gap-2">
        <div className="flex-grow grid grid-cols-2 lg:grid-cols-4 gap-2 2xl:gap-4 min-h-[220px]">
          <article>
            {uptime !== null && <InfoChartPanel title="Uptime" num={uptime.score} indicator={uptime.indicator} />}
          </article>
          <article>
            {dataSet !== null && <InfoChartPanel title="Operation" num={operation.score} indicator={operation.indicator} />}
          </article>
          <article>
            {dataSet !== null && <InfoChartPanel title="Efficiency" num={efficiency.score} indicator={efficiency.indicator} />}
          </article>
          <article>
            <Panel>
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
                <div className="flex-grow gap-6 flex items-center text-left mt-6">
                  <div className="w-1/2">
                    <p className="text-sidebaricontext text-[10px] mb-2">Registered Equipments</p>
                    <h1 className="text-white text-3xl">{ equipmentData.registeredEquipements }</h1>
                  </div>
                  <div className="w-1/2">
                    <p className="text-sidebaricontext text-[10px] mb-2">Online Equipments</p>
                    <h1 className="text-white text-3xl">{ equipmentData.onlineEquipments }</h1>
                  </div>
                </div>
                <div className="flex-grow gap-6 flex items-center text-left mt-2">
                  <div className="w-1/2">
                    <p className="text-sidebaricontext text-[10px] mb-2">Operators</p>
                    <h1 className="text-white text-3xl">{ equipmentData.operators }</h1>
                  </div>
                  <div className="w-1/2">
                    <p className="text-sidebaricontext text-[10px] mb-2">Locations</p>
                    <h1 className="text-white text-3xl">{ equipmentData.locations }</h1>
                  </div>
                </div>
              </div>
            </Panel>
          </article>
        </div>
        <div className="flex-grow-2 grid grid-cols-1 lg:grid-cols-4 gap-2">
          <div className="col-span-3">
            <Panel>
              {tableDataType !== "" && tableDataType === "owners" && <PanelHeader text="Owner Operators" />}
              {tableDataType !== "" && tableDataType === "stores" && <PanelHeader text="Store Managers" />}
              {tableDataType !== "" && tableDataType === "devices" && <PanelHeader text="Devices" />}
              <div className="p-3">
                {tableDataType !== "" && dataSet && tableListData.length > 0 ?
                  <TableList dataType={tableDataType} data={tableListData} />:
                  <p>No data found</p>
                }
              </div>
            </Panel>
          </div>
          <div className="col-span-1 flex flex-row lg:flex-col gap-2">
            <div className="flex-grow h-1/2">
              <article className="h-full">
                <Panel>
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <PanelHeader text="Errors" />
                    </div>
                  </div>
                  <div className='w-full flex-grow flex flex-col px-3 pb-3 overflow-y-auto'>
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
                </Panel>
              </article>
            </div>
            <div className="flex-grow h-1/2">
              <article className="h-full">
                <div className='w-full flex-grow h-full rounded-lg bg-panel border border-panelborder flex flex-col'>
                  <div className="flex items-center justify-end h-[50px] px-2">
                    <button className="mr-3" onClick={showFullMap}><Icon name="fullScreen" /></button>
                    <button className="w-[85px]">
                      <Alert color={getColor(100)} text="Real time" />
                    </button>
                    <button className=""><Icon name="cog" /></button>
                  </div>
                  {
                    userData && userData.stores.children ? <GoogleMapComponent stores={userData.stores.children} />: ""
                  }
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;