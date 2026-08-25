import { useState, useEffect } from "react";
import v1 from "../assets/images/sentinels/1v.png";
import v2 from "../assets/images/sentinels/2v.png";
import v3 from "../assets/images/sentinels/3v.png";
import morreu from "../assets/images/sentinels/morreu.png";
import { CountdownProgress } from "../components/progressbar";

const allImages = [
  { id: "v1", image: v1 },
  { id: "v2", image: v2 },
  { id: "v3", image: v3 },
];

const requiredByPlayer = {
  v1: "v3",
  v2: "v2",
  v3: "v1",
};

const Sentinels = () => {
  const [images, setImages] = useState([]);
  const [playerImage, setPlayerImage] = useState(null);
  const [previousPlayerId, setPreviousPlayerId] = useState(null);
  const [lost, setLost] = useState(false);
  const [streak, setStreak] = useState(0);

  const [timerKey, setTimerKey] = useState(0);
  const [timerDuration, setTimerDuration] = useState(5);

  const generateRound = () => {
    const possiblePlayers = allImages.filter(
      (image) => image.id !== previousPlayerId,
    );

    const player =
      possiblePlayers[Math.floor(Math.random() * possiblePlayers.length)];

    setPlayerImage(player);
    setPreviousPlayerId(player.id);

    const requiredImage = requiredByPlayer[player.id];

    const totalImages = Math.floor(Math.random() * 4) + 3;

    const generatedImages = Array.from({ length: totalImages }, (_, index) => ({
      id: index,
      type: allImages[Math.floor(Math.random() * allImages.length)],
    }));

    const correctImage = allImages.find((item) => item.id === requiredImage);

    const correctPosition = Math.floor(Math.random() * generatedImages.length);

    generatedImages[correctPosition] = {
      id: correctPosition,
      type: correctImage,
    };

    setImages(generatedImages);
  };

  useEffect(() => {
    generateRound();
  }, []);

  const handleImageClick = (item) => {
    const requiredImage = requiredByPlayer[playerImage.id];
    setStreak((prev) => prev + 1);

    if (item.type.id === requiredImage) {
      setTimerDuration((prev) =>
        Math.max(prev - 1, 1) < 5 ? 5 : Math.max(prev - 1, 1),
      );

      generateRound();

      setTimerKey((prev) => prev + 1);
      setStreak((prev) => prev + 1);
    } else {
      setLost(true);
    }
  };

  const handleReset = () => {
    setLost(false);
    setTimerDuration(3);
    generateRound();
    setTimerKey(3);
  };

  return (
    <div className="sentinels">
      <h2>Sentinels +2 Learning</h2>

      <p>
        Você está em baixo, clique no amiguinho que você pode bater pra fazer a
        soma certa E NÃO WIPAR O GRUPO
      </p>

      {lost ? (
        <>
          <span>teu streak: {streak}</span>
          <img width="1250" src={morreu} alt="Morreu" onClick={handleReset} />
        </>
      ) : (
        <>
          <div className="sentinels-options">
            {images.map((item) => (
              <img
                key={item.id}
                src={item.type.image}
                alt={item.type.id}
                className="sentinel"
                onClick={() => handleImageClick(item)}
              />
            ))}
          </div>

          {playerImage && (
            <div className="sentinels-player">
              <img
                src={playerImage.image}
                alt="Jogador"
                className="sentinel-player"
              />
            </div>
          )}
          <CountdownProgress
            key={timerKey}
            duration={timerDuration}
            onComplete={() => setLost(true)}
          />
        </>
      )}
    </div>
  );
};

export default Sentinels;
