import { useSelector } from "react-redux";
import PanelHeader from "../components/atom/PanelHeader";
import { useState } from "react";
import InfoChartPanel from "../components/InfoChartPanel";
import Alert from "../components/atom/Alert";
import Breadcrumbs from "../components/Breadcrumbs";
import { useParams } from "react-router-dom";
import AlertBordered from "../components/atom/AlertBordered";
import Pill from "../components/atom/Pill";
import Icon from "../components/atom/Icon";
import DonutChart from "../components/atom/DonutChart";
import machine from "../assets/img/icns/machine.png";
import VatUtilization from "../components/VatUtilization";

const Device = () => {
  const userData = useSelector((state) => state.user.inventory);
  const [dataSet, setDataSet] = useState(null);
  const [tableDataType, setTableDataType] = useState("");
  const [tableListData, setTableListData] = useState<any>([]);

  const [popupData, setPopupData] = useState<ReactElement | null>(null);

  const params = useParams();
  let ownerType = null;
  let id = null;

  if(params) {
    ownerType = params.dataType || null;
    id = params.id || null;
  }

  const showVatUtilisation = () => {
    setPopupData(<div onClick={() => { setPopupData(null); }} className="fixed left-0 top-0 right-0 bottom-0 backdrop-blur-sm bg-black/[0.5] z-40 flex items-center justify-center"><VatUtilization /></div>);
  }

  return (
    <>
      {popupData ? popupData : ""}
      <nav className="py-2 w-full px-2">
        <Breadcrumbs /> 
      </nav>
      <div className="p-2 h-full flex flex-col gap-2">
        <div className="flex-grow-2 h-2/5 flex gap-2 min-h-[220px]">
          <article className="w-full h-full bg-panel border border-panelborder rounded-md flex flex-col">
            <header className="p-3 flex items-center">
              <h1 className="text-sm lg:text-base">Uptime</h1>
            </header>
            <div className="flex-grow flex items-center">
              <div className="w-1/3 flex-grow">
                <div className="text-center">
                  <div>
                    <div className="width-[100px] scale-75">
                      <DonutChart num={100} />
                    </div>
                    <Pill color="green" text="Good" size="md" />
                  </div>
                  <div>
                    <img src={machine} className="inline-block h-[72px]" />
                  </div>
                  <div className="flex justify-center">
                    <div className="flex items-center mt-6v">
                      <div className="w-[22px] h-[22px] rounded-full border border-hlblue flex items-center justify-center">
                        <Icon name="predictionsArrow" size={18} />
                      </div>
                      &nbsp; Predictions
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/3 flex-grow">
                <div className="mb-2">
                  <h2 className="text-sm font-bold">
                    Store ID:
                  </h2>
                  <p className="text-sidebaricontext text-[12px]">29448</p>
                </div>
                <div className="mb-2">
                  <h2 className="text-sm font-bold">
                    Equipment ID:
                  </h2>
                  <p className="text-sidebaricontext text-[12px]">LC2309032</p>
                </div>
                <div className="mb-2">
                  <h2 className="text-sm font-bold">
                    Model:
                  </h2>
                  <p className="text-sidebaricontext text-[12px]">LVE303FFF</p>
                </div>
                <div className="mb-2">
                  <h2 className="text-sm font-bold">
                    Equipment ID:
                  </h2>
                  <p className="text-sidebaricontext text-[12px]">LC2309032</p>
                </div>
                <div className="flex justify-center">
                  <div className="flex items-center mt-6v">
                    Service Request &nbsp;
                    <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center">
                      <Icon name="chevronRightBlue" size={18} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/3 flex-grow">
               <div className="mb-2">
                  <h2 className="text-sm font-bold">
                    Store Address:
                  </h2>
                  <p className="text-sidebaricontext text-[12px]">123, North main street, Dayton, OH 45401</p>
                </div>
                <div className="mb-2">
                  <h2 className="text-sm font-bold">
                    Warranty:
                  </h2>
                  <p className="text-sidebaricontext text-[12px]">LC2309032</p>
                </div>
                <div className="mb-2">
                  <h2 className="text-sm font-bold">
                    Service Package:
                  </h2>
                  <p className="text-sidebaricontext text-[12px]">LVE303FFF</p>
                </div>
                <div className="flex justify-center">
                  <div className="flex items-center mt-6v">
                    Ticket Status &nbsp;
                    <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center">
                      <Icon name="chevronRightBlue" size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <article className="flex-grow w-1/2 flex flex-col gap-2">
            <div className="flex-grow h-1/2 flex gap-2">
              <div className="flex-grow w-1/3">
                <InfoChartPanel title="Express Filter" num={100} scale="tiny" />
              </div>
              <div className="flex-grow w-1/3">
                <InfoChartPanel title="Daily Filter" num={80} scale="tiny" />
              </div>
              <div className="flex-grow w-1/3 relative">
                <InfoChartPanel title="Vat Utilization" num={100} scale="tiny" />
                <button onClick={showVatUtilisation} className="absolute right-2 bottom-2 inline-block cursor-pointer"><Icon name="chevronRightBlue" size={18} /></button>
              </div>
            </div>
            <div className="flex-grow h-1/2 flex gap-2">
              <div className="flex-grow w-1/3">
                <InfoChartPanel title="Oil Efficiency" num={100} scale="tiny" />
              </div>
              <div className="flex-grow w-1/3">
                <InfoChartPanel title="Energy Efficiency" num={100} scale="tiny" />
              </div>
              <div className="flex-grow w-1/3">
                <div className='w-full h-full bg-panel border border-panelborder flex flex-col'>
                  <div className="flex items-center">
                    <div className="flex-grow">
                      <PanelHeader text="Savings" textSize="tiny" />
                    </div>
                  </div>
                  <div className='w-full flex-grow flex flex-col px-3 pb-3'>
                    
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
        <div className="flex-grow-2 h-2/5 flex gap-2">
          <div className="flex-grow w-1/3">
            <article className="w-full h-full bg-panel border border-panelborder rounded-md flex flex-col">
              <header className="bg-[#27282A] p-3 flex items-center">
                <h1 className="w-1/2 text-lg lg:text-2xl">Vat 1</h1>
                <p className="w-1/2 text-right text-sm">Today</p>
              </header>
              <div className="flex-grow flex items-center justify-center">
                <div className="w-full">
                  <div className="flex items-center mb-1">
                    <p className="w-1/2 text-[12px] text-sidebaricontext text-right pr-2">
                      Cook Cycles
                    </p>
                    <h1 className="w-1/2 text-lg lg:text-2xl pl-2">
                      85
                    </h1>
                  </div>
                  <div className="flex items-center mb-1">
                    <p className="w-1/2 text-[12px] text-sidebaricontext text-right pr-2">
                      Express Filters
                    </p>
                    <h1 className="w-1/2 text-lg lg:text-2xl pl-2">
                      8
                    </h1>
                  </div>
                  <div className="flex items-center mb-1">
                    <p className="w-1/2 text-[12px] text-sidebaricontext text-right pr-2">
                      Ratio
                    </p>
                    <h1 className="w-1/2 text-lg lg:text-2xl pl-2">
                      10 <Pill color="green" text="Good" />
                    </h1>
                  </div>
                  <div className="flex items-center mb-1">
                    <p className="w-1/2 text-[12px] text-sidebaricontext text-right pr-2">
                      Maintenance Filter
                    </p>
                    <h1 className="w-1/2 text-lg lg:text-2xl pl-2">
                      1 <span className="inline-block w-18 h-18 rounded-full bg-hlgreen"><Icon name="tickBlack" /></span>
                    </h1>
                  </div>
                </div>
              </div>
              <footer className="p-3 flex items-center">
                <p className="w-1/2 text-[12px]">Yesterday</p>
                <p className="w-1/2 text-[12px] text-right">Weekly</p>
              </footer>
            </article>
          </div>
          <div className="flex-grow w-1/3">
            <article className="w-full h-full bg-panel border border-panelborder rounded-md flex flex-col">
              <header className="bg-[#27282A] p-3 flex items-center">
                <h1 className="w-1/2 text-lg lg:text-2xl">Vat 2</h1>
                <p className="w-1/2 text-right text-sm">Today</p>
              </header>
              <div className="flex-grow flex items-center justify-center">
                <div className="w-full">
                  <div className="flex items-center mb-1">
                    <p className="w-1/2 text-[12px] text-sidebaricontext text-right pr-2">
                      Cook Cycles
                    </p>
                    <h1 className="w-1/2 text-lg lg:text-2xl pl-2">
                      85
                    </h1>
                  </div>
                  <div className="flex items-center mb-1">
                    <p className="w-1/2 text-[12px] text-sidebaricontext text-right pr-2">
                      Express Filters
                    </p>
                    <h1 className="w-1/2 text-lg lg:text-2xl pl-2">
                      8
                    </h1>
                  </div>
                  <div className="flex items-center mb-1">
                    <p className="w-1/2 text-[12px] text-sidebaricontext text-right pr-2">
                      Ratio
                    </p>
                    <h1 className="w-1/2 text-lg lg:text-2xl pl-2">
                      10 <Pill color="red" text="Caution" />
                    </h1>
                  </div>
                  <div className="flex items-center mb-1">
                    <p className="w-1/2 text-[12px] text-sidebaricontext text-right pr-2">
                      Maintenance Filter
                    </p>
                    <h1 className="w-1/2 text-lg lg:text-2xl pl-2">
                      1 <span className="inline-block w-18 h-18 rounded-full bg-hlred"><Icon name="tickBlack" /></span>
                    </h1>
                  </div>
                </div>
              </div>
              <footer className="p-3 flex items-center">
                <p className="w-1/2 text-[12px]">Yesterday</p>
                <p className="w-1/2 text-[12px] text-right">Weekly</p>
              </footer>
            </article>
          </div>
          <div className="flex-grow w-1/3">
          <article className="w-full h-full bg-panel border border-panelborder rounded-md flex flex-col">
              <header className="bg-[#27282A] p-3 flex items-center">
                <h1 className="w-1/2 text-lg lg:text-2xl">Vat 3</h1>
                <p className="w-1/2 text-right text-sm">Today</p>
              </header>
              <div className="flex-grow flex items-center justify-center">
                <div className="w-full">
                  <div className="flex items-center mb-1">
                    <p className="w-1/2 text-[12px] text-sidebaricontext text-right pr-2">
                      Cook Cycles
                    </p>
                    <h1 className="w-1/2 text-lg lg:text-2xl pl-2">
                      85
                    </h1>
                  </div>
                  <div className="flex items-center mb-1">
                    <p className="w-1/2 text-[12px] text-sidebaricontext text-right pr-2">
                      Express Filters
                    </p>
                    <h1 className="w-1/2 text-lg lg:text-2xl pl-2">
                      8
                    </h1>
                  </div>
                  <div className="flex items-center mb-1">
                    <p className="w-1/2 text-[12px] text-sidebaricontext text-right pr-2">
                      Ratio
                    </p>
                    <h1 className="w-1/2 text-lg lg:text-2xl pl-2">
                      10 <Pill color="red" text="Caution" />
                    </h1>
                  </div>
                  <div className="flex items-center mb-1">
                    <p className="w-1/2 text-[12px] text-sidebaricontext text-right pr-2">
                      Maintenance Filter
                    </p>
                    <h1 className="w-1/2 text-lg lg:text-2xl pl-2">
                      1 <span className="inline-block w-18 h-18 rounded-full bg-hlred"><Icon name="tickBlack" /></span>
                    </h1>
                  </div>
                </div>
              </div>
              <footer className="p-3 flex items-center">
                <p className="w-1/2 text-[12px]">Yesterday</p>
                <p className="w-1/2 text-[12px] text-right">Weekly</p>
              </footer>
            </article>
          </div>
        </div>
        <div className="flex-grow h-1/5 flex gap-2">
          <div className='w-full h-full bg-panel border border-panelborder flex flex-col'>
            <header className="p-3">
              <h1 className="text-white text-base lg:text-xs xl:text-sm font-light">Errors</h1>
            </header>
            <div className='w-full flex-grow flex flex-col px-3 pb-3'>
              <div className="mb-2"><Alert color="red" text="Unoptimized well usage" /></div>
              <div className="mb-2"><Alert color="red" text="Insufficient express oil filters" /></div>
            </div>
          </div>
          <div className='w-full h-full bg-panel border border-panelborder flex flex-col'>
            <header className="p-3">
              <h1 className="text-white text-base lg:text-xs xl:text-sm font-light">Usage Tips</h1>
            </header>
            <div className='w-full flex-grow flex flex-col px-3 pb-3'>
              <div className="mb-2">
                <AlertBordered color="grey" text="Using all vats during the day" />
              </div>
              <div className="mb-2">
                <AlertBordered color="grey" text="Express filtering every 12 cooks" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Device;