import placeholder from "../assets/images/backoffice3.png";
import hub1 from "../assets/images/hub1.png";
import hub2 from "../assets/images/hub2.png";
import hub3 from "../assets/images/hub3.png";
import hub4 from "../assets/images/hub4.png";
import hub5 from "../assets/images/hub5.png";

export const data = [
  {
    title: "Me, myself & I",
    desc: "Back to the my main page, where you can read more about me and my projects!",
    image: hub5,
    to: "/",
  },
  {
    title: "Expiry tracker",
    desc: "A simple tracker for products expiry dates. *NOT desktop friendly",
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
    desc: "A friend of mine needed a color randomizer each X seconds for some reflex exercises, so I came with this solution. *NOT desktop friendly",
    image: hub2,
    to: "/reflex",
  },
];
