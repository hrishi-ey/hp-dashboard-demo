import { useSelector } from "react-redux";
import PanelHeader from "../components/atom/PanelHeader";
import TableList from "../components/TableList";
import { useState, useEffect } from "react";
import InfoChartPanel from "../components/InfoChartPanel";
import Alert from "../components/atom/Alert";
import { getColor, getCurrentDateTime } from "../components/atom/Utils";
import Breadcrumbs from "../components/Breadcrumbs";
import { useParams } from "react-router-dom";
import GoogleMapComponent from "../components/atom/GoogleMapComponent";
import Icon from "../components/atom/Icon";
import MapWithFilters from "../components/MapWithFilters";
import ErrorBoundary from "../components/ErrorBoundary";

const Dashboard = () => {
  const userData = useSelector((state) => state.user.inventory);
  const [dataSet, setDataSet] = useState(null);
  const [tableDataType, setTableDataType] = useState("");
  const [tableListData, setTableListData] = useState([]);

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
    if(ownerType !== null) {
      if(ownerType === "owner") {
        for (let index = 0; index < userData.inventory.owners.children.length; index++) {
          let element = userData.inventory.owners.children[index];
          if(element.id === id) {
            for(var k in element) {
              updatedData[k] = element[k];
            }
          }
        }
        for (let index = 0; index < userData.inventory.stores.children.length; index++) {
          let element = userData.inventory.stores.children[index];
          if(element.hp_OwnerOperatorId && element.hp_OwnerOperatorId === id) {
            updatedList.push(element);
          }
        }
        setDataSet(updatedData);
        setTableListData(updatedList);
        setTableDataType("stores");
      }
      if(ownerType === "store") {
        
        for (let index = 0; index < userData.inventory.stores.children.length; index++) {
          let element = userData.inventory.stores.children[index];
          
          if(element.id === id) {
            for(var k in element) {
              updatedData[k] = element[k];
            }
          }
        }
        for (let index = 0; index < userData.inventory.devices.children.length; index++) {
          let element = userData.inventory.devices.children[index];
          
          if(element.parentId && element.parentId === id) {
            updatedList.push(element);
          }
        }
        
        setDataSet(updatedData);
        setTableListData(updatedList);
        setTableDataType("devices");
      }
    } else {
      if(userData.inventory.userType === "admin") {
        setDataSet(userData.inventory.owners);
        setTableListData([...userData.inventory.owners.children]);
        setTableDataType("owners");
      } else if(userData.inventory.userType === "owner") {
        setDataSet(userData.inventory.stores);
        setTableListData([...userData.inventory.stores.children]);
        setTableDataType("stores");
      } else if(userData.inventory.userType === "store") {
        setTableListData([...userData.inventory.devices.children]);
        setDataSet(userData.inventory.devices);
        setTableDataType("devices");
      }
    }
  }, [userData, params]);

  const showFullMap = () => {
    setPopupData(<div onClick={() => { setPopupData(null); }} className="fixed left-0 top-0 right-0 bottom-0 backdrop-blur-sm bg-black/[0.5] z-40 flex items-center justify-center"><MapWithFilters stores={userData.inventory.stores.children} /></div>);
  }

  return (
    <>
      {popupData ? popupData : ""}
      {/* <nav className="py-2 w-full px-2">
        <Breadcrumbs /> 
      </nav> */}
      <div className="p-2 h-full flex flex-col gap-2">
        <div className="flex-grow flex gap-2 min-h-[220px]">
          <article className="flex-grow w-1/4">
            {dataSet !== null ? <InfoChartPanel title="Uptime" num={dataSet.uptime} /> : <InfoChartPanel title="Uptime" num={90} />}
          </article>
          <article className="flex-grow w-1/4">
            {dataSet !== null ? <InfoChartPanel title="Operation" num={dataSet.operation} /> : <InfoChartPanel title="Operation" num={70} />}
          </article>
          <article className="flex-grow w-1/4">
            {dataSet !== null ? <InfoChartPanel title="Efficiency" num={dataSet.efficiency} /> : <InfoChartPanel title="Efficiency" num={90} />}
          </article>
          <article className="flex-grow w-1/4">
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
                <div className="flex-grow flex items-center justify-center text-center">
                  <span>
                    <div className="flex items-center justify-end mb-3">
                      <span className="text-sidebaricontext">Registered</span>
                      <span className="text-white text-3xl pl-4">{dataSet && dataSet.registeredEquipements ? dataSet.registeredEquipements : 4}</span>
                    </div>
                    <div className="flex items-center justify-end">
                      <span className="text-sidebaricontext">Online</span>
                      <span className="text-white text-3xl pl-4">{dataSet && dataSet.onlineEquipments ? dataSet.onlineEquipments : 4}</span>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>
        <div className="flex-grow-2 flex gap-2">
          <div className="flex-grow">
            <article className="w-full h-full bg-panel border border-panelborder">
              {tableDataType !== "" && tableDataType === "owners" && <PanelHeader text="Owner Operators" />}
              {tableDataType !== "" && tableDataType === "stores" && <PanelHeader text="Store Managers" />}
              {tableDataType !== "" && tableDataType === "devices" && <PanelHeader text="Devices" />}
              <div className="p-3">
                {tableDataType !== "" && dataSet && tableListData.length > 0 ?
                  <TableList dataType={tableDataType} data={tableListData} />:
                  <p>No data found</p>
                }
              </div>
            </article>
          </div>
          <div className="w-1/4 flex flex-col gap-2">
            <div className="flex-grow h-1/2">
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
            <div className="flex-grow h-1/2">
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
                    userData && userData.inventory.stores.children ? <ErrorBoundary><GoogleMapComponent stores={userData.inventory.stores.children} /></ErrorBoundary>: ""
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