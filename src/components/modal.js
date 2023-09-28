const Modal = ({ children, close, classes }) => {
  return (
    <>
      <div className={`modal ${classes}`}>{children}</div>
      <div className="modalBackground" onClick={close} />
    </>
  );
};

export default Modal;
