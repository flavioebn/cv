import React from "react";
import arrowLeft from "../icons/arrow-left.svg";
import arrowRight from "../icons/arrow-right.svg";

const ImageViewer = ({ img, handleRight, handleLeft, close }) => {
  return (
    <div className="image-fs-container">
      <img
        src={`/images/${img.title}${img.idx}.png`}
        alt={"project.images + i"}
      />
      <button onClick={handleRight} className="right">
        <img src={arrowRight} alt="right-arrow" />
      </button>
      <button onClick={handleLeft} className="left">
        <img src={arrowLeft} alt="left-arrow" />
      </button>
      <div onClick={close} className="image-background" />
    </div>
  );
};

export default ImageViewer;
