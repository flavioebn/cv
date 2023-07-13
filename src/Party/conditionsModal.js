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
            // <Tooltip
            //   title={i.name}
            //   TransitionComponent={Zoom}
            //   arrow
            //   componentsProps={{
            //     tooltip: {
            //       sx: {
            //         fontSize: 16,
            //         bgcolor: "#a467bd",
            //         "& .MuiTooltip-arrow": {
            //           color: "#a467bd",
            //         },
            //       },
            //     },
            //   }}
            // >
            //   <img onClick={() => onAdd(i)} src={i.icon} alt={i.name} />
            // </Tooltip>
          );
        })}
      </div>
    </Modal>
  );
};

export default ConditionsModal;
