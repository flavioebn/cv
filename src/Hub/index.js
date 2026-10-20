import { Link } from "react-router-dom";
import { data } from "./data";

const RenderItem = ({ item }) => {
  return (
    <Link to={item.to}>
      <div className="hub-item">
        <img src={item.image} alt="img" />
        <div className="text">
          <h2>{item.title}</h2>
          <p>{item.desc}</p>
        </div>
      </div>
    </Link>
  );
};

const Hub = () => {
  return (
    <div className="hub-container">
      {data.map((i) => {
        return <RenderItem item={i} />;
      })}
    </div>
  );
};

export default Hub;
