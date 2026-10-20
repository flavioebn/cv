import Modal from "../components/modal";
import { conditions } from "./data";
import CustomTooltip from "./tooltip";

const ConditionsModal = ({ close, onAdd }) => {
  return (
    <Modal close={close}>
      <h1>Conditions</h1>
      <div className="conditions-container">
        {conditions.map((i) => {
          return (
            <CustomTooltip value={i.name}>
              <img onClick={() => onAdd(i)} src={i.icon} alt={i.name} />
            </CustomTooltip>
          );
        })}
      </div>
    </Modal>
  );
};

export default ConditionsModal;
