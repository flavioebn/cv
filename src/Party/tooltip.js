import { Tooltip, Zoom } from "@mui/material";

const CustomTooltip = ({
  value,
  children,
  position = "bottom",
  small = false,
}) => {
  return (
    <Tooltip
      title={value}
      TransitionComponent={Zoom}
      placement={position}
      arrow
      className="class-teste"
      componentsProps={{
        tooltip: {
          sx: {
            fontSize: 16,
            overflow: "auto",
            maxHeight: "650px",
            overflowX: "hidden",
            padding: "16px",
            maxWidth: small ? "auto" : 450,
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
