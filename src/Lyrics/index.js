import React, { useEffect, useState } from "react";
import { getRandomId } from "../utils/utils";

const Lyrics = () => {
  const [req, setReq] = useState({ title: "", band: "" });
  const [display, setDisplay] = useState({ title: "", band: "" });
  const [words, setWords] = useState({ unique: [], total: 0, found: 0 });
  const [lyrics, setLyrics] = useState([]);
  const [hiddenLyrics, setHiddenLyrics] = useState([]);
  const [word, setWord] = useState("");
  const [submittedWords, setSubmittedWords] = useState([]);

  const getLyrics = async (e) => {
    if (req.title === "" || req.band === "") return;
    e.preventDefault();
    const response = await fetch(
      `https://lyrist.vercel.app/api/${req.title}/${req.band}`
    ).then((res) => res.json());

    let format = response.lyrics
      .replace(/\[.*?\]/g, "")
      .replace(/"/g, "")
      .replace(/[()]/g, "")
      .replace(/[?]/g, "")
      .replace(/[,]/g, "")
      .split("\n")
      .filter((str) => str !== "");

    setLyrics(format);
    console.log(format);
    setHiddenLyrics(format.map((i) => i.replace(/\S/g, "_")));
    setDisplay((prev) => ({
      ...prev,
      title: response.title,
      band: response.artist,
    }));

    const uniqueWords = [];

    format.map((i) => {
      i.split(" ").map((j) => {
        if (!uniqueWords.includes(j.toLowerCase()))
          uniqueWords.push(j.toLowerCase());
      });
    });
    console.log(uniqueWords);
    console.log(uniqueWords.length);
    setWords({ ...words, unique: uniqueWords, total: uniqueWords.length });
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
    e.preventDefault();
    console.log(word);
    setWord("");
    if (submittedWords.includes(word.toLowerCase())) return;
    setSubmittedWords((old) => [
      ...old,
      word
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""),
    ]);
    if (words.unique.includes(word.toLowerCase())) {
      setWords((prev) => ({
        ...prev,
        found: prev.found + 1,
      }));
    }
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
