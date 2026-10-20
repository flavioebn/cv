import { useNavigate } from "react-router-dom";
import { useSidebar } from "../hooks/useSidebar";
import barsIcon from "../../assets/icons/bars.svg";
import { useAuth } from "../hooks/useAuth";

const BotecoSidebar = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const goToPage = (page) => {
    navigate(`/botecorats/${page}`, { replace: true });
  };

  return (
    <>
      <button
        onClick={() => toggleSidebar()}
        className="boteco-sidebar-opener-container"
      >
        <img src={barsIcon} alt="Toggle Sidebar" />
      </button>
      <div className={isOpen ? "boteco-sidebar open" : "boteco-sidebar"}>
        <div>
          <span onClick={() => goToPage("home")}>Home</span>
          <span onClick={() => goToPage("summary")}>Meu Resumo</span>
          <span onClick={() => goToPage("mygroups")}>Meus grupos</span>
          <span onClick={() => goToPage("groups/create")}>Criar grupo</span>
        </div>
        <span style={{ marginBottom: "48px" }} onClick={logout}>
          Sair
        </span>
      </div>
      <div
        onClick={() => toggleSidebar()}
        className={
          isOpen
            ? "boteco-sidebar-background open"
            : "boteco-sidebar-background"
        }
      />
    </>
  );
};

export default BotecoSidebar;
