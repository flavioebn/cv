import React, { useState, useRef } from "react";
import Headerbar from "./headerbar";
import euDem from "../assets/dem.png";
import { projects, thingsIKnow as things } from "./data";
import ImageViewer from "./imageViewer";
import linkedinIcon from "../icons/linkedin.svg";
import instagram from "../icons/instagram.svg";
import gmail from "../icons/email.svg";
import github from "../icons/github.svg";

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

const RenderProject = ({ project, index, handleImage }) => {
  const RenderImages = () => {
    return [1, 2, 3, 4].map((i) => {
      return (
        <img
          onClick={(project) => handleImage(project, i)}
          src={`/images/${project.images}${i}.png`}
          alt={project.images + i}
        />
      );
    });
  };

  return (
    <div className="project">
      <h2 className="title">{project.title}</h2>
      <hr />
      <div className="two-grids">
        {index % 2 !== 0 ? (
          <div className="images">
            <RenderImages />
          </div>
        ) : (
          <></>
        )}
        <p className={index % 2 === 0 ? "left" : "right"}>
          {project.description}
        </p>
        {index % 2 === 0 ? (
          <div className="images">
            <RenderImages />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const Home = () => {
  const [image, setImage] = useState({
    title: "backoffice",
    idx: 1,
  });
  const [pre, setPre] = useState();
  const [imageViewer, setImageViewer] = useState(false);

  React.useEffect(() => {
    setPre(document.querySelector("pre"));
  }, []);

  const handleImage = (project) => {
    const name = project.target.alt.slice(0, project.target.alt.length - 1);
    const idx = project.target.alt.slice(
      project.target.alt.length - 1,
      project.target.alt.length
    );
    setImage({
      title: name,
      idx: parseInt(idx),
    });
    setImageViewer(true);
  };

  const next = () => {
    let newIndex;
    if (image.idx === 4) {
      newIndex = 1;
    } else {
      newIndex = image.idx + 1;
    }
    setImage({ ...image, idx: newIndex });
  };

  const previous = () => {
    let newIndex;
    if (image.idx === 1) {
      newIndex = 4;
    } else {
      newIndex = image.idx - 1;
    }
    setImage({ ...image, idx: newIndex });
    console.log(newIndex);
  };

  document.addEventListener("mousemove", (e) => {
    rotateElement(e, pre);
  });

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

  return (
    <div>
      <Headerbar />
      {imageViewer && (
        <ImageViewer
          img={image}
          handleLeft={previous}
          handleRight={next}
          close={() => setImageViewer(false)}
        />
      )}
      <div id="main" className="main two-grids">
        <div className="text">
          <div className="desc">
            <p>Oi, eu sou o</p>
            <span>Flávio,</span>
            <p>e eu faço web-coisas.</p>
          </div>
        </div>
        <pre>
          <img className="eudem" src={euDem} alt={"eu demonio"} />
        </pre>
      </div>
      <div className="about">
        <h1>Sobre mim</h1>
        <div className="two-grids">
          <div className="who-am">
            <h2>Quem sou eu</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              varius lacus quis imperdiet pulvinar. Curabitur eget iaculis eros,
              a pharetra lorem. Curabitur aliquam, metus vel volutpat ornare,
              nibh diam egestas purus, at volutpat elit nulla ut dui. Proin quis
              turpis id sapien gravida luctus. Nam ac nunc dapibus, ornare risus
              id, rutrum quam. Vestibulum viverra, purus vel placerat viverra,
              diam sapien facilisis dolor, ac ultricies dolor dolor nec massa.
              Vestibulum mattis dignissim arcu. Sed id orci ut lorem imperdiet
              mattis. Ut eget aliquet sapien. Proin in ex posuere, interdum
              sapien a, sodales est.
            </p>
          </div>
          <div className="things">
            <h2>Do que eu manjo</h2>
            <div className="things-container">
              {things.map((i) => {
                return <BuildThings thing={i} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="projects-container">
        <h1>Projetos profissionais</h1>
        {projects.map((i, idx) => {
          return (
            <RenderProject project={i} index={idx} handleImage={handleImage} />
          );
        })}
      </div>
      <div className="contact">
        <h1>Contato</h1>
        <p>
          Se gostou do que viu ou quer saber mais sobre qualquer coisa, fique a
          vontade pra me contatar como preferir:
        </p>
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
