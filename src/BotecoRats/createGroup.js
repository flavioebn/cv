import { useState } from "react";
import { registerBotecoGroup } from "./functions";

const BotecoRatsCreateGroup = () => {
  const [group, setGroup] = useState({
    name: "",
    avatar: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(group);
    const res = await registerBotecoGroup(group);
    console.log(res);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={group.name}
        onChange={(e) => setGroup({ ...group, name: e.target.value })}
      />
      <br />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setGroup({ ...group, avatar: e.target.files[0] });
        }}
      />
      <br />
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
};

export default BotecoRatsCreateGroup;
