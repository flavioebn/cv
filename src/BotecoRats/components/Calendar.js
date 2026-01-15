import React, { useState } from "react";
import leftAngleIcon from "../../assets/icons/angle-left.svg";
import rightAngleIcon from "../../assets/icons/angle-right.svg";
import { calculateLiters } from "../drinkList";
import Modal from "../../components/modal";
import AddDrink from "./AddDrink";
import trashIcon from "../../assets/icons/trash-thin.svg";
import { deletePersonalDrink } from "../functions";

const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const Calendar = ({ year, month, drinks, userInfos, setUserInfos }) => {
  const [monthToShow, setMonthToShow] = useState(
    month || new Date().getMonth()
  );
  const [yearToShow, setYearToShow] = useState(
    year || new Date().getFullYear()
  );
  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const [modalVisible, setModalVisible] = useState(false);

  const first = new Date(yearToShow, monthToShow, 1);
  const startDay = first.getDay();
  const daysInMonth = new Date(yearToShow, monthToShow + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++)
    cells.push(new Date(yearToShow, monthToShow, d));
  while (cells.length % 7 !== 0) cells.push(null);

  const dayHasDrink = (date) => {
    if (!date) return false;
    return drinks.some((drink) => {
      const drinkDate = new Date(drink.date);
      return (
        drinkDate.getDate() === date.getDate() &&
        drinkDate.getMonth() === date.getMonth() &&
        drinkDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const handlePrevMonth = () => {
    if (monthToShow === 0) {
      setMonthToShow(11);
      setYearToShow(yearToShow - 1);
    } else {
      setMonthToShow(monthToShow - 1);
    }
  };

  const handleNextMonth = () => {
    if (monthToShow === 11) {
      setMonthToShow(0);
      setYearToShow(yearToShow + 1);
    } else {
      setMonthToShow(monthToShow + 1);
    }
  };

  const getThisMonthDrinks = () => {
    return drinks.filter((drink) => {
      const drinkDate = new Date(drink.date);
      return (
        drinkDate.getMonth() === monthToShow &&
        drinkDate.getFullYear() === yearToShow
      );
    });
  };

  const handleCalendarClick = (date) => {
    setCurrentDay(date.getDate());
    setModalVisible(true);
  };

  const getThisDayDrinks = () => {
    return drinks.filter((drink) => {
      const drinkDate = new Date(drink.date);
      return (
        drinkDate.getDate() === currentDay &&
        drinkDate.getMonth() === monthToShow &&
        drinkDate.getFullYear() === yearToShow
      );
    });
  };

  const handleDeleteDrink = async (drinkId) => {
    const res = await deletePersonalDrink(drinkId);
    if (res.code === 200) {
      setUserInfos({
        ...userInfos,
        drinks: userInfos.drinks.filter((d) => d._id !== drinkId),
      });
    }
  };

  return (
    <>
      {modalVisible && (
        <Modal classes="boteco" close={() => setModalVisible(false)}>
          <h1>
            {currentDay}/{monthToShow + 1}/{yearToShow}
          </h1>
          <div className="boteco-calendar-drinks">
            {getThisDayDrinks().map((i) => {
              return (
                <div key={i._id} className="drink-item">
                  <p>
                    • {i.amount}x {i.name} ({i.type})
                  </p>
                  <button onClick={() => handleDeleteDrink(i._id)}>
                    <img src={trashIcon} alt="Delete" />
                  </button>
                </div>
              );
            })}
          </div>
          <AddDrink
            removeMargin={true}
            userInfos={userInfos}
            setUserInfos={setUserInfos}
            customDate={new Date(yearToShow, monthToShow, currentDay)}
          />
        </Modal>
      )}
      <div className="info-cards">
        <div className="card">
          <label>Pontos</label>
          <p>{calculateLiters(getThisMonthDrinks()).points}</p>
        </div>
        <div className="card">
          <label>Litragem</label>
          <p>{calculateLiters(getThisMonthDrinks()).liters}L</p>
        </div>
        <div className="card">
          <label>Checkins</label>
          <p>
            {
              new Set([
                ...getThisMonthDrinks().map((drink) => drink.date.slice(0, 10)),
              ]).size
            }
          </p>
        </div>
      </div>
      <div className="calendar-controls">
        <button onClick={handlePrevMonth}>
          <img src={leftAngleIcon} alt="Previous Month" />
        </button>
        <span>
          {months[monthToShow]}/{yearToShow}
        </span>
        <button onClick={handleNextMonth}>
          <img src={rightAngleIcon} alt="Next Month" />
        </button>
      </div>
      <div className="calendar">
        {weekdays.map((w) => (
          <div className="weekday" key={w}>
            {w}
          </div>
        ))}

        {cells.map((date, idx) => (
          <div
            className="day-container"
            onClick={() => handleCalendarClick(date)}
          >
            <p
              key={idx}
              className={`day ${dayHasDrink(date) ? "has-drink" : ""}`}
            >
              {date ? date.getDate() : ""}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Calendar;
