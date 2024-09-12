import showHide from "../../assets/img/icns/showHide.svg"
import eyeOpen from "../../assets/img/icns/eyeOpen.svg"
import dashboardBack from "../../assets/img/icns/dashboardBack.svg"
import search from "../../assets/img/icns/search.svg"
import dashboard from "../../assets/img/icns/dashboard.svg"
import assets from "../../assets/img/icns/assets.svg"
import uptime from "../../assets/img/icns/uptime.svg"
import operation from "../../assets/img/icns/operation.svg"
import efficiency from "../../assets/img/icns/efficiency.svg"
import messages from "../../assets/img/icns/messages.svg"
import notifications from "../../assets/img/icns/notifications.svg"
import settings from "../../assets/img/icns/settings.svg"
import alertWhite from "../../assets/img/icns/alertWhite.svg"
import predictionsArrow from "../../assets/img/icns/predictionsArrow.svg"
import linkChevronRight from "../../assets/img/icns/linkChevronRight.svg"
import fullScreen from "../../assets/img/icns/fullScreen.svg"
import cog from "../../assets/img/icns/cog.svg"
import questionMarkWhite from "../../assets/img/icns/questionMarkWhite.svg"
import chevronDown from "../../assets/img/icns/chevronDown.svg"
import closeBlue from "../../assets/img/icns/closeBlue.svg"
import filter from "../../assets/img/icns/filter.svg"
import chevronRightBlue from "../../assets/img/icns/chevronRightBlue.svg"
import arrowUprightBlack from "../../assets/img/icns/arrowUprightBlack.svg"
import tickBlack from "../../assets/img/icns/tickBlack.svg"
import hamburger from "../../assets/img/icns/hamburger.svg"
import logout from "../../assets/img/icns/logout.svg"

