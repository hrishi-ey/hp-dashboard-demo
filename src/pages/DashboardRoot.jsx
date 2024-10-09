import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Icon from "../components/atom/Icon";
import NavigationLink from "../components/atom/NavigationLink";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/UserSlice";
import ComingSoon from "../components/ComingSoon";
import Breadcrumbs from "../components/Breadcrumbs";
import hpLogo from "../assets/img/cont/henny-penny-logo.svg";
import search from "../assets/img/icns/search.svg";
import cog from "../assets/img/icns/cog.svg";
import hamburger from "../assets/img/icns/hamburger.svg";
import closeIconWhite from "../assets/img/icns/close-icon-white.svg";

const DashboardRoot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [comingSoon, setComingSoon] = useState(null);
  const [showSidebarText, setShowSidebarText] = useState(true);
  const [activeFooterMenu, setActiveFooterMenu] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const [showUserPopup, setShowUserPopup] = useState(false);

  const toggleSidebar = (evt) => {
    setShowSidebarText(!showSidebarText);
  }; 

  const handleLogout = () => {
    dispatch(logoutUser()).then((result) => {      
      navigate("/");
    });
  };

  const showComingSoonPopup = () => {
    setComingSoon(<div onClick={() => { setComingSoon(null); }} className="fixed left-0 top-0 right-0 bottom-0 backdrop-blur-sm bg-black/[0.5] z-40 flex items-center justify-center"><ComingSoon /></div>);
  }

  const handleToggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <article className="relative w-full h-[100lvh] overflow-y-auto">
      {comingSoon ? comingSoon : ""}
      <aside className="fixed left-0 top-0 bottom-0 w-[220px] max-w-[220px] px-[12px] border-r border-r-black hidden lg:flex flex-col bg-panel">
        <header className="w-full py-4 text-center">
          <a href="/"><img src={hpLogo} className="inline-block outline-none" alt="" /></a>
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

      { showUserPopup ? (
      <div className="absolute right-[28px] top-0 bg-panel w-[120px] border border-panelborder shadow-sm z-[150]">
        <span className={`flex w-full gap-1 items-center rounded-full px-4 leading-loose cursor-pointer`} onClick={handleLogout}>
          <Icon name="logout" size={18} />
          <span className={`grow text-white pl-2`}>Logout</span>
        </span>
      </div>) : "" }

      <main className="w-full h-full lg:pl-[220px] flex flex-col">
        {/* ========== TOP HEADER STARTS ========== */}
        <header className="fixed z-50 left-2 right-2 top-2 lg:static flex w-full h-[96px] lg:h-[74px] bg-[#18191B] items-center justify-between px-[28px] border-b border-b-black py-2">
          <Link to="/dahshboard" className="w-1/4 flex items-center">
            <span className="inline-block w-[22px] mr-1" onClick={toggleSidebar}><Icon name="dashboardBack" /></span>
            Dashboard</Link>
          <span className="popup-link w-[42px] h-[42px] rounded-full bg-hlpink text-center leading-[42px] cursor-pointer" onClick={(e) => { setShowUserPopup(!showUserPopup) }}>AM</span>
        </header>
        <section className="grow">
        <nav className="py-2 w-full px-2">
          <Breadcrumbs /> 
        </nav>
          <Outlet />
        </section>
        {/* ========== TOP HEADER ENDS ========== */}
      </main>

      {/* Mobile footer */}
      <div className={`lg:hidden bg-[#27282A] fixed left-0 bottom-[60px] right-0 transition-all duration-500 ${showMobileMenu ? "h-auto" : "h-0"}`}>
        <ul>
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
        </ul>
      </div>
      <footer className="lg:hidden fixed bottom-0 left-0 right-0 h-[60px] bg-[#27282A] flex items-center justify-between px-8">
        <button className="text-center">
          <img src={search} className={`inline-block h-[70%] transition opacity-60`} />
          <span className="block text-sidebaricontext">Search</span>
        </button>
        <button onClick={handleToggleMobileMenu}>
          { showMobileMenu ? <>
            <span className="bg-[#343434] w-[48px] h-[28px] rounded-md flex items-center justify-center">
              <img src={closeIconWhite} />
            </span>
            <span className="block text-sidebaricontext">Close</span>
          </> : <>
            <img src={hamburger} className={`inline-block h-[70%] transition opacity-60`} />
            <span className="block text-sidebaricontext">Menu</span>
          </>}
        </button>
        <button>
          <img src={cog} className={`inline-block h-[70%] transition opacity-60`} />
          <span className="block text-sidebaricontext">Settings</span>
        </button>
      </footer>
    </article>
  );
}

export default DashboardRoot;
