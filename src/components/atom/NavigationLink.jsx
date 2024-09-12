import Icon from "./Icon";

const NavigationLink = ({isActive, icon, text}) => {
  return (
    <span className={`flex items-center ${isActive ? "bg-hlblue" : ""} rounded-full px-4 leading-loose`}>
      <Icon name={icon} size={18} isActive={isActive} />
      <span className={`grow ${isActive ? "text-white" : "text-sidebaricontext"} pl-2`}>{text}</span>
    </span>
  );
}

export default NavigationLink;