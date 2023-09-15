import hub1 from "../assets/images/hub1.png";
import hub2 from "../assets/images/hub2.png";
import hub3 from "../assets/images/hub3.png";
import hub4 from "../assets/images/hub4.png";
import hub5 from "../assets/images/hub5.png";
import hub6 from "../assets/images/hub6.png";
import hub7 from "../assets/images/hub7.png";

export const data = [
  {
    title: "Me, myself & I",
    desc: "Back to the my main page, where you can read more about me and my projects!",
    image: hub5,
    to: "/",
  },
  {
    title: "Party & Initiative tracker",
    desc: "My D&D 5e DM app to track my party details and initiative, and write my notes as the game goes on. *NOT mobile friendly*",
    image: hub6,
    to: "/party",
  },
  {
    title: "Checklist",
    desc: "Checklist Checklist Checklist Checklist Checklist Checklist Checklist",
    image: hub7,
    to: "/checklist",
  },
  {
    title: "Drag & Drop",
    desc: "A phrases drag and drop app, where you can make your own lists as you want. *NOT mobile friendly*",
    image: hub7,
    to: "/drag",
  },
  {
    title: "Expiry tracker",
    desc: "A simple tracker for products expiry dates. *NOT desktop friendly*",
    to: "/expiry",
    image: hub1,
  },
  {
    title: "MTG Scrapper",
    desc: "Webscrapper I did for brazilian MTG stores, where you can find which stores have the most cards in your list. *NOT mobile friendly*",
    image: hub4,
    to: "/scrap",
  },
  {
    title: "Photocard Calculator",
    desc: "A Yen (¥) to BRL (R$) calculator for k-pop photocards buyers, with the seller taxes and current wise rates already included.",
    image: hub3,
    to: "/cardcaptorcami",
  },
  {
    title: "Color timers",
    desc: "A friend of mine needed a color randomizer each X seconds for some reflex exercises, so I came with this solution. *NOT desktop friendly*",
    image: hub2,
    to: "/reflex",
  },
];
