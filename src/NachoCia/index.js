import React, { useState, useEffect } from "react";
import nachoLogo from "../assets/images/nachoCia.png";
import nachoCiaImages from "../assets/images/nachociafotos";
import ImageViewer from "../Home/imageViewer";

const NachoCia = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Get all images and convert them to the format ImageViewer expects
    const imageList = Object.values(nachoCiaImages).map(
      (value) => value.default || value // ImageViewer expects just the image URLs
    );
    setImages(imageList);
  }, []);

  return (
    <div className="nachocia">
      <img src={nachoLogo} className="logo" alt="Nacho Cia Logo" />
      <div className="photos">
        <ImageViewer img={{ images: images }} downloadable={true} />
      </div>
    </div>
  );
};

export default NachoCia;
