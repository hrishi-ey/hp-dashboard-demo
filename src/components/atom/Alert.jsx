const Alert = ({ color, text, oriantation = "left" }) => {
  return (
    <div className={`flex w-full items-center ${oriantation === "right" ? "justify-end pr-3" : "justify-start"}`}>
      <div className={`w-[12px] h-[12px] rounded-full ${oriantation === "right" ? "order-2 ml-3": "mr-3"} ${color === "red"? "bg-hlred" : ""} ${color === "yellow" ? "bg-hlyellow" : ""} ${color === "blue"? "bg-hlblue" : ""} ${color === "green" ? "bg-hlgreen" :  ""}`}></div>
      <p className={`text-[12px] text-left ${color === "red"? "text-hlred" : ""} ${color === "yellow" ? "text-hlyellow" : ""} ${color === "blue"? "text-hlblue" : ""} ${color === "green" ? "text-hlgreen" :  ""}`}>{text}</p>
    </div>
  );
}

export default Alert;