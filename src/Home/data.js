import b1 from "../assets/backoffice1.png";
import b2 from "../assets/xiplanding.png";
import b3 from "../assets/backoffice3.png";
import b4 from "../assets/backoffice4.png";
import k1 from "../assets/kynd1.png";
import k2 from "../assets/kynd2.png";
import k3 from "../assets/kynd3.png";
import k4 from "../assets/kynd4.png";
import x1 from "../assets/x1.png";
import x2 from "../assets/x2.png";
import x3 from "../assets/x3.png";
import x4 from "../assets/x4.png";
import g1 from "../assets/g1.png";
import g2 from "../assets/g2.png";
import g3 from "../assets/g3.png";
import g4 from "../assets/g4.png";
import c1 from "../assets/cartesian1.png";
import c2 from "../assets/cartesian2.png";
import c3 from "../assets/cartesian3.png";
import c4 from "../assets/cartesian4.png";

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur varius lacus quis imperdiet pulvinar. Curabitur eget iaculis eros, a pharetra lorem. Curabitur aliquam, metus vel volutpat ornare, nibh diam egestas purus, at volutpat elit nulla ut dui. Proin quis turpis id sapien gravida luctus. Nam ac nunc dapibus, ornare risus id, rutrum quam. Vestibulum viverra, purus vel placerat viverra, diam sapien facilisis dolor, ac ultricies dolor dolor nec massa. Vestibulum mattis dignissim arcu. Sed id orci ut lorem imperdiet mattis. Ut eget aliquet sapien. Proin in ex posuere, interdum sapien a, sodales est.";

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
  { title: "Cartesian", description: lorem, images: [c1, c2, c3, c4] },
  {
    title: "Kynd Wellness",
    description: lorem,
    images: [k1, k2, k3, k4],
    mobile: true,
    link: "https://play.google.com/store/apps/details?id=com.ionicframework.kyndclientlocal91965301&hl=en_NZ",
    linkIos:
      "https://apps.apple.com/us/app/kynd-wellness/id1178897528?platform=iphone",
  },
  { title: "GD", description: lorem, images: [g1, g2, g3, g4] },
];

export const thingsIKnow = [
  { title: "React", link: "https://react.dev/" },
  { title: "React Native", link: "https://reactnative.dev/" },
  {
    title: "JavaScript",
    link: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript",
  },
  { title: "HTML", link: "https://developer.mozilla.org/pt-BR/docs/Web/HTML" },
  { title: "CSS", link: "https://developer.mozilla.org/pt-BR/docs/Web/CSS" },
  { title: "SASS", link: "https://sass-lang.com/" },
  { title: "TypeScript", link: "https://www.typescriptlang.org/" },
  { title: "Node.js", link: "https://nodejs.org/en" },
  { title: "REST Api", link: "https://aws.amazon.com/what-is/restful-api/" },
  { title: "Git", link: "https://git-scm.com/" },
  { title: "Scrum", link: "https://aws.amazon.com/what-is/scrum/" },
  { title: "Postman", link: "https://www.postman.com/" },
  { title: "MongoDB", link: "https://www.mongodb.com/" },
  {
    title: "Firestore",
    link: "https://firebase.google.com/docs/firestore?hl=pt-br",
  },
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
