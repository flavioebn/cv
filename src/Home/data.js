import b1 from "../assets/images/backoffice1.png";
import b2 from "../assets/images/xiplanding.png";
import b3 from "../assets/images/backoffice3.png";
import b4 from "../assets/images/backoffice4.png";
import k1 from "../assets/images/kynd1.png";
import k2 from "../assets/images/kynd2.png";
import k3 from "../assets/images/kynd3.png";
import k4 from "../assets/images/kynd4.png";
import x1 from "../assets/images/x1.png";
import x2 from "../assets/images/x2.png";
import x3 from "../assets/images/x3.png";
import x4 from "../assets/images/x4.png";
import g1 from "../assets/images/g1.png";
import g2 from "../assets/images/g2.png";
import g3 from "../assets/images/g3.png";
import g4 from "../assets/images/g4.png";
import c1 from "../assets/images/cartesian1.png";
import c2 from "../assets/images/cartesian2.png";
import c3 from "../assets/images/cartesian3.png";
import c4 from "../assets/images/cartesian4.png";
import hub1 from "../assets/images/hv1.png";
import hub2 from "../assets/images/hv2.png";
import hub3 from "../assets/images/hv3.png";
import hub4 from "../assets/images/hv4.png";

export const projects = [
  {
    title: "Conta XIP - Web",
    description: "xipWeb",
    images: [b2, b1, b3, b4],
    tecs: "React | MongoDB | SASS",
    link: "https://www.contaxip.com/",
  },
  {
    title: "Conta XIP - Mobile",
    description: "xipApp",
    images: [x1, x2, x3, x4],
    tecs: "React Native | MongoDB ",
    mobile: true,
    link: "https://play.google.com/store/apps/details?id=com.solarpay.contaxip&pli=1",
    linkIos: "https://apps.apple.com/us/app/conta-xip/id1553506089",
  },
  // {
  //   title: "Cartesian",
  //   description: "cartesian",
  //   tecs: "React | SASS",
  //   images: [c1, c2, c3, c4],
  // },
  {
    title: "Kynd Wellness",
    description: "kynd",
    tecs: "React | PWA | Firestore",
    images: [k1, k2, k3, k4],
    mobile: true,
    link: "https://play.google.com/store/apps/details?id=com.ionicframework.kyndclientlocal91965301&hl=en_NZ",
    linkIos:
      "https://apps.apple.com/us/app/kynd-wellness/id1178897528?platform=iphone",
  },
  {
    title: "GD",
    description: "gd",
    tecs: "React | SASS",
    images: [g1, g2, g3, g4],
  },
  {
    title: "My Hub",
    description: "hub",
    tecs: "React | SASS | PWA | Cheerio",
    link: "/hub",
    images: [hub1, hub2, hub3, hub4],
  },
];

export const thingsIKnow = [
  { title: "React", link: "https://react.dev/" },
  { title: "React Native", link: "https://reactnative.dev/" },
  {
    title: "JavaScript",
    link: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript",
  },
  { title: "TypeScript", link: "https://www.typescriptlang.org/" },
  { title: "SASS", link: "https://sass-lang.com/" },
  { title: "Jest", link: "https://jestjs.io/" },
  { title: "Nodejs", link: "https://nodejs.org/en" },
  { title: "Express", link: "https://expressjs.com" },
  { title: "REST Api", link: "https://aws.amazon.com/what-is/restful-api/" },
  { title: "Git", link: "https://git-scm.com/" },
  { title: "Scrum", link: "https://aws.amazon.com/what-is/scrum/" },
  { title: "Postman", link: "https://www.postman.com/" },
  { title: "MongoDB", link: "https://www.mongodb.com/" },
  {
    title: "Firestore",
    link: "https://firebase.google.com/docs/firestore?hl=pt-br",
  },
  { title: "Cheerio", link: "https://cheerio.js.org/" },
  {
    title: "Componentization",
    link: "https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_components",
  },
  { title: "Styled Components", link: "https://styled-components.com/" },
  { title: "UI/UX", link: "https://react.dev/" },
  { title: "Bootstrap", link: "https://getbootstrap.com/" },
  {
    title: "Photoshop",
    link: "https://www.adobe.com/br/products/photoshop.html",
  },
  {
    title: "Illustrator",
    link: "https://www.adobe.com/br/products/illustrator.html",
  },
];
