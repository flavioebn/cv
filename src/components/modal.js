const Modal = ({ children, close, classes, diary }) => {
  return (
    <>
      <div className={`modal ${classes} ${diary && "diary"}`}>{children}</div>
      <div className="modalBackground" onClick={close} />
    </>
  );
};

export default Modal;
