const Modal = ({ children, close }) => {
  return (
    <>
      <div className="modal">{children}</div>
      <div className="modalBackground" onClick={close} />
    </>
  );
};

export default Modal;
