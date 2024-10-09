const Pill = ({ color, text, size = "md", withAlert = false }) => {
  return <span className={`min-w-[40px] text-black text-center inline-block relative px-[1em] rounded-full font-medium ${size === "sm" ? "text-[8px] lg:text-[10px]" : "text-[10px] lg:text-[12px]"}`} style={{backgroundColor: color}}>
    {text}
    {/* { color === "red" || color === "yellow" ? <span className="bg-hlred w-[14px] h-[14px] border border-[#18191B] inline-block rounded-full absolute right-[-6px] top-[-6px]"><Icon name="alertWhite" /></span>: ""} */}
  </span>
  
}

export default Pill;