import React, { useRef, useState } from "react";

const Player = ({ song, index, select, next, prev }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [showTitle, setShowTitle] = useState(false);

  const fadeIn = (duration) => {
    const fadeDuration = 500; // Meio segundo (500ms) para o fade in
    const intervalTime = 50; // Intervalo de ajuste do volume
    const fadeSteps = fadeDuration / intervalTime;
    let volumeStep = 1 / fadeSteps;
    audioRef.current.volume = 0; // Inicia no volume zero
    const fadeInterval = setInterval(() => {
      if (audioRef.current.volume < 1) {
        audioRef.current.volume = Math.min(
          audioRef.current.volume + volumeStep,
          1
        );
      } else {
        clearInterval(fadeInterval); // Interrompe o fade in quando o volume atinge 1 (máximo)
      }
    }, intervalTime);
  };

  // Função para criar o fade out
  const fadeOut = async (duration) => {
    const fadeDuration = 500; // Meio segundo (500ms) para o fade out
    const intervalTime = 50; // Intervalo de ajuste do volume
    const fadeSteps = fadeDuration / intervalTime;
    let volumeStep = 1 / fadeSteps;
    const fadeInterval = setInterval(async () => {
      if (audioRef.current.volume > 0) {
        audioRef.current.volume = Math.max(
          audioRef.current.volume - volumeStep,
          0
        );
      } else {
        await audioRef.current.pause(); // Pausa o áudio quando o volume atinge 0
        clearInterval(fadeInterval); // Interrompe o fade out
        setIsPlaying(false); // Define que não está tocando mais
      }
    }, intervalTime);
  };

  // Função para tocar por um período específico
  const playForDuration = async (duration, start) => {
    if (audioRef.current) {
      clearTimeout(timerId); // Limpa qualquer timer ativo
      audioRef.current.currentTime = start; // Define o ponto inicial
      await audioRef.current.play(); // Toca o áudio
      setIsPlaying(true);
      fadeIn(0.2); // Fade in no início

      // Para o áudio após 'duration' segundos, aplicando fade out
      const timeoutId = setTimeout(async () => {
        await audioRef.current.pause();
        setIsPlaying(false);
      }, duration * 1000);
      setTimerId(timeoutId);
    }
  };

  // Função para tocar a música inteira a partir de um ponto inicial
  const playFullAudio = async (start) => {
    if (audioRef.current) {
      clearTimeout(timerId); // Limpa qualquer timer ativo
      audioRef.current.currentTime = start; // Define o ponto inicial
      await audioRef.current.play(); // Toca o áudio
      setIsPlaying(true);
      fadeIn(0.5); // Fade in no início

      // Escuta quando o áudio termina e aplica o fade out
      audioRef.current.onended = () => fadeOut(0.5);
    }
  };

  const stopSong = async () => {
    if (audioRef.current) {
      await audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reseta o tempo para o início
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    stopSong();
    next();
  };

  const handlePrev = () => {
    stopSong();
    prev();
  };

  return (
    <div onClick={select} className={`song-player active-song`}>
      <h1 onClick={() => setShowTitle(!showTitle)}>
        {showTitle ? song.title : `musga ${index}`}
      </h1>
      <audio ref={audioRef} src={song.src} />
      <div className="buttons-container" style={{ marginBottom: "16px" }}>
        <button
          onClick={() => playForDuration(1, song.times[0])}
          disabled={isPlaying}
        >
          1s
        </button>
        <button
          onClick={() => playForDuration(3, song.times[1])}
          disabled={isPlaying}
        >
          3s
        </button>
        <button
          onClick={() => playFullAudio(song.times[2])}
          disabled={isPlaying}
        >
          P
        </button>
        <button onClick={stopSong}>S</button>
      </div>
      <div className="buttons-container">
        <button onClick={handlePrev}>V</button>
        <button onClick={handleNext}>N</button>
      </div>
    </div>
  );
};

export default Player;
