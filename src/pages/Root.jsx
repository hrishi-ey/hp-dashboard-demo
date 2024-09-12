import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="w-full h-[100lvh] flex">
      <Outlet />
    </div>
  );
}

export default Root;
