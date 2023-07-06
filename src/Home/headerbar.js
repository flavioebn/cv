import React from "react";
import { getText } from "./text";
import LangToggle from "./langToggle";

const Headerbar = ({ lang, toggle }) => {
  const [show, setShow] = React.useState(true);

  return (
    <>
      {show && (
        <div className="headerbar">
          <div className="name">
            <p>FlavioEBN</p>
          </div>
          <div className="topics">
            <a href="#main">{getText(lang, "headerTextOne")}</a>
            <a href="#about">{getText(lang, "headerTextTwo")}</a>
            <a href="#projects">{getText(lang, "headerTextThree")}</a>
            <a href="#contact">{getText(lang, "headerTextFour")}</a>
            <LangToggle toggle={toggle} lang={lang} />
          </div>
        </div>
      )}
    </>
  );
};

export default Headerbar;
