import React, { useEffect } from "react";
import { ChromePicker } from "react-color";
import PlayIcon from "../assets/icons/play-solid.svg";
import PauseIcon from "../assets/icons/pause-solid.svg";
import ResetIcon from "../assets/icons/rotate-left-solid.svg";
import GearIcon from "../assets/icons/gear-solid.svg";
import StopIcon from "../assets/icons/stop-solid.svg";
import { Link } from "react-router-dom";

const ReflexCounter = () => {
  const [isActive, setIsActive] = React.useState(false);
  const [ms, setMs] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [colors, setColors] = React.useState([
    "#a14c4c",
    "#7ba14c",
    "#4c8ca1",
    "#934ca1",
  ]);
  const [colorIndex, setColorIndex] = React.useState(0);
  const [secondsInterval, setSecondsInterval] = React.useState(20);
  const [count, setCount] = React.useState(0);
  const [isEditingColor, setIsEditingColor] = React.useState(false);
  const [idxToEdit, setIdxToEdit] = React.useState(0);
  const [colorToEdit, setColorToEdit] = React.useState();
  const [refresh, setRefresh] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);

  const editColor = () => {
    let newArray = colors;
    newArray[idxToEdit] = colorToEdit;
    setColors(newArray);
    setIsEditingColor(!isEditingColor);
    localStorage.setItem("cores-acad-counter", newArray);
    setRefresh(refresh + 1);
  };

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setMs(0);
    setSeconds(0);
    setMinutes(0);
    setCount(0);
  };

  const stop = () => {
    setIsActive(false);
    reset();
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setMs((ms) => ms + 1);
        setCount((count) => count + 1);
        if (count === secondsInterval * 10 - 1) {
          let newNumber = Math.floor(Math.random() * 3);
          if (newNumber === colorIndex) {
            if (newNumber === 3) {
              newNumber = newNumber - 1;
            } else {
              newNumber = newNumber + 1;
            }
          }
          setColorIndex(newNumber);
          setCount(0);
        }
      }, 10);
      if (ms >= 99) {
        setSeconds((seconds) => seconds + 1);
        setMs(0);
        if (seconds >= 59) {
          setMinutes(minutes + 1);
          setSeconds(0);
        }
      }
    } else if (!isActive && ms !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, ms, count, secondsInterval, seconds, colorIndex, minutes]);

  useEffect(() => {
    const timer = localStorage.getItem("timer-acad-counter");
    const cores = localStorage.getItem("cores-acad-counter");
    if (cores) {
      const array = cores.split(",");
      setColors(array);
    } else {
      console.log("não tem");
    }
    if (timer) {
      setSecondsInterval(timer);
    }
  }, []);

  return (
    <div className="reflex-container">
      <Link className="back-to-hub" to="/hub ">
        Back to hub
      </Link>
      <p className="version">v1.3</p>
      {modalVisible && (
        <>
          <div className="modal">
            <div className="intervalDiv">
              <div className="intervalInput">
                <h2>Intervalo:</h2>
                <input
                  value={secondsInterval}
                  onChange={(e) => {
                    localStorage.setItem("timer-acad-counter", e.target.value);
                    setSecondsInterval(e.target.value);
                  }}
                ></input>
              </div>
              <p className="helper">(15 = 1.5s, 30 = 3s)</p>
            </div>
            <div className="colorBlocks">
              {colors.map((i, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setIsEditingColor(!isEditingColor);
                      setIdxToEdit(idx);
                      setColorToEdit(i);
                    }}
                    style={{
                      height: "50px",
                      width: "50px",
                      backgroundColor: i,
                      display: "inline-block",
                    }}
                  ></div>
                );
              })}
            </div>
            {isEditingColor && (
              <>
                <div className="picker">
                  <ChromePicker
                    width="100%"
                    color={colorToEdit}
                    onChangeComplete={(color) => {
                      setColorToEdit(color.hex);
                    }}
                  />
                </div>
                <div className="newColor">
                  <h3>Nova cor:</h3>
                  <div
                    style={{
                      height: "50px",
                      width: "50px",
                      backgroundColor: colorToEdit,
                      display: "inline-block",
                    }}
                  />
                </div>
                <div className="colorsButtons">
                  <button
                    className="cancelButton"
                    onClick={() => setIsEditingColor(false)}
                  >
                    Cancelar
                  </button>
                  <button className="saveButton" onClick={editColor}>
                    Save
                  </button>
                </div>
              </>
            )}
          </div>
          <div
            className="modalBackground"
            onClick={() => setModalVisible(false)}
          ></div>
        </>
      )}
      <div className="main" style={{ backgroundColor: colors[colorIndex] }}>
        <h1 className="timer">
          {minutes.toString().length === 1 ? "0" : ""}
          {minutes} : {seconds.toString().length === 1 ? "0" : ""}
          {seconds} : {ms.toString().length === 1 ? "0" : ""}
          {ms}
        </h1>
        <div className="timerOptions">
          <button className="optionButton" onClick={reset}>
            <img alt="buttonImage" className="imageMid" src={ResetIcon} />
          </button>
          <button className="optionButton" onClick={toggle}>
            <img
              alt="buttonImage"
              className="imageMid"
              src={isActive ? PauseIcon : PlayIcon}
            />
          </button>
          <button className="optionButton" onClick={stop}>
            <img alt="buttonImage" className="imageMid" src={StopIcon} />
          </button>
        </div>
        <button className="optionsIcon" onClick={() => setModalVisible(true)}>
          <img alt="buttonImage" className="imageSmall" src={GearIcon} />
        </button>
      </div>
    </div>
  );
};

export default ReflexCounter;
