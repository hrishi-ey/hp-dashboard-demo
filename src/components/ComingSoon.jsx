import Icon from "./atom/Icon";

const ComingSoon = () => {
  return (
    <div className="w-8/12 h-[60%] bg-black border border-white/[0.5] p-4 rounded-lg flex items-center justify-center relative">
      <button className="w-[28px] h-[28px] rounded-full border border-hlblue flex items-center justify-center absolute right-4 top-4">
        <Icon name="closeBlue" size={14} />
      </button>
      <span className='inline-block text-[48px] font-light text-center'>Coming Soon</span>
    </div>
  );
}

export default ComingSoon;
