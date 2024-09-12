const PanelHeader = ({ text, textSize = "normal" }) => {
  return (
    <header className="p-3">
      <h1 className={`text-white ${textSize === "tiny"? "text-[10px] lg:text-[12px]" : "text-sm lg:text-base xl:text-xl"} font-light`}>{text}</h1>
    </header>
  );
}

export default PanelHeader;