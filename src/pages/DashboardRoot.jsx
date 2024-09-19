import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Icon from "../components/atom/Icon";
import NavigationLink from "../components/atom/NavigationLink";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/UserSlice";
import ComingSoon from "../components/ComingSoon";
import Breadcrumbs from "../components/Breadcrumbs";

const DashboardRoot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [comingSoon, setComingSoon] = useState(null);

  const [showUserPopup, setShowUserPopup] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser()).then((result) => {
      navigate("/");
    });
  };

  const showComingSoonPopup = () => {
    setComingSoon(<div onClick={() => { setComingSoon(null); }} className="fixed left-0 top-0 right-0 bottom-0 backdrop-blur-sm bg-black/[0.5] z-40 flex items-center justify-center"><ComingSoon /></div>);
  }

  return (
    <article className="relative w-full h-[100lvh] overflow-y-auto">
      {comingSoon ? comingSoon : ""}
      <aside className="fixed left-0 top-0 bottom-0 w-[220px] max-w-[220px] px-[12px] border-r border-r-black flex flex-col bg-panel">
        <header className="w-full py-4 text-center">
          <a href="/"><img src="/src/assets/img/cont/henny-penny-logo.svg" className="inline-block outline-none" alt="" /></a>
        </header>
        <nav className="grow w-full">
          <ul className="w-full">
            <li className="py-2">
              <div onClick={() => { showComingSoonPopup(); }}>
                <NavigationLink icon="search" text="Search" />  
              </div>
            </li>
            <li className="py-2">
              <NavLink to="/dashboard" end>
                {({isActive}) => <NavigationLink isActive={isActive} icon="dashboard" text="Dashboard" />}  
              </NavLink>
            </li>
            <li className="py-2">
              <NavLink to="/dashboard/assets" end>
                {({isActive}) => <NavigationLink isActive={isActive} icon="assets" text="Assets" />}  
              </NavLink>
            </li>
            <li className="py-2">
              <NavLink to="/dashboard/uptime" end>
                {({isActive}) => <NavigationLink isActive={isActive} icon="uptime" text="Uptime" />}  
              </NavLink>
            </li>
            <li className="py-2">
              <NavLink to="/dashboard/operation" end>
                {({isActive}) => <NavigationLink isActive={isActive} icon="operation" text="Operation" />}  
              </NavLink>
            </li>
            <li className="py-2">
              <NavLink to="/dashboard/efficiency" end>
                {({isActive}) => <NavigationLink isActive={isActive} icon="efficiency" text="Efficiency" />}  
              </NavLink>
            </li>
            <li className="py-2">
              <div onClick={() => { showComingSoonPopup(); }}>
                <NavigationLink icon="messages" text="Messages" />  
              </div>
            </li>
            <li className="py-2">
              <NavLink to="/dashboard/notifications" end>
                {({isActive}) => <NavigationLink isActive={isActive} icon="notifications" text="Notifications" />}  
              </NavLink>
            </li>
            <li className="py-2">
              <div onClick={() => { showComingSoonPopup(); }}>
                <NavigationLink icon="settings" text="settings" />
              </div>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="w-full h-full pl-[220px] flex flex-col">
        {/* ========== TOP HEADER STARTS ========== */}
        <header className="w-full h-[74px] bg-altdark flex items-center justify-between px-[28px] border-b border-b-black relative py-2">
          <Link to="/dahshboard" className="w-1/4 flex items-center">
            <span className="inline-block w-[22px] mr-1"><Icon name="dashboardBack" /></span>
            Dashboard</Link>
          <span className="popup-link w-[42px] h-[42px] rounded-full bg-hlpink text-center leading-[42px] cursor-pointer" onClick={(e) => { setShowUserPopup(!showUserPopup) }}>AM</span>
          { showUserPopup ? (
            <div className="absolute right-[28px] top-[100%] bg-panel w-[120px] border border-panelborder shadow-sm">
              <span className={`flex w-full gap-1 items-center rounded-full px-4 leading-loose cursor-pointer`} onClick={handleLogout}>
                <Icon name="logout" size={18} />
                <span className={`grow text-white pl-2`}>Logout</span>
              </span>
            </div>) : "" }
        </header>
        <section className="grow">
        <nav className="py-2 w-full px-2">
          <Breadcrumbs /> 
        </nav>
          <Outlet />
        </section>
        {/* ========== TOP HEADER ENDS ========== */}
      </main>
    </article>
  );
}

export default DashboardRoot;
