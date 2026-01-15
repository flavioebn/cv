import { useEffect, useState } from "react";
import { getMyDrinks } from "./functions";
import { formatMongoDate } from "../utils/utils";
import BotecoSidebar from "./components/sidebar";

const BotecoRatsSummary = () => {
  const [drinks, setDrinks] = useState([]);

  const fetchDrinks = async () => {
    const res = await getMyDrinks();
    setDrinks(res.res.drinks);
  };

  useEffect(() => {
    fetchDrinks();
  }, []);

  const filterDrinksFromLastWeek = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return drinks.filter((drink) => new Date(drink.date) >= oneWeekAgo);
  };

  const filterDrinksFromLastMonth = () => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const drinksFromLastweek = filterDrinksFromLastWeek();

    return drinks
      .filter((i) => {
        return drinksFromLastweek.indexOf(i) < 0;
      })
      .filter((drink) => new Date(drink.date) >= oneMonthAgo);
  };

  const filterDrinksFromOlder = () => {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const drinksFromLastweek = filterDrinksFromLastWeek();
    const drinksFromLastMonth = filterDrinksFromLastMonth();
    return drinks.filter((i) => {
      return (
        drinksFromLastweek.indexOf(i) < 0 && drinksFromLastMonth.indexOf(i) < 0
      );
    });
  };

  const RenderArray = (arr) => {
    return arr.map((i) => {
      return (
        <p key={`${i.name}-${i.type}`}>
          {formatMongoDate(i.date)} {i.amount}x {i.name} ({i.type})
        </p>
      );
    });
  };

  const getTotals = () => {
    const map = {};
    drinks.forEach((d) => {
      const name = d.name;
      const type = d.type;
      const amount = Number(d.amount) || 0;
      const key = `${name}||${type}`;
      if (!map[key]) {
        map[key] = { name, type, amount: 0 };
      }
      map[key].amount += amount;
    });
    return Object.values(map);
  };

  return (
    <div className="boteco-summary">
      <h1>Resumão</h1>
      <BotecoSidebar />

      {drinks.length > 0 && (
        <>
          <h2>Por Item</h2>
          {getTotals().map((i) => (
            <p key={`${i.name}-${i.type}`}>
              {i.amount}x {i.name} ({i.type})
            </p>
          ))}

          <h2>Última Semana</h2>
          {RenderArray(filterDrinksFromLastWeek())}
          <h2>Último Mês</h2>
          {RenderArray(filterDrinksFromLastMonth())}
          <h2>Mais Antigas</h2>
          {RenderArray(filterDrinksFromOlder())}
        </>
      )}
    </div>
  );
};

export default BotecoRatsSummary;
