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
  });
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const lastDayOfCurrentMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
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
    const res = await registerBotecoGroup(group);
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
    if (!group.drinksFilter.includes(item)) {
      setGroup({
        ...group,
        drinksFilter: [...group.drinksFilter, item],
      });
    } else {
      setGroup({
        ...group,
        drinksFilter: group.drinksFilter.filter((i) => i !== item),
      });
    }
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
      <p>Data pra começar e fim da litragem</p>
      <input
        type="date"
        value={group.groupStartDate}
        onChange={(e) => setGroup({ ...group, groupStartDate: e.target.value })}
      />
      <input
        type="date"
        value={group.groupEndDate}
        onChange={(e) => setGroup({ ...group, groupEndDate: e.target.value })}
      />
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
      <p>Contabilizado nesse grupo:</p>
      <div className="group-count-allowed">
        {drinkList.map((i) => {
          return (
            <div key={i.name} onClick={() => handleCheckCount(i.name)}>
              <input
                checked={group.drinksFilter.includes(i.name)}
                type="checkbox"
              />
              <label>{i.name}</label>
            </div>
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
