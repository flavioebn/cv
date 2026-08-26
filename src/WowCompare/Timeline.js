import { useState } from "react";

const EventItem = ({ event }) => (
  <div
    className={`event-item ${event.hasCastingTime === true ? "double" : ""}`}
  >
    <span>
      {event.castTime} - {event.spellName}{" "}
      {event.targetName !== "Environment" &&
        `→ ${event.hasCastingTime ? `Casting` : event.targetName}`}
    </span>
    <br />
    {event.hasCastingTime === true && (
      <span>
        {" "}
        {event.finishedCasting} - {event.spellName} → {event.targetName}
      </span>
    )}
  </div>
);

const Timeline = ({ leftEvents, rightEvents, duration }) => {
  const [scale, setScale] = useState(0.05);

  const getTop = (timeStr) => {
    const [minSec, ms] = timeStr.split(".");
    const [min, sec] = minSec.split(":").map(Number);
    return (min * 60000 + sec * 1000 + Number(ms)) * scale;
  };

  return (
    <>
      <div className="timeline-controls">
        <button onClick={() => setScale((s) => s + 0.03)}>+</button>
        <button onClick={() => setScale((s) => s - 0.03)}>-</button>
      </div>
      <div className="timeline-wrapper">
        <div className="timeline" style={{ height: duration * scale }}>
          {/* linha central */}
          <div className="line" />

          {/* ticks (1s) */}
          {Array.from({ length: Math.ceil(duration / 1000) }).map((_, i) => (
            <div key={i} className="tick" style={{ top: i * 1000 * scale }}>
              <span>{i}s</span>
            </div>
          ))}

          {/* LEFT */}
          {leftEvents.map((e, i) => (
            <div
              key={i}
              className="event left"
              style={{ top: getTop(e.castTime) }}
            >
              <EventItem event={e} />
            </div>
          ))}

          {/* RIGHT */}
          {rightEvents.map((e, i) => (
            <div
              key={i}
              className="event right"
              style={{ top: getTop(e.castTime) }}
            >
              <EventItem event={e} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Timeline;
