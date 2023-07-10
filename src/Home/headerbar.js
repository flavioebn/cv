import React, { useEffect, useState } from "react";
import { getText } from "./text";
import LangToggle from "./langToggle";
import bars from "../icons/bars.svg";
import close from "../icons/close.svg";
import linkedinIcon from "../icons/linkedin.svg";
import instagram from "../icons/instagram.svg";
import gmail from "../icons/email.svg";
import github from "../icons/github.svg";

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
    mobile && setShow(!show);
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
          {mobile && (
            <div className="mobile-social">
              <a
                href="https://www.linkedin.com/in/flavioebn/"
                rel="noreferrer"
                target="_blank"
              >
                <img src={linkedinIcon} alt="contact-email" />
              </a>
              <a
                href="mailto:flavioebn@gmail.com"
                rel="noreferrer"
                target="_blank"
              >
                <img src={gmail} alt="contact-email" />
              </a>
              <a
                href="https://www.instagram.com/flavioebn/"
                rel="noreferrer"
                target="_blank"
              >
                <img src={instagram} alt="contact-email" />
              </a>
              <a
                href="https://github.com/flavioebn"
                rel="noreferrer"
                target="_blank"
              >
                <img src={github} alt="contact-email" />
              </a>
            </div>
          )}
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
