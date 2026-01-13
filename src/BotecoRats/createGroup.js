import { useState, useRef, useEffect } from "react";
import { registerBotecoGroup } from "./functions";
import groupPlaceholderIcon from "../assets/icons/edit.svg";
import { useNavigate } from "react-router-dom";

const BotecoRatsCreateGroup = () => {
  const navigate = useNavigate();
  const [group, setGroup] = useState({
    name: "",
    avatar: "",
    groupStartDate: "",
    avatarToShow: "",
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      // revoke preview URL when component unmounts
      if (
        group.avatar &&
        typeof group.avatar === "string" &&
        group.avatar.startsWith("blob:")
      ) {
        URL.revokeObjectURL(group.avatar);
      }
    };
  }, [group.avatar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerBotecoGroup(group);
    console.log(res);
  };

  const goBack = () => {
    navigate("/botecorats/mygroups", { replace: true });
  };

  return (
    <div className="boteco-create-group">
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
      <p>Nome do grupo</p>
      <input
        type="text"
        placeholder="Nome"
        value={group.name}
        onChange={(e) => setGroup({ ...group, name: e.target.value })}
      />
      <p>Data pra começar a contar a litragem</p>
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
      <input
        type="date"
        value={group.groupStartDate}
        onChange={(e) => setGroup({ ...group, groupStartDate: e.target.value })}
      />
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
