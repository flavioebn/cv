import React, { useEffect, useState } from "react";
import { getText } from "./text";
import LangToggle from "./langToggle";
import bars from "../icons/bars.svg";
import close from "../icons/close.svg";

const Headerbar = ({ lang, toggle }) => {
  const [show, setShow] = React.useState(true);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    function updateSize() {
      if (window.innerWidth > 800) {
        setMobile(false);
        setShow(true);
      } else {
        setMobile(true);
        setShow(false);
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleOpener = () => {
    setShow(!show);
  };

  return (
    <>
      <div className={`headerbar ${!show && `hidden`}`}>
        <div className="name">
          <p>FlavioEBN</p>
        </div>
        <div className={mobile ? `topics-mobile` : `topics`}>
          <a onClick={handleOpener} className="purple" href="#main">
            {getText(lang, "headerTextOne")}
          </a>
          <a onClick={handleOpener} href="#about">
            {getText(lang, "headerTextTwo")}
          </a>
          <a onClick={handleOpener} href="#projects">
            {getText(lang, "headerTextThree")}
          </a>
          <a onClick={handleOpener} href="#contact">
            {getText(lang, "headerTextFour")}
          </a>
          {!mobile && <LangToggle toggle={toggle} lang={lang} />}
        </div>
      </div>
      {mobile && (
        <>
          <div onClick={handleOpener} className={`headerOpener`}>
            <img
              src={!show ? bars : close}
              className="arrow"
              alt="double arrow"
            />
          </div>

          {show && <div onClick={handleOpener} className="headerBackground" />}
        </>
      )}
    </>
  );
};

export default Headerbar;
