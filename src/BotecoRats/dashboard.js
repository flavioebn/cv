import { useEffect, useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { addPersonalDrink, getMyGroups } from "./functions";
import { drinkList } from "./drinkList";

const BotecoRatsDashboard = () => {
  const { user, drinks, loading, logout } = useAuth();
  const [groups, setGroups] = useState([]);
  const [drinkToAdd, setDrinkToAdd] = useState(drinkList[0].name);
  const [typeToAdd, setTypeToAdd] = useState(drinkList[0].types[0]);
  const [amountToAdd, setAmountToAdd] = useState(1);

  useEffect(() => {
    if (!loading && user?._id) {
      getMyGroups(user._id).then((res) => {
        setGroups(res.res.groups || []);
        console.log(res.res.groups);
      });
    }
  }, [loading, user]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  const navigateToGroup = (groupId) => {
    window.location.href = `/botecorats/group/${groupId}`;
  };

  const handleSendDrink = async () => {
    const res = await addPersonalDrink({
      userId: user._id,
      name: drinkToAdd,
      type: typeToAdd,
      amount: amountToAdd,
    });
    console.log(res);
  };

  return (
    <div>
      <h1>BotecoRats</h1>
      <h2>Welcome, {user.user}!</h2>

      {user.avatarUrl && <img src={user.avatarUrl} alt="Profile" width="200" />}

      <button onClick={logout}>Sair</button>

      <hr />
      <h2>Bibidas</h2>

      <h3>Adicionar:</h3>
      <input
        placeholder="Qtd"
        type="number"
        value={amountToAdd}
        onChange={(e) => setAmountToAdd(Number(e.target.value))}
      />
      <select onChange={(e) => setDrinkToAdd(e.target.value)}>
        {drinkList.map((i) => {
          return <option value={i.name}>{i.name}</option>;
        })}
      </select>
      <select onChange={(e) => setTypeToAdd(e.target.value)}>
        {drinkList
          .find((i) => i.name === drinkToAdd)
          .types.map((i) => {
            return <option value={i}>{i}</option>;
          })}
      </select>
      <button onClick={handleSendDrink}>Adicionar</button>

      {drinks && drinks.length > 0 && (
        <div>
          <h3>Minhas Bebidas:</h3>
          <ul>
            {drinks.map((i, index) => (
              <li key={index}>
                {i.amount}x {i.name} ({i.type})
              </li>
            ))}
          </ul>
        </div>
      )}

      <hr />

      <h3>Meus Grupos</h3>

      {groups.length === 0 ? (
        <p>Você ainda não participa de nenhum grupo</p>
      ) : (
        <ul>
          {groups.map((group) => (
            <li key={group._id} onClick={() => navigateToGroup(group._id)}>
              <img
                src={group.avatarUrl}
                alt={group.name}
                width="40"
                style={{ borderRadius: "50%", marginRight: "8px" }}
              />
              {group.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BotecoRatsDashboard;
