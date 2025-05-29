import React, { useRef, useState } from "react";

const OstPlayer = ({ title, id }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  // Ensure audio starts at 0 volume
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0;
    }
  }, []);

  // Função para tocar a música inteira a partir de um ponto inicial
  const playFullAudio = async () => {
    if (audioRef.current) {
      if (audioRef.current.volume === 0) audioRef.current.volume = 0.5;
      await audioRef.current.play(); // Toca o áudio
      setIsPlaying(true);
      //   fadeIn(0.5); // Fade in no início

      // Escuta quando o áudio termina e aplica o fade out
      audioRef.current.onended = () => audioRef.current.play();
    }
  };

  const stopSong = async () => {
    if (audioRef.current) {
      await audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reseta o tempo para o início
      setIsPlaying(false);
    }
  };

  return (
    <div className="ost-player">
      <p>{title}</p>
      <audio ref={audioRef} src={id} />
      <div className="volume-control">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          defaultValue="0"
          onChange={(e) => {
            if (audioRef.current.volume === 0 && !isPlaying) {
              playFullAudio();
            }
            if (audioRef.current) {
              audioRef.current.volume = e.target.value;
              if (audioRef.current.volume === 0) {
                stopSong();
              }
            }
          }}
        />
      </div>
      <div className="buttons-container" style={{ marginBottom: "16px" }}>
        {!isPlaying ? (
          <button onClick={() => playFullAudio()} disabled={isPlaying}>
            P
          </button>
        ) : (
          <button onClick={stopSong}>S</button>
        )}
      </div>
    </div>
  );
};

export default OstPlayer;
