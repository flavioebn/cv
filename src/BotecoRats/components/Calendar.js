import React, { Fragment, useState } from "react";
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

const Calendar = ({
  year,
  month,
  drinks,
  userInfos,
  setUserInfos,
  allowEdit = true,
  infoCards = true,
}) => {
  const [monthToShow, setMonthToShow] = useState(
    month || new Date().getMonth(),
  );
  const [yearToShow, setYearToShow] = useState(
    year || new Date().getFullYear(),
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
    if (!allowEdit) {
      const todayDrinks = drinks.filter((drink) => {
        const drinkDate = new Date(drink.date);
        return (
          drinkDate.getDate() === currentDay &&
          drinkDate.getMonth() === monthToShow &&
          drinkDate.getFullYear() === yearToShow
        );
      });
      let res = [];
      const uniqueDrinks = [...new Set(todayDrinks.map((i) => i.name))];
      const uniqueUsers = [...new Set(todayDrinks.map((i) => i.user))];
      uniqueDrinks.forEach((drinkName) => {
        let drinkObj = { name: drinkName, types: [] };
        const uniqueTypes = [
          ...new Set(
            todayDrinks.filter((j) => drinkName === j.name).map((j) => j.type),
          ),
        ];
        uniqueTypes.forEach((typeName) => {
          const typeDrinks = todayDrinks.filter(
            (j) => drinkName === j.name && typeName === j.type,
          );
          const total = typeDrinks.reduce(
            (acc, curr) => acc + Number(curr.amount),
            0,
          );
          let usersArr = [];
          uniqueUsers.forEach((userName) => {
            const userTotal = typeDrinks
              .filter((j) => j.user === userName)
              .reduce((acc, curr) => acc + Number(curr.amount), 0);
            if (userTotal > 0) {
              usersArr.push({ user: userName, userTotal });
            }
          });
          drinkObj.types.push({ type: typeName, total, users: usersArr });
        });
        res.push(drinkObj);
      });
      return res;
    }
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
              if (!allowEdit) {
                return (
                  <div
                    key={i._id}
                    className="drink-item"
                    style={{
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <p style={{ fontWeight: "bold" }}>
                      • {i.types.reduce((a, b) => a + b.total, 0)}x {i.name}
                    </p>
                    {i.types.map((t) => {
                      return (
                        <Fragment key={`${i._id}-${t.type}`}>
                          <p style={{ marginLeft: "12px" }}>
                            {t.total}x {t.type}
                          </p>
                          <p style={{ marginLeft: "36px" }}>
                            {t.users
                              .map((u) => `${u.user} (${u.userTotal})`)
                              .join(", ")}
                          </p>
                        </Fragment>
                      );
                    })}
                  </div>
                );
              } else {
                return (
                  <div key={i._id} className="drink-item">
                    <p>
                      • {i.amount}x {i.name} ({i.type}){" "}
                    </p>
                    {allowEdit && (
                      <button onClick={() => handleDeleteDrink(i._id)}>
                        <img src={trashIcon} alt="Delete" />
                      </button>
                    )}
                  </div>
                );
              }
            })}
          </div>
          {allowEdit && (
            <AddDrink
              removeMargin={true}
              userInfos={userInfos}
              setUserInfos={setUserInfos}
              customDate={new Date(yearToShow, monthToShow, currentDay)}
            />
          )}
        </Modal>
      )}
      {infoCards && (
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
                  ...getThisMonthDrinks().map((drink) =>
                    drink.date.slice(0, 10),
                  ),
                ]).size
              }
            </p>
          </div>
        </div>
      )}
      <div className="boteco-calendar-controls">
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
      <div className="boteco-calendar">
        {weekdays.map((w) => (
          <div className="weekday" key={w}>
            {w}
          </div>
        ))}

        {cells.map((date, idx) => (
          <div
            className="day-container"
            key={date + idx}
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
