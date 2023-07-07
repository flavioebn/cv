const aboutPT = () => {
  return (
    <p>
      Um desenvolvedor front-end brasileiro viciado em One Piece, Magic e RPGs,
      formado em <span>Design de Jogos e Entretenimento digital</span>, e pós
      graduado em
      <span> Marketing Digital</span>. <br />
      <br />
      Focado em <span>React</span>, tenho uma experiência sólida no
      desenvolvimento de interfaces de usuário que são responsivas e super
      funcionais, sempre seguindo as melhores práticas e aproveitando os
      melhores frameworks. <br />
      <br />
      Nos últimos anos me aprimorei nas partes de <span>componentização</span>,
      integração com <span>APIs</span> externas, gerenciamento de estado com{" "}
      <span>Context</span> e <span>React Hooks</span>,{" "}
      <span>responsividade</span> e <span>clean code</span>.
      <br />
      <br />
      Sou completamente apaixonado por criar soluções para qualquer tipo de
      problema, pesquisando e aprendendo o que for necessário pra fazer o que
      precisar do melhor jeito o possível.
    </p>
  );
};

const aboutEN = () => {
  return (
    <p>
      A Brazilian front-end developer addicted to One Piece, Magic The Gathering
      and RPGs, graduated in <span>Game Design and Digital Entertainment</span>,
      and with a postgraduate degree in <span>Digital Marketing</span>. <br />
      <br />
      With a focus on <span>React</span>, I have a strong experience in
      developing user interfaces that are responsive and highly functional,
      always following best practices and with the best frameworks. <br />
      <br />
      Over the last years, I have specialized in <span>componentization</span>,
      integration with external <span>APIs</span>, state management with{" "}
      <span>Context</span> and <span>React Hooks</span>,
      <span>responsiveness</span>, and <span>clean code</span>.
      <br />
      <br />I am completely passionate about creating solutions for any kind of
      problem, studying and learning whatever is necessary to deliver the best
      possible solution in the most efficient way.
    </p>
  );
};

const PT = {
  headerTextOne: "1_inicio",
  headerTextTwo: "2_sobre",
  headerTextThree: "3_projetos",
  headerTextFour: "4_contato",
  mainTextOne: "Oi, eu sou o",
  mainTextTwo: "Flávio,",
  mainTextThree: "e eu faço web-coisas.",
  aboutHeader: "Sobre mim",
  aboutText: aboutPT(),
  aboutOne: "Quem sou eu",
  aboutTwo: "Coisas que eu manjo",
  professionalHeader: "Projetos profissionais",
  xipWeb:
    "Desenvolvimento de uma landing page e o backoffice para controle de usuários e clientes da Conta XIP, e integração com o banco de dados. O sistema era utilizado pelos funcionários da para fazer a aprovação e controle dos clientes que utilizavam a Conta XIP, e posteriormente foram adicionadas funcionalidades para controlar os conteúdos do app mobile.",
  xipApp:
    "Paralelo ao primeiro projeto, foi desenvolvido o app mobile para os clientes da Conta XIP, solução financeira digital para clientes Solar, do grupo Coca-Cola, trazendo todas as funções necessárias em um aplicativo bancário para as operações do dia-a-dia.",
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
  aboutText: aboutEN(),
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