const Icon = ({ name, size = 20, isActive = true }) => {
  if(name === "showHide") {
    return <span className="flex items-center justify-center" style={{width: size + "px", height: size + "px"}}><img src={showHide} className={`inline-block h-[70%] transition ${isActive? "opacity-1" : "opacity-75"}`} /></span>
  }if(name === "eyeOpen") {
    return <span className="flex items-center justify-center" style={{width: size + "px", height: size + "px"}}><img src={eyeOpen} className={`inline-block h-[70%] transition ${isActive? "opacity-1" : "opacity-75"}`} /></span>
  } else if(name === "dashboardBack") {
    return <span className="flex items-center justify-center" style={{width: size + "px", height: size + "px"}}><img src={dashboardBack} className={`inline-block h-[70%] transition ${isActive? "opacity-1" : "opacity-75"}`} /></span>
  } else if(name === "search") {
    return <span className="flex items-center justify-center" style={{width: size + "px", height: size + "px"}}><img src={search} className={`inline-block h-[70%] transition ${isActive? "opacity-1" : "opacity-75"}`} /></span>
  } else if(name === "dashboard") {
    return <span className="flex items-center justify-center" style={{width: size + "px", height: size + "px"}}><img src={dashboard} className={`inline-block h-[70%] transition ${isActive? "opacity-1" : "opacity-75"}`} /></span>
  } else if(name === "assets") {
    return <span className="flex items-center justify-center" style={{width: size + "px", height: size + "px"}}><img src={assets} className={`inline-block h-[70%] transition ${isActive? "opacity-1" : "opacity-75"}`} /></span>
  } else if(name === "uptime") {
    return <span className="flex items-center justify-center" style={{width: size + "px", height: size + "px"}}><img src={uptime} className={`inline-block h-[70%] transition ${isActive? "opacity-1" : "opacity-75"}`} /></span>
  } else if(name === "operation") {
    return <span className="flex items-center justify-center" style={{width: size + "px", height: size + "px"}}><img src={operation} className={`inline-block h-[70%] transition ${isActive? "opacity-1" : "opacity-75"}`} /></span>
  } else if(name === "efficiency") {
    return <span className="flex items-center justify-center" style={{width: size + "px", height: size + "px"}}><img src={efficiency} className={`inline-block h-[70%] transition ${isActive? "opacity-1" : "opacity-75"}`} /></span>
  } else if(name === "messages") {
    return <span className="flex items-center justify-center" style={{width: size + "px", height: size + "px"}}><img src={messages} className={`inline-block h-[70%] transition ${isActive? "opacity-1" : "opacity-75"}`} /></span>
  } else if(name === "notifications") {
    return <span className="flex items-center justify-center" style={{width: size + "px", height: size + "px"}}><img src={notifications} className={`inline-block h-[70%] transition ${isActive? "opacity-1" : "opacity-75"}`} /></span>
  } else if(name === "settings") {
    return <span className="flex items-center justify-center" style={{width: size + "px", height: size + "px"}}><img src={settings} className={`inline-block h-[70%] transition ${isActive? "opacity-1" : "opacity-75"}`} /></span>
  } else if(name === "alertWhite") {
    return <span className="flex items-center justify-center" style={{width: size + "px", height: size + "px"}}><img src={alertWhite} className={`inline-block h-[50%] transition ${isActive? "opacity-1" : "opacity-75"}`} /></span>
  } else if(name === "predictionsArrow") {
    return <span className="flex items-center justify-center" style={{width: size + "px", height: size + "px"}}><img src={predictionsArrow} className={`inline-block h-[40%] transition ${isActive? "opacity-1" : "opacity-75"}`} /></span>
  } else if(name === "linkChevronRight") {
    return <span className="flex items-center justify-center" style={{width: size + "px", height: size + "px"}}><img src={linkChevronRight} className={`inline-block h-[70%] transition ${isActive? "opacity-1" : "opacity-75"}`} /></span>
  } else if(name === "fullScreen") {
    return <span className="flex items-center justify-center" style={{width: size + "px", height: size + "px"}}><img src={fullScreen} className={`inline-block h-[70%] transition ${isActive? "opacity-1" : "opacity-75"}`} /></span>
  } else if(name === "cog") {
    return <span className="flex items-center justify-center" style={{width: size + "px", height: size + "px"}}><img src={cog} className={`inline-block h-[70%] transition ${isActive? "opacity-1" : "opacity-75"}`} /></span>
  } else if(name === "questionMarkWhite") {
    return <span className="flex items-center justify-center" style={{width: size + "px", height: size + "px"}}><img src={questionMarkWhite} className={`inline-block h-[70%] transition ${isActive? "opacity-1" : "opacity-75"}`} /></span>
  } else if(name === "chevronDown") {
    return <span className="flex items-center justify-center" style={{width: size + "px", height: size + "px"}}><img src={chevronDown} className={`inline-block h-[70%] transition ${isActive? "opacity-1" : "opacity-75"}`} /></span>
  } else if(name === "closeBlue") {
    return <span className="flex items-center justify-center" style={{width: size + "px", height: size + "px"}}><img src={closeBlue} className={`inline-block h-[70%] transition ${isActive? "opacity-1" : "opacity-75"}`} /></span>
  } else if(name === "filter") {
    return <span className="flex items-center justify-center" style={{width: size + "px", height: size + "px"}}><img src={filter} className={`inline-block h-[70%] transition ${isActive? "opacity-1" : "opacity-75"}`} /></span>
  } else if(name === "chevronRightBlue") {
    return <span className="flex items-center justify-center" style={{width: size + "px", height: size + "px"}}><img src={chevronRightBlue} className={`inline-block h-[70%] transition ${isActive? "opacity-1" : "opacity-75"}`} /></span>
  } else if(name === "arrowUprightBlack") {
    return <span className="flex items-center justify-center" style={{width: size + "px", height: size + "px"}}><img src={arrowUprightBlack} className={`inline-block h-[70%] transition ${isActive? "opacity-1" : "opacity-75"}`} /></span>
  } else if(name === "tickBlack") {
    return <span className="flex items-center justify-center" style={{width: size + "px", height: size + "px"}}><img src={tickBlack} className={`inline-block h-[50%] transition ${isActive? "opacity-1" : "opacity-75"}`} /></span>
  } else if(name === "hamburger") {
    return <span className="flex items-center justify-center" style={{width: size + "px", height: size + "px"}}><img src={hamburger} className={`inline-block h-[70%] transition ${isActive? "opacity-1" : "opacity-75"}`} /></span>
  } else if(name === "logout") {
    return <span className="flex items-center justify-center" style={{width: size + "px", height: size + "px"}}><img src={logout} className={`inline-block h-[70%] transition ${isActive? "opacity-1" : "opacity-75"}`} /></span>
  }
}

export default Icon;