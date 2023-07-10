import React, { useState } from "react";
import Headerbar from "./headerbar";
import euDem from "../assets/dem.png";
import { projects, thingsIKnow as things } from "./data";
import ImageViewer from "./imageViewer";
import linkedinIcon from "../icons/linkedin.svg";
import instagram from "../icons/instagram.svg";
import gmail from "../icons/email.svg";
import github from "../icons/github.svg";
import { getText } from "./text";
import LangToggle from "./langToggle";
import link from "../icons/link.svg";

const BuildThings = ({ thing }) => {
  return (
    <a
      className="effect-link"
      href={thing.link}
      target="_blank"
      rel="noreferrer"
    >
      {thing.title}
    </a>
  );
};

const RenderProject = ({ project, index, lang, sys }) => {
  return (
    <div className="project">
      {project.link ? (
        <>
          <a
            href={
              project.mobile && sys === "ios" ? project.linkIos : project.link
            }
            target="_blank"
            rel="noreferrer"
            className="title"
          >
            {project.title}
            <img className="title-link" src={link} alt="link-img" />
          </a>
        </>
      ) : (
        <h2 className="title">{project.title}</h2>
      )}

      <hr />
      <div className="two-grids">
        {index % 2 !== 0 ? (
          <div className="images">
            <ImageViewer img={project} />
          </div>
        ) : (
          <></>
        )}
        <p className={index % 2 === 0 ? "left" : "right"}>
          {getText(lang, project.description)}
          <br /> <br />
          <span>{project.tecs}</span>
          {/* {project.tecs?.map((i) => {
            return <span>{i}</span>;
          })} */}
        </p>
        {index % 2 === 0 ? (
          <div className="images">
            <ImageViewer img={project} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const Home = () => {
  const [pre, setPre] = useState();
  const [lang, setLang] = useState("EN");
  const [sys, setSys] = useState("");

  React.useEffect(() => {
    setPre(document.querySelector("pre"));

    if (
      /iPad|iPhone|iPod/.test(navigator.userAgent || navigator.vendor) &&
      !window.MSStream
    ) {
      setSys("ios");
    }
  }, []);

  if (window.innerWidth > 800) {
    document.addEventListener("mousemove", (e) => {
      rotateElement(e, pre);
    });
  }

  function rotateElement(event, element) {
    // get mouse position
    const x = event.clientX;
    const y = event.clientY;
    // console.log(x, y)

    // find the middle
    const middleX = 850;
    const middleY = 450;
    // console.log(middleX, middleY)

    // get offset from middle as a percentage
    // and tone it down a little
    const offsetX = ((x - middleX) / middleX) * 20;
    const offsetY = ((y - middleY) / middleY) * 20;
    // console.log(offsetX, offsetY);

    // set rotation
    element?.style.setProperty("--rotateX", offsetX + "deg");
    element?.style.setProperty("--rotateY", -1 * offsetY + "deg");
  }

  const handleToggle = () => {
    setLang(lang === "PT" ? "EN" : "PT");
  };

  const handleText = (text) => {
    return getText(lang, text);
  };

  return (
    <div>
      <div className="mobile-only">
        <LangToggle lang={lang} toggle={handleToggle} />
      </div>
      <Headerbar lang={lang} toggle={handleToggle} />
      <div id="main" className="main two-grids">
        <div className="text">
          <div className="desc">
            <p>{handleText("mainTextOne")}</p>
            <span className="purple">{handleText("mainTextTwo")}</span>
            <p>{handleText("mainTextThree")}</p>
          </div>
        </div>
        <pre>
          <img className="eudem" src={euDem} alt={"eu demonio"} />
        </pre>
      </div>
      <div id="about" className="about">
        <h1>{handleText("aboutHeader")}</h1>
        <div className="two-grids">
          <div className="who-am">
            <h2>{handleText("aboutOne")}</h2>
            {handleText("aboutText")}
          </div>
          <div className="things">
            <h2>{handleText("aboutTwo")}</h2>
            <div className="things-container">
              {things.map((i) => {
                return <BuildThings thing={i} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <div id="projects" className="projects-container">
        <h1>{handleText("professionalHeader")}</h1>
        {projects.map((i, idx) => {
          return (
            <RenderProject project={i} index={idx} lang={lang} sys={sys} />
          );
        })}
      </div>
      <div id="contact" className="contact">
        <h1>{handleText("contactHeader")}</h1>
        <p>{handleText("contactDesc")}</p>
        <div>
          <a
            className="effect-link email"
            href="mailto:flavioebn@gmail.com"
            rel="noreferrer"
            target="_blank"
          >
            <img src={gmail} alt="contact-email" />
            <span>Gmail</span>
          </a>
          <a
            className="effect-link linkedin"
            href="https://www.linkedin.com/in/flavioebn/"
            rel="noreferrer"
            target="_blank"
          >
            <img src={linkedinIcon} alt="contact-email" />
            <span>LinkedIn</span>
          </a>
          <a
            className="effect-link github"
            href="https://github.com/flavioebn"
            rel="noreferrer"
            target="_blank"
          >
            <img src={github} alt="contact-email" />
            <span>Github</span>
          </a>
          <a
            className="effect-link instagram"
            href="https://www.instagram.com/flavioebn/"
            rel="noreferrer"
            target="_blank"
          >
            <img src={instagram} alt="contact-email" />
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
