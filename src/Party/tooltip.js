import { Tooltip, Zoom } from "@mui/material";

const CustomTooltip = ({ value, children }) => {
  return (
    <Tooltip
      title={value}
      TransitionComponent={Zoom}
      arrow
      componentsProps={{
        tooltip: {
          sx: {
            fontSize: 16,
            bgcolor: "#a467bd",
            "& .MuiTooltip-arrow": {
              color: "#a467bd",
            },
          },
        },
      }}
    >
      {children}
    </Tooltip>
  );
};

export default CustomTooltip;
