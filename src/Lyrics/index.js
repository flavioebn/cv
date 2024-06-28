import React, { useEffect, useState } from "react";
import { formatWordCaseAndSpecials } from "../utils/utils";

const Lyrics = () => {
  const [req, setReq] = useState({ title: "", band: "" });
  const [display, setDisplay] = useState({ title: "", band: "" });
  const [words, setWords] = useState({ unique: [], total: 0, found: 0 });
  const [lyrics, setLyrics] = useState([]);
  const [hiddenLyrics, setHiddenLyrics] = useState([]);
  const [word, setWord] = useState("");
  const [submittedWords, setSubmittedWords] = useState([]);
  const [tries, setTries] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState(0);

  const startTimer = () => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        return prev + 1;
      });
    }, 1000);

    return timer;
  };

  const getLyrics = async (e) => {
    if (req.title === "") return;
    e.preventDefault();
    const response = await fetch(
      `https://lyrist.vercel.app/api/${req.title}${
        req.band ? `/${req.band}` : ""
      }`
    ).then((res) => res.json());

    let format = response.lyrics
      .replace(/\[.*?\]/g, "")
      .replace(/"/g, "")
      .replace(/[()]/g, "")
      .replace(/[?]/g, "")
      .replace(/[,]/g, "")
      .split("\n")
      .filter((str) => str !== "");

    format = format.map((i) => {
      return i.replace(/\s+/g, " ");
    });

    setLyrics(format);
    setHiddenLyrics(format.map((i) => i.replace(/\S/g, "_")));
    setDisplay((prev) => ({
      ...prev,
      title: response.title,
      band: response.artist,
    }));

    const uniqueWords = [];
    console.log(format);

    format.forEach((i) => {
      i.split(" ").forEach((j) => {
        if (!uniqueWords.includes(formatWordCaseAndSpecials(j)))
          uniqueWords.push(formatWordCaseAndSpecials(j));
      });
    });

    setWords({ ...words, unique: uniqueWords, total: uniqueWords.length });

    stopTimer();
  };

  useEffect(() => {
    // getLyrics();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setReq((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubitWord = (e) => {
    console.log(lyrics[1]);
    console.log(submittedWords);
    e.preventDefault();
    if (timerId === 0) {
      const timerId = startTimer();
      setTimerId(timerId);
      console.log(timerId);
    }
    setWord("");
    if (submittedWords.includes(formatWordCaseAndSpecials(word))) return;
    setTries((prev) => {
      return prev + 1;
    });
    setSubmittedWords((old) => [...old, formatWordCaseAndSpecials(word)]);
    if (words.unique.includes(formatWordCaseAndSpecials(word))) {
      setWords((prev) => ({
        ...prev,
        found: prev.found + 1,
      }));
    }
    if (words.found === words.total) {
      stopTimer();
    }
  };

  const stopTimer = () => {
    clearInterval(timerId);
    console.log(timerId);
    setTimerId(0);
  };

  return (
    <div className="lyrics">
      <div className="lyrics-left">
        <h1>Lyrics for:</h1>
        <h2>
          {display.title} - {display.band}
        </h2>
        <form>
          <input
            name="title"
            value={req.title}
            onChange={handleInput}
            placeholder="Nome da música"
          />
          <input
            name="band"
            value={req.band}
            onChange={handleInput}
            placeholder="Nome da banda"
          />
          <br />
          <button type="submit" onClick={getLyrics}>
            Get Lyrics
          </button>
        </form>
        {hiddenLyrics.length > 0 && (
          <div className="left-bottom">
            <form className="word-form">
              <input onChange={(e) => setWord(e.target.value)} value={word} />
              <br />
              <button type="submit" onClick={handleSubitWord}>
                Guess word
              </button>
            </form>
            <h2>
              {words.found} / {words.total}
            </h2>
            <h2>Tries: {tries}</h2>
            <h2>
              {Math.floor(seconds / 60)}:{seconds % 60}
            </h2>
            <button onClick={stopTimer}>Para</button>
          </div>
        )}
      </div>
      <div className="lyrics-right">
        {lyrics.map((i, idx) => {
          return (
            <div key={Math.random() * (idx + 1)} className="lyric-line">
              {i.split(" ").map((j, index) => {
                return (
                  <p key={Math.random() * (index + 1)} className="lyric-word">
                    {submittedWords.includes(
                      j
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                    )
                      ? j
                      : j.replace(/\S/g, "_")}
                  </p>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Lyrics;
