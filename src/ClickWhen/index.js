import { useState } from "react";

const labels = [
  {
    label: "tiver num dia ruim",
    content: "",
  },
  {
    label: "precisar rir",
    content: "",
  },
  {
    label: "não conseguir dormir",
    content: "",
  },
  {
    label: "estiver feliz",
    content: "",
  },
  {
    label: "se sentir sozinha",
    content: "",
  },
  {
    label: "estiver preocupada",
    content: "",
  },
  {
    label: "precisar de motivação",
    content: "",
  },
  {
    label: "for dia dos namorados",
    content: "",
  },
  {
    label: "quiser desistir",
    content: "",
  },
  {
    label: "ter problema no trabalho",
    content: "",
  },
  {
    label: "estiver doente",
    content: "",
  },
  {
    label: "estiver em dúvida",
    content: "",
  },
  {
    label: "precisar de um abraço",
    content: "",
  },
  {
    label: "precisar de um elogio",
    content: "",
  },
  {
    label: "precisar de uma dica de filme",
    content: "",
  },
  {
    label: "precisar de uma dica de serie",
    content: "",
  },
  {
    label: "precisar de uma dica de música",
    content: "",
  },
  {
    label: "estiver animada",
    content: "",
  },
  {
    label: "estiver entediada",
    content: "",
  },
  {
    label: "precisar tomar uma decisão importante",
    content: "",
  },
  {
    label: "estiver muito brava",
    content: "",
  },
  {
    label: "a gente brigar",
    content: (
      <>
        <p>pipipo po pop op ip iop </p>
      </>
    ),
  },
  {
    label: "quiser saber uma memória nossa que eu gosto",
    content: "",
  },
  {
    label: "quiser ver uma foto bonita nossa",
    content: "",
  },
  {
    label: "quiser que eu estivesse contigo",
    content: "",
  },
  {
    label: "quiser chorar",
    content: "",
  },
  {
    label: "estiver orgulhosa de si mesma",
    content: "",
  },
  {
    label: "quiser nostalgia",
    content: "",
  },
  {
    label: "precisar se sentir amada",
    content: "",
  },
  {
    label: "estiver brava comigo",
    content: "",
  },
  {
    label: "eu estiver bravo contigo",
    content: "",
  },
  {
    label: "quiser fazer algo novo",
    content: "",
  },
  {
    label: "for o nosso aniversário de namoro",
    content: "",
  },
  {
    label: "quiser saber algo que me lembra de ti",
    content: "",
  },
  {
    label: "precisar de sugestão do que comer",
    content: "",
  },
  {
    label: "precisar de alguém pra te ouvir",
    content: "",
  },
  {
    label: "precisar",
    content: "",
  },
  {
    label: "for natal",
    content: "",
  },
  {
    label: "estiver de aniversário",
    content: "",
  },
  {
    label: "estiver triste",
    content: "",
  },
];

const ClickWhen = () => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleOpen = (e) => {
    setTitle(e.label);
    setContent(e.content);
    setModal(true);
  };

  return (
    <div>
      <div className={`panel ${modal ? "open" : "closed"}`}>
        <div className="content">
          <h2>{title}</h2>
          {content}
        </div>
      </div>
      <h1 onClick={() => setModal(!modal)}>Clica aqui quando...</h1>
      <p>• ...receber esse link</p>
      {labels
        .sort((a, b) => a.label.localeCompare(b.label))
        .map((i) => {
          return (
            <div>
              <p onClick={() => handleOpen(i)}>• ...{i.label}</p>
            </div>
          );
        })}
    </div>
  );
};

export default ClickWhen;
