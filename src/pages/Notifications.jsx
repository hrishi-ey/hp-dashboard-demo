import { useSelector } from "react-redux";
import PanelHeader from "../components/atom/PanelHeader";
import TableList from "../components/TableList";
import { useState, useEffect } from "react";
import { getColor, getCurrentDateTime } from "../components/atom/Utils";
import Alert from "../components/atom/Alert";
import InfoChartPanel from "../components/InfoChartPanel";
import Panel from "../components/atom/Panel"
import { useParams } from "react-router-dom";

const Notifications = () => {
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
      setDataSet(userData.baseData);
      setTableListData([...userData.devices.children]);
      setTableDataType("notifications");
      
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
    }
  }, [userData]);

  useEffect(() => {
    let filteredList = [];
    
    if(userData.devices.children.length > 0) {
      filteredList = userData.devices.children.filter((d) => { return d.errors && d.errors.length > 0 });
    }
    setTableListData([...filteredList]);
  }, [userData, dataSet]);

  return (
    <div className="p-2 h-full flex flex-col gap-2">
      <div className="flex-grow flex gap-2">
        <div className="flex-grow">
          <Panel>
            <PanelHeader text="Outstanding Errors or Predictions" />
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

export default Notifications;