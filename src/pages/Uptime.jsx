import { useSelector } from "react-redux";
import PanelHeader from "../components/atom/PanelHeader";
import TableList from "../components/TableList";
import { useState, useEffect } from "react";
import { getColor, getCurrentDateTime } from "../components/atom/Utils";
import Alert from "../components/atom/Alert";
import WorldMap from "../components/WorldMap";

const Uptime = () => {
  const userData = useSelector((state) => state.user.inventory);  
  const [dataSet, setDataSet] = useState(null);
  const [tableDataType, setTableDataType] = useState("");
  const [tableListData, setTableListData] = useState<any>([]);

  useEffect(() => {
    if(userData.inventory.userType === "admin") {
      setDataSet(userData.inventory.owners);
    } else if(userData.inventory.userType === "owner") {
      setDataSet(userData.inventory.stores);
    } else if(userData.inventory.userType === "store") {
      setDataSet(userData.inventory.devices);
    }
    setTableDataType("uptime");
    setTableListData([...userData.inventory.devices.children]);
  }, [userData]);

  // useEffect(() => {
  //   console.log(tableListData, tableDataType, dataSet);
    
  // }, [tableListData]);

  return (
    <div className="p-2 h-full flex flex-col gap-2">
      <div className="flex-grow flex gap-2 min-h-[220px]">
        <article className="flex-grow w-1/2">
          <div className='w-full h-full bg-panel border border-panelborder flex flex-col'>
            <div className="flex">
              <div className="flex-grow">
                <PanelHeader text="Active Errors" />
              </div>
            </div>
            <div className='w-full flex-grow flex flex-col px-3 pb-3'>
              <p className="text-[10px] text-left text-sidebaricontext">
                {getCurrentDateTime()}
              </p>
              <div className="flex-grow flex items-center">
                <div className="h-full p-3 overflow-x-auto">
                  {
                    dataSet && dataSet.errors && dataSet.errors.length > 0 ? dataSet.errors.map((err, i) => <div key={i}><Alert color="red" text={err} textSize={12} /></div>) : "-"
                  }
                </div>
              </div>
            </div>
          </div>
        </article>
        <article className="flex-grow w-1/2">
          <div className='w-full h-full bg-panel border border-panelborder flex flex-col'>
            <div className="flex">
              <div className="flex-grow">
                <PanelHeader text="Potential Issues" />
              </div>
            </div>
            <div className='w-full flex-grow flex flex-col px-3 pb-3'>
              <p className="text-[10px] text-left text-sidebaricontext">
                {getCurrentDateTime()}
              </p>
              <div className="flex-grow flex items-center">
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
      <div className="flex-grow-2 flex gap-2">
        <div className="flex-grow-2">
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
        <div className="flex-grow">
          <div className="w-full h-full bg-panel border border-panelborder">
            <WorldMap />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Uptime;