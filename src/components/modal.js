const Modal = ({ children, close, classes, diary, youtube }) => {
  return (
    <>
      <div
        className={`modal ${classes} ${diary && "diary"} ${
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
