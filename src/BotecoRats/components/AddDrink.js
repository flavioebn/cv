import { useEffect, useState } from "react";
import { drinkList } from "../drinkList";
import Loader from "../../components/loader";
import { addPersonalDrink } from "../functions";

const AddDrink = ({ userInfos, setUserInfos, customDate, removeMargin }) => {
  const [loading, setLoading] = useState(false);
  const [newDrink, setNewDrink] = useState({
    name: "",
    type: "",
    amount: 1,
  });

  const handleSendDrink = async () => {
    setLoading(true);
    const res = await addPersonalDrink({
      userId: userInfos.user._id,
      name: newDrink.name,
      type: newDrink.type,
      amount: newDrink.amount,
      date: customDate || new Date(),
    });
    if (res.code === 201) {
      setUserInfos({
        ...userInfos,
        drinks: [...userInfos.drinks, res.res.drink],
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    setNewDrink({
      name: drinkList[0].name,
      type: drinkList[0].types[0],
      amount: 1,
    });
  }, []);

  return (
    <div className={`boteco-quick-add${removeMargin ? " remove-margin" : ""}`}>
      {loading && <Loader />}
      <div>
        <select
          value={newDrink.amount}
          onChange={(e) => setNewDrink({ ...newDrink, amount: e.target.value })}
        >
          {[...Array(parseInt(30)).keys()].map((i) => {
            return <option value={i + 1}>{i + 1}</option>;
          })}
        </select>
        <select
          onChange={(e) => {
            setNewDrink({
              ...newDrink,
              name: e.target.value,
              type: drinkList.find((i) => i.name === e.target.value).types[0],
            });
          }}
          value={newDrink.name}
        >
          {drinkList.map((i) => {
            return <option value={i.name}>{i.name}</option>;
          })}
        </select>
        <select
          onChange={(e) => setNewDrink({ ...newDrink, type: e.target.value })}
          value={newDrink.type}
        >
          {drinkList
            .find((i) => i.name === newDrink.name)
            ?.types.map((i) => {
              return <option value={i}>{i}</option>;
            })}
        </select>
      </div>
      <button onClick={handleSendDrink}>Adicionar</button>
    </div>
  );
};

export default AddDrink;
