import React, { useEffect, useState } from "react";
import Loader from "../components/loader";
import Modal from "../components/modal";
import {
  formatWordCaseAndSpecials,
  getFromStorage,
  setStorage,
} from "../utils/utils";

const Lyrics = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [req, setReq] = useState({ title: "", band: "" });
  const [display, setDisplay] = useState({ title: "", band: "" });
  const [words, setWords] = useState({ unique: [], total: 0, found: 0 });
  const [lyrics, setLyrics] = useState([]);
  const [hiddenLyrics, setHiddenLyrics] = useState([]);
  const [word, setWord] = useState("");
  const [submittedWords, setSubmittedWords] = useState(["(", ")"]);
  const [tries, setTries] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState(0);
  const [isModalShowing, setIsModalShowing] = useState(false);
  const [isHelperShowing, setIsHelperShowing] = useState(false);

  const startTimer = () => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        return prev + 1;
      });
    }, 1000);

    return timer;
  };

  const reset = () => {
    stopTimer();
    setSeconds(0);
    setSubmittedWords(["(", ")"]);
    setTries(0);
    setHiddenLyrics([]);
  };

  const getLyrics = async (e) => {
    setIsLoading(true);
    reset();
    if (req.title === "") return;
    e.preventDefault();
    const response = await fetch(
      `https://lyrist.vercel.app/api/${req.title}${
        req.band ? `/${req.band}` : ""
      }`
    ).then((res) => res.json());

    if (!response.title) {
      setDisplay({ title: "Not found", band: "" });
      setIsLoading(false);
      return;
    }

    let format = response.lyrics
      .replace(/\[.*?\]/g, "")
      .replace(/[(]/g, "( ")
      .replace(/[)]/g, " )")
      .replace(/[,!"'?:]/g, "")
      .replace(/[...]/g, "")
      .replace(/е/g, "e")
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

    format.forEach((i) => {
      i.split(" ").forEach((j) => {
        if (j === ")" || j === "(") return;
        if (!uniqueWords.includes(formatWordCaseAndSpecials(j)))
          uniqueWords.push(formatWordCaseAndSpecials(j));
      });
    });

    setWords({
      ...words,
      unique: uniqueWords,
      total: uniqueWords.length,
      found: 0,
    });

    setIsLoading(false);
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
    if (words.found === words.total) return;
    if (timerId === 0) {
      const timerId = startTimer();
      setTimerId(timerId);
    }
    setWord("");

    [...new Set(word.split(" "))].forEach((i) => {
      if (submittedWords.includes(formatWordCaseAndSpecials(i))) return;
      setTries((prev) => {
        return prev + 1;
      });
      setSubmittedWords((old) => [...old, formatWordCaseAndSpecials(i)]);
      if (words.unique.includes(formatWordCaseAndSpecials(i))) {
        setWords((prev) => ({
          ...prev,
          found: prev.found + 1,
        }));
        if (words.found + 1 === words.total) {
          let currentRecords = getFromStorage("lyrics-records") ?? [];
          currentRecords.push({
            song: `${display.title} - ${display.band}`,
            tries: tries,
            seconds: seconds,
          });
          setStorage("lyrics-records", currentRecords);
          stopTimer();
        }
      }
    });
  };

  const stopTimer = () => {
    clearInterval(timerId);
    setTimerId(0);
  };

  return (
    <div className="lyrics">
      <div className="lyrics-left">
        {isLoading && <Loader />}
        {isModalShowing && (
          <Modal flex={false} close={() => setIsModalShowing(false)}>
            <h1>My Records</h1>
            {getFromStorage("lyrics-records")?.map((i) => {
              return (
                <>
                  <p>
                    {i.song} foi completa em {i.tries} tentativas, em{" "}
                    {Math.floor(i.seconds / 60)
                      .toString()
                      .padStart(2, "0")}
                    :{(i.seconds & 60).toString().padStart(2, "0")}
                  </p>
                </>
              );
            })}
          </Modal>
        )}
        {isHelperShowing && (
          <Modal flex={false} close={() => setIsHelperShowing(false)}>
            <p>• Só precisa do artista se a música tiver um nome mais comum</p>
            <p>• Alguns caracteres são excluidos da letra: , ! " ' ? :</p>
            <p>• Letra com acento pode ser escrita sem que ele entende</p>
            <p>• O timer só começa quando tu digita a primeira palavra</p>
            <p>
              • Se precisar de colinha, pode checar a letra nesse{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://lyrist.vercel.app/"
              >
                Link
              </a>
              , é a única API de letra free que eu achei
            </p>
            <p>• "Nossa mas a letra ta errada" me paga uma API</p>
            <p>• "Nossa mas que feio" me paga um designer</p>
            <p>• "Nossa mas que legal" me paga uma cerveja</p>
            <p>
              • Gostou? Manda pros amigos e me segue no{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://x.com/FlavioEBN"
              >
                Twitter
              </a>
            </p>
          </Modal>
        )}
        {display.title === "" ? (
          <h1>Lyrics for:</h1>
        ) : (
          <h2>
            {display.title} - {display.band}
          </h2>
        )}
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
          <button type="submit" disabled={isLoading} onClick={getLyrics}>
            Get Lyrics
          </button>
        </form>
        {hiddenLyrics.length > 0 && (
          <div className="left-bottom">
            <form className="word-form">
              <input onChange={(e) => setWord(e.target.value)} value={word} />
              <br />
              <button
                type="submit"
                disabled={isLoading}
                onClick={handleSubitWord}
              >
                Guess word
              </button>
            </form>
            <h2 className={words.found === words.total && "green"}>
              {words.found} / {words.total}
            </h2>
            <h2>Tries: {tries}</h2>
            <h2 className={words.found === words.total && "green"}>
              {Math.floor(seconds / 60)
                .toString()
                .padStart(2, "0")}
              :{(seconds % 60).toString().padStart(2, "0")}
            </h2>
          </div>
        )}
        <p onClick={() => setIsModalShowing(true)} className="open-records">
          My records
        </p>
        <p onClick={() => setIsHelperShowing(true)} className="open-records">
          Need help?
        </p>
      </div>
      <div className="lyrics-right">
        {lyrics.map((i, idx) => {
          return (
            <div key={Math.random() * (idx + 1)} className="lyric-line">
              {i.split(" ").map((j, index) => {
                return (
                  <p
                    key={Math.random() * (index + 1)}
                    title={j.length}
                    className="lyric-word"
                  >
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
