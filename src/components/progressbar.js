import { useEffect, useState } from "react";

export const CountdownProgress = ({ duration = 30, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const startTime = Date.now();
    const durationMs = duration * 1000;

    setTimeLeft(duration);

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(durationMs - elapsed, 0);

      setTimeLeft(remaining / 1000);

      if (remaining <= 0) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete?.();
        }, 300);
      }
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, [duration, onComplete]);

  const progress = (timeLeft / duration) * 100;

  // Verde (120) -> vermelho (0)
  const hue = Math.max(0, Math.min(120, (progress / 100) * 120));

  return (
    <div className="countdown-progress">
      <div className="countdown-progress__track">
        <div
          className="countdown-progress__bar"
          style={{
            width: `${progress}%`,
            backgroundColor: `hsl(${hue}, 80%, 45%)`,
          }}
        />
      </div>

      <span>{timeLeft.toFixed(2)}s</span>
    </div>
  );
};
