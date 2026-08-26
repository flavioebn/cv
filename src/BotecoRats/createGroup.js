import { useState, useRef, useEffect } from "react";
import { registerBotecoGroup } from "./functions";
import groupPlaceholderIcon from "../assets/icons/edit.svg";
import { useNavigate } from "react-router-dom";
import { drinkList } from "./drinkList";
import Loader from "../components/loader";

const BotecoRatsCreateGroup = () => {
  const navigate = useNavigate();
  const [group, setGroup] = useState({
    name: "",
    avatar: "",
    groupStartDate: "",
    groupEndDate: "",
    avatarToShow: "",
    drinksFilter: [],
    weekendOnly: false,
    type: "goal",
    goalType: "totalLiters",
    goalValue: 0,
  });
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [noEndDate, setNoEndDate] = useState(false);

  useEffect(() => {
    const lastDayOfCurrentMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0,
    );

    setGroup((prev) => {
      return {
        ...prev,
        groupStartDate: new Date().toISOString().split("T")[0],
        groupEndDate: lastDayOfCurrentMonth.toISOString().split("T")[0],
      };
    });
    return () => {
      if (
        group.avatar &&
        typeof group.avatar === "string" &&
        group.avatar.startsWith("blob:")
      ) {
        URL.revokeObjectURL(group.avatar);
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await registerBotecoGroup({
      ...group,
      groupEndDate: noEndDate ? null : group.groupEndDate,
    });
    setLoading(false);
    if (res?.code === 201) {
      alert("Grupo criado com sucesso!");
      navigate(`/botecorats/mygroups`, { replace: true });
    }
  };

  const goBack = () => {
    navigate("/botecorats/mygroups", { replace: true });
  };

  const handleCheckCount = (item) => {
    if (!group.drinksFilter.some((i) => i.name === item)) {
      setGroup({
        ...group,
        drinksFilter: [
          ...group.drinksFilter,
          { name: item, types: drinkList.find((i) => i.name === item).types },
        ],
      });
    } else {
      setGroup({
        ...group,
        drinksFilter: group.drinksFilter.filter((i) => i.name !== item),
      });
    }
  };

  const handleTypeCount = (drinkName, typeName) => {
    const drinkIndex = group.drinksFilter.findIndex(
      (i) => i.name === drinkName,
    );
    if (drinkIndex === -1) return;
    const typeIndex = group.drinksFilter[drinkIndex].types.indexOf(typeName);
    let newTypes = [...group.drinksFilter[drinkIndex].types];
    if (typeIndex === -1) {
      newTypes.push(typeName);
    } else {
      newTypes.splice(typeIndex, 1);
    }
    const newDrinksFilter = [...group.drinksFilter];
    newDrinksFilter[drinkIndex].types = newTypes;
    setGroup({ ...group, drinksFilter: newDrinksFilter });
  };

  return (
    <div className="boteco-create-group">
      {loading && <Loader />}
      <div
        className="group-image"
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
        style={{ cursor: "pointer" }}
      >
        <img
          className={`${
            group.avatarToShow && group.avatarToShow !== ""
              ? "img"
              : "placeholder"
          }`}
          src={
            group.avatarToShow && group.avatarToShow !== ""
              ? group.avatarToShow
              : groupPlaceholderIcon
          }
          alt="group"
        />
      </div>
      <input
        ref={fileInputRef}
        style={{ display: "none" }}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files && e.target.files[0];
          if (file) {
            // revoke previous blob URL if any
            if (
              group.avatar &&
              typeof group.avatar === "string" &&
              group.avatar.startsWith("blob:")
            ) {
              URL.revokeObjectURL(group.avatar);
            }
            const url = URL.createObjectURL(file);
            setGroup({
              ...group,
              avatar: e.target.files[0],
              avatarToShow: url,
            });
          }
        }}
      />
      <p>Nome do grupo</p>
      <input
        type="text"
        placeholder="Nome"
        value={group.name}
        onChange={(e) => setGroup({ ...group, name: e.target.value })}
      />
      <p>Período do grupo</p>
      <div style={{ display: "flex", gap: "4px" }}>
        <input
          type="date"
          value={group.groupStartDate}
          onChange={(e) =>
            setGroup({ ...group, groupStartDate: e.target.value })
          }
        />
        <input
          type="date"
          disabled={noEndDate}
          value={group.groupEndDate}
          onChange={(e) => setGroup({ ...group, groupEndDate: e.target.value })}
        />
      </div>
      <div className="weekendCheck" style={{ marginTop: "8px" }}>
        <input
          type="checkbox"
          checked={noEndDate}
          onChange={(e) => setNoEndDate(e.target.checked)}
        />
        <p>Grupo sem data de fim</p>
      </div>
      <div className="weekendCheck">
        <input
          type="checkbox"
          checked={group.weekendOnly}
          onChange={(e) =>
            setGroup({ ...group, weekendOnly: e.target.checked })
          }
        />
        <p>Contabilizar apenas finais de semana</p>
      </div>
      <p style={{ fontSize: "16px", marginBottom: "8px" }}>
        Esse vai ser um grupo:
      </p>
      <select
        value={group.type}
        onChange={(e) => setGroup({ ...group, type: e.target.value })}
      >
        <option value="goal">Cooperativo (Com uma meta)</option>
        <option value="competitive">Competitivo (Quem bebe mais)</option>
      </select>
      <div className="goal-container">
        <p>{group.type === "goal" ? "Meta de:" : "Competir por:"}</p>
        <div>
          {group.type === "goal" && (
            <input
              type="number"
              value={group.goalValue}
              placeholder="Qtd"
              onChange={(e) =>
                setGroup({ ...group, goalValue: e.target.value })
              }
            />
          )}
          <select
            value={group.goalType}
            onChange={(e) => setGroup({ ...group, goalType: e.target.value })}
          >
            <option value="totalLiters">Litros</option>
            <option value="totalPoints">Pontos</option>
            <option value="totalAmount">Quantidade</option>
          </select>
        </div>
      </div>
      <p>Permitido nesse grupo:</p>
      <div className="group-count-allowed">
        {drinkList.map((i) => {
          return (
            <>
              <div key={i.name} onClick={() => handleCheckCount(i.name)}>
                <div>
                  <input
                    checked={group.drinksFilter.some(
                      (drink) => drink.name === i.name,
                    )}
                    type="checkbox"
                  />
                  <label>{i.name}</label>
                </div>
                {group.drinksFilter.some((drink) => drink.name === i.name) && (
                  <div className="types">
                    {drinkList
                      .find((drink) => drink.name === i.name)
                      .types.map((j) => {
                        return (
                          <div>
                            <input
                              type="checkbox"
                              onChange={() => handleTypeCount(i.name, j)}
                              checked={group.drinksFilter
                                .find((drink) => drink.name === i.name)
                                .types.includes(j)}
                            />
                            <label>{j}</label>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            </>
          );
        })}
      </div>
      <div className="finish-buttons">
        <button className="red" onClick={goBack}>
          Cancelar
        </button>
        <button onClick={handleSubmit}>Enviar</button>
      </div>
    </div>
  );
};

export default BotecoRatsCreateGroup;
