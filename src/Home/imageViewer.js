import React from "react";
import arrowLeft from "../assets/icons/arrow-left.svg";
import arrowRight from "../assets/icons/arrow-right.svg";

const ImageViewer = ({ img }) => {
  const [open, setOpen] = React.useState(false);
  const [idx, setIdx] = React.useState(0);
  const [image, setImage] = React.useState();

  // Add keyboard navigation
  React.useEffect(() => {
    const next = () => {
      let newIndex;
      if (idx === img.images.length - 1) {
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
        newIndex = img.images.length - 1;
      } else {
        newIndex = idx - 1;
      }
      setIdx(newIndex);
      setImage(img.images[newIndex]);
    };

    const handleKeyDown = (event) => {
      if (!open) return;

      if (event.key === "ArrowRight") {
        next();
      } else if (event.key === "ArrowLeft") {
        previous();
      } else if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, idx, img.images]);

  const handleImage = (i) => {
    setIdx(i);
    setImage(img.images[i]);
    setOpen(true);
  };

  const nextImage = () => {
    let newIndex;
    if (idx === img.images.length - 1) {
      newIndex = 0;
    } else {
      newIndex = idx + 1;
    }
    setIdx(newIndex);
    setImage(img.images[newIndex]);
  };

  const previousImage = () => {
    let newIndex;
    if (idx === 0) {
      newIndex = img.images.length - 1;
    } else {
      newIndex = idx - 1;
    }
    setIdx(newIndex);
    setImage(img.images[newIndex]);
  };

  const RenderImages = () => {
    if (!img.images || img.images.length === 0) return null;

    return img.images.map((imageUrl, index) => {
      return (
        <img
          key={index}
          className="thumb"
          onClick={() => handleImage(index)}
          src={imageUrl}
          alt={` ${index + 1}`}
        />
      );
    });
  };

  return (
    <>
      {open && (
        <div className="image-fs-container">
          <img src={image} alt={`fullscreen ${idx + 1}`} />
          <button onClick={nextImage} className="right">
            <img src={arrowRight} alt="right-arrow" />
          </button>
          <button onClick={previousImage} className="left">
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
