import React, { useState, useEffect } from "react";
import nachoLogo from "../assets/images/nachoCia.png";
import {
  menacho2025,
  gabi2025,
  jo2025,
  nic2025,
  mauda2026,
  junina2026,
  krikki2026,
} from "../assets/images/nachoecia";
import ImageViewer from "../Home/imageViewer";

const events = [
  { name: "Joversário 2025", images: jo2025 },
  { name: "Gabiversário 2025", images: gabi2025 },
  { name: "Menachoversário 2025", images: menacho2025 },
  { name: "Feijuca da Nic 2026", images: nic2025 },
  { name: "Maudaversário 2026", images: mauda2026 },
  { name: "Festa Junina 2026", images: junina2026 },
  { name: "All K-Party 2026", images: krikki2026 },
];

const NachoCia = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Get all images and convert them to the format ImageViewer expects
    const imageList = Object.values(jo2025).map(
      (value) => value.default || value, // ImageViewer expects just the image URLs
    );
    setImages(imageList);
  }, []);

  const selectEvent = (e) => {
    const selectedEvent = events.find((event) => event.name === e.target.value);
    if (selectedEvent) {
      const imageList = Object.values(selectedEvent.images).map(
        (value) => value.default || value,
      );
      setImages(imageList);
    }
  };

  return (
    <div className="nachocia">
      <img src={nachoLogo} className="logo" alt="Nacho Cia Logo" />
      <select onChange={selectEvent} className="event-selector">
        {events.map((event, index) => (
          <option key={index} value={event.name}>
            {event.name}
          </option>
        ))}
      </select>
      <div className="photos">
        <ImageViewer img={{ images: images }} downloadable={true} />
      </div>
    </div>
  );
};

export default NachoCia;
