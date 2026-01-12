import { useState } from "react";
import { registerBotecoUser } from "./functions";

const CloudinaryTest = () => {
  const [user, setUser] = useState({
    user: "",
    password: "",
    profilePic: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    const res = await registerBotecoUser(user);
    console.log(res);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={user.user}
        onChange={(e) => setUser({ ...user, user: e.target.value })}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <br />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setUser({ ...user, profilePic: e.target.files[0] });
        }}
      />
      <br />
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
};

export default CloudinaryTest;
