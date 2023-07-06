const PT = {
  headerTextOne: "1_inicio",
  headerTextTwo: "2_sobre",
  headerTextThree: "3_projetos",
  headerTextFour: "4_contato",
  mainTextOne: "Oi, eu sou o",
  mainTextTwo: "Flávio,",
  mainTextThree: "e eu faço web-coisas.",
  aboutHeader: "Sobre mim",
  aboutOne: "Quem sou eu",
  aboutTwo: "Coisas que eu manjo",
  professionalHeader: "Projetos profissionais",
  contactHeader: "Contato",
  contactDesc:
    "Se gostou do que viu ou quer saber mais sobre mim, fique a vontade pra me contatar como preferir:",
};

const EN = {
  headerTextOne: "1_main",
  headerTextTwo: "2_about",
  headerTextThree: "3_projects",
  headerTextFour: "4_contact",
  mainTextOne: "Hi, I'm",
  mainTextTwo: "Flávio,",
  mainTextThree: "and I build web-things.",
  aboutHeader: "About me",
  aboutOne: "Who am I",
  aboutTwo: "Things I know about",
  professionalHeader: "Professional projects",
  contactHeader: "Contact",
  contactDesc:
    "If you like what you saw or want to know more about me, feel free to reach me through any of the following:",
};

export const getText = (lang, text) => {
  let response;
  if (lang === "PT") {
    response = PT[text];
  } else {
    response = EN[text];
  }
  return response;
};
