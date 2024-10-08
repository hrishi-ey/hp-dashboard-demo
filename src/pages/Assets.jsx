import { useSelector } from "react-redux";
import PanelHeader from "../components/atom/PanelHeader";
import TableList from "../components/TableList";
import { useState, useEffect } from "react";
import { getColor, getCurrentDateTime } from "../components/atom/Utils";
import Alert from "../components/atom/Alert";
import Icon from "../components/atom/Icon";
import { useParams } from "react-router-dom";
import GoogleMapComponent from "../components/atom/GoogleMapComponent";
import MapWithFilters from "../components/MapWithFilters";
import Panel from "../components/atom/Panel"

const Assets = () => {
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

  const [popupData, setPopupData] = useState(null);

  const params = useParams();
  let ownerType = null;
  let id = null;

  if(params) {
    ownerType = params.dataType || null;
    id = params.id || null;
  }

  useEffect(() => {
    if(userData) {
      setDataSet(userData.devices);
      setTableListData([...userData.devices.children]);
      setTableDataType("assets");
    }
    let onlineDevices = 0;
      let operators = [];
      let loc = [];
      for (let index = 0; index < userData.devices.children.length; index++) {
        let dev = userData.devices.children[index];
        if(dev.c8y_Connection.status === "CONNECTED") {
          onlineDevices += 1;
        }
        if(!operators.includes(dev.hp_OwnerOperatorId)) {
          operators.push(dev.hp_OwnerOperatorId);
        }
        // if(!locations.includes(dev.address.line1)) {
        //   locations.push(dev.address.line1);
        // }
      }
      
      setEquipmentData({
        registeredEquipements: userData.devices.children.length,
        onlineEquipments: onlineDevices,
        operators: operators.length,
        locations: loc.length
      });
  }, [userData]);

  const showFullMap = () => {
    setPopupData(<div onClick={() => { setPopupData(null); }} className="fixed left-0 top-0 right-0 bottom-0 backdrop-blur-sm bg-black/[0.5] z-40 flex items-center justify-center"><MapWithFilters stores={userData.inventory.stores.children} /></div>);
  }

  return (
    <div className="p-2 h-full flex flex-col gap-2">
      {popupData ? popupData : ""}
      <div className="flex-grow flex gap-2 min-h-[220px]">
        <article className="flex-grow w-1/2">
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
              <div className="flex-grow gap-6 flex items-center justify-center text-left">
                <div className="">
                  <p className="text-sidebaricontext text-[12px] mb-2">Registered Equipments</p>
                  <h1 className="text-white text-3xl">{equipmentData.registeredEquipements}</h1>
                </div>
                <div className="">
                  <p className="text-sidebaricontext text-[12px] mb-2">Online Equipments</p>
                  <h1 className="text-white text-3xl">{equipmentData.onlineEquipments}</h1>
                </div>
                <div className="">
                  <p className="text-sidebaricontext text-[12px] mb-2">Operators</p>
                  <h1 className="text-white text-3xl">{equipmentData.operators}</h1>
                </div>
                <div className="">
                  <p className="text-sidebaricontext text-[12px] mb-2">Locations</p>
                  <h1 className="text-white text-3xl">{equipmentData.locations}</h1>
                </div>
              </div>
            </div>
          </Panel>
        </article>
        <article className="flex-grow w-1/2">
          <Panel>
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
          </Panel>
        </article>
      </div>
      <div className="flex-grow-2 flex gap-2">
        <div className="flex-grow">
          <Panel>
            <PanelHeader text="Assets" />
            <div className="p-3">
              {tableDataType !== "" && tableListData.length > 0 ?
                <TableList dataType={tableDataType} data={tableListData} />:
                <p>No data found</p>
              }
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

export default Assets;