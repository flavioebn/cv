import React from "react";

const Headerbar = () => {
  return (
    <div className="headerbar">
      <div>
        <p>FlavioEBN</p>
      </div>
      <div className="topics">
        <p>1_main</p>
        <p>2_about</p>
        <p>3_projects</p>
        <p>4_contact</p>
        <div className="lang-selector">
          <p>PT</p> <p>/</p> <p>EN</p>
        </div>
      </div>
    </div>
  );
};

export default Headerbar;
