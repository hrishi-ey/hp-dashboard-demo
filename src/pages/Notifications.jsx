import { useSelector } from "react-redux";
import PanelHeader from "../components/atom/PanelHeader";
import TableList from "../components/TableList";
import { useState, useEffect } from "react";
import { getColor, getCurrentDateTime } from "../components/atom/Utils";
import Alert from "../components/atom/Alert";
import InfoChartPanel from "../components/InfoChartPanel";

const Notifications = () => {
  const userData = useSelector((state) => state.user.inventory);  
  const [dataSet, setDataSet] = useState(null);
  const [tableDataType, setTableDataType] = useState("");
  const [tableListData, setTableListData] = useState([]);

  useEffect(() => {
    if(userData.inventory.userType === "admin") {
      setDataSet(userData.inventory.owners);
    } else if(userData.inventory.userType === "owner") {
      setDataSet(userData.inventory.stores);
    } else if(userData.inventory.userType === "store") {
      setDataSet(userData.inventory.devices);
    }
    setTableDataType("notifications");
  }, [userData]);

  useEffect(() => {
    let filteredList = [];
    console.log(userData.inventory.devices);
    
    if(userData.inventory.devices.children.length > 0) {
      
      filteredList = userData.inventory.devices.children.filter((d) => { return d.errors && d.errors.length > 0 });
    }
    setTableListData([...filteredList]);
  }, [userData, dataSet]);

  return (
    <div className="p-2 h-full flex flex-col gap-2">
      <div className="flex-grow flex gap-2">
        <div className="flex-grow">
          <article className="w-full h-full bg-panel border border-panelborder">
            <PanelHeader text="Outstanding Errors or Predictions" />
            <div className="p-3">
              {tableDataType !== "" && tableListData.length > 0 ?
                <TableList dataType={tableDataType} data={tableListData} />:
                <p>No data found</p>
              }
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

export default Notifications;