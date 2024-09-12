const FixedPopup = ({children}) => {
  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 blur-md bg-black/[0.8] z-40 flex items-center justify-center">
      {children}
    </div>
  );
}

export default FixedPopup;
