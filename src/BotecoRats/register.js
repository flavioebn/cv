import { useRef, useState } from "react";
import { registerBotecoUser } from "./functions";
import groupPlaceholderIcon from "../assets/icons/edit.svg";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";

const BotecoRatsRegister = () => {
  const [user, setUser] = useState({
    user: "",
    password: "",
    profilePic: "",
  });
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await registerBotecoUser(user);
    if (res?.code === 201) {
      setLoading(false);
      alert("Cadastrado! Agora loga ai");
      navigate("/botecorats/login", { replace: true });
    }
    setLoading(false);
  };

  return (
    <div className="register-container">
      {loading && <Loader />}
      <div
        className="user-image"
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
        style={{ cursor: "pointer" }}
      >
        <img
          className={`${
            user.avatarToShow && user.avatarToShow !== ""
              ? "img"
              : "placeholder"
          }`}
          src={
            user.avatarToShow && user.avatarToShow !== ""
              ? user.avatarToShow
              : groupPlaceholderIcon
          }
          alt="group"
        />
      </div>
      <input
        type="text"
        placeholder="Nome"
        value={user.user}
        onChange={(e) => setUser({ ...user, user: e.target.value })}
      />
      <input
        type="password"
        placeholder="Senha"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
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
              user.avatar &&
              typeof user.avatar === "string" &&
              user.avatar.startsWith("blob:")
            ) {
              URL.revokeObjectURL(user.avatar);
            }
            const url = URL.createObjectURL(file);
            setUser({
              ...user,
              profilePic: e.target.files[0],
              avatarToShow: url,
            });
          }
        }}
      />
      <button
        onClick={handleSubmit}
        disabled={!user.user || !user.password || !user.profilePic}
      >
        Registrar
      </button>
      <p className="login-link" onClick={() => navigate("/botecorats/login")}>
        Login
      </p>
    </div>
  );
};

export default BotecoRatsRegister;
