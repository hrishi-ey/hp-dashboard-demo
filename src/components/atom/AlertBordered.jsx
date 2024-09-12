const AlertBordered = ({ color, text, oriantation = "left" }) => {
  return (
    <div className={`flex w-full items-center ${oriantation === "right" ? "justify-end pr-3" : "justify-start"}`}>
      <div className={`w-[15px] h-[15px] rounded-full ${oriantation === "right" ? "order-2 ml-3": "mr-3"} ${color === "red"? "border border-hlred" : ""} ${color === "yellow" ? "border border-hlyellow" : ""} ${color === "blue"? "border border-hlblue" : ""} ${color === "green" ? "border border-hlgreen" :  ""} ${color === "grey" ? "border border-sidebaricontext" : ""}`}></div>
      <p className={`${color === "red"? "text-hlred" : ""} ${color === "yellow" ? "text-hlyellow" : ""} ${color === "blue"? "text-hlblue" : ""} ${color === "green" ? "text-hlgreen" :  ""} ${color === "grey" ? "text-sidebaricontext": ""} text-left text-[10px] lg:text-[12px]`}>{text}</p>
    </div>
  );
}

export default AlertBordered;