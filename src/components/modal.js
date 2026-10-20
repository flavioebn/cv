const Modal = ({ children, close, classes, diary, youtube, flex = true }) => {
  return (
    <>
      <div
        className={`modal ${classes} ${diary && "diary"} ${flex && "flex"} ${
          youtube && "youtube"
        }`}
      >
        {children}
      </div>
      <div className="modalBackground" onClick={close} />
    </>
  );
};

export default Modal;
