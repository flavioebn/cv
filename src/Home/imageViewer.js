import React from "react";
import arrowLeft from "../assets/icons/arrow-left.svg";
import arrowRight from "../assets/icons/arrow-right.svg";

const ImageViewer = ({ img, handleRight, handleLeft, close }) => {
  const [open, setOpen] = React.useState(false);
  const [idx, setIdx] = React.useState(0);
  const [image, setImage] = React.useState();

  const handleImage = (i) => {
    setIdx(i);
    setImage(img.images[i]);
    setOpen(true);
  };

  const RenderImages = () => {
    return img.images.map((i, index) => {
      return (
        <img
          className="thumb"
          onClick={(i) => handleImage(index)}
          src={i}
          alt={"project.images + i"}
        />
      );
    });
  };

  const next = () => {
    let newIndex;
    if (idx === 3) {
      newIndex = 0;
    } else {
      newIndex = idx + 1;
    }
    setIdx(newIndex);
    setImage(img.images[newIndex]);
  };

  const previous = () => {
    let newIndex;
    if (idx === 0) {
      newIndex = 3;
    } else {
      newIndex = idx - 1;
    }
    setIdx(newIndex);
    setImage(img.images[newIndex]);
  };

  return (
    <>
      {open && (
        <div className="image-fs-container">
          <img src={image} alt={"project.images + i"} />
          <button onClick={next} className="right">
            <img src={arrowRight} alt="right-arrow" />
          </button>
          <button onClick={previous} className="left">
            <img src={arrowLeft} alt="left-arrow" />
          </button>
          <div onClick={() => setOpen(false)} className="image-background" />
        </div>
      )}
      <RenderImages />
    </>
  );
};

export default ImageViewer;
