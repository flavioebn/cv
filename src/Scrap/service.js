import axios from "axios";
const cheerio = require("cheerio");

const searchString = (card) => {
  return `?view=ecom%2Fitens&id=461&searchExactMatch=&busca=${card}&x=0&y=0&txt_limit=120&txt_estoque=1`;
};

const search = async (store, card, cardString) => {
  let response = {
    link: "",
    cards: [],
  };
  await axios(
    `https://proxyanywhere-flavioebn.b4a.run/https://${store}.com.br/${cardString}`
  )
    .then((res) => {
      const html = res.data;
      const keytoget = "x-final-url";
      response.link = res.headers[keytoget];
      const $ = cheerio.load(html);
      let newLayout;
      let tagToSearch;
      //checagem pelo tipo de pagina
      if ($(".breadcrumbs", html).length > 0) {
        newLayout = true;
        tagToSearch = ".panel--content.m-top-0";
        if ($(".forca_conteudo_final", html).length > 0) {
          tagToSearch = ".table-cards-row";
          // console.log("novo cagado");
        }
      } else {
        newLayout = false;
        tagToSearch = ".hmin30";
      }
      //
      if (
        $(".container").find("section").attr("class") ===
          "main-products main-cards" ||
        $(".itemMain", html).length > 0
      ) {
        //na pagina da carta
        let counter = 0;
        let currentCard = [];
        let ignore = false;
        $(tagToSearch, html).each(function (e) {
          if (!newLayout) {
            switch (counter) {
              case 0:
                //edição
                currentCard.push($(this).find("a").find("img").attr("title"));
                break;
              case 1:
                //idioma
                currentCard.push($(this).text().substring(2));
                break;
              case 2:
                //estado da carta
                currentCard.push($(this).find("font").text());
                break;
              case 3:
                //extra
                currentCard.push($(this).find("font").text());
                break;
              case 4:
                //estoque
                currentCard.push($(this).text());
                if ($(this).text() === "0 unid.") {
                  ignore = true;
                }
                break;
              case 5:
                //preço
                let price = $(this).text();
                if (price.length > 15) {
                  price = $(this).find("font").text();
                }
                currentCard.push(price);
                break;
              default:
                break;
            }
            counter++;
            if (counter > 6) {
              if (!ignore) response.cards.push(currentCard);
              counter = 0;
              currentCard = [];
            }
          } else {
            $(this)
              .find("div")
              .find("div")
              .each(function () {
                switch (counter) {
                  case 3:
                    // coleção
                    currentCard.push($(this).find("p").text());
                    break;
                  case 5:
                    // idioma
                    currentCard.push($(this).find("p").text());
                    break;
                  case 6:
                    // estado
                    currentCard.push($(this).find("p").text());
                    break;
                  case 8:
                    // extra
                    currentCard.push(
                      $(this)
                        .find("font")
                        .text()
                        .replace(/\r?\t|\r/g, "")
                        .replace(/\r?\n|\r/g, "")
                        .replace(/\s/g, "")
                    );
                    break;
                  case 9:
                    // estoque
                    if ($(this).find("span").text() === "0 unid.") {
                      ignore = true;
                    }
                    currentCard.push($(this).find("span").text());
                    break;
                  case 11:
                    // preço
                    currentCard.push($(this).find("font").last().text());
                    break;
                  default:
                    break;
                }
                counter++;
                if (counter > 16) {
                  if (!ignore) response.cards.push(currentCard);
                  counter = 0;
                  currentCard = [];
                }
              });
          }
        });
      } else if ($(".nav-category-filters", html).length > 0) {
        // console.log("ta na busca");
        let newSearch;
        $(".title", html).each(function (e) {
          if ($(this).last().text().toLowerCase() === card.toLowerCase()) {
            newSearch = $(this).find("a").attr("href");
          }
        });
        response.link = `TRYAGAIN${newSearch}`;
      } else if ((tagToSearch = ".table-cards-row")) {
        let counter = 0;
        let currentCard = [];
        let ignore = false;
        $(".table-cards-body-cell", html).each(function (e) {
          switch (counter) {
            case 0: //coleção
              currentCard.push($(this).find("div").last().text());
              break;
            case 1: //idioma
              currentCard.push($(this).find("div").last().text());
              break;
            case 2: //condição
              currentCard.push($(this).find("div").last().text());
              break;
            case 3: //extra
              currentCard.push($(this).find("div").last().text());
              break;
            case 4: //estoque
              if ($(this).text().match(/\d+/)[0] === "0") {
                ignore = true;
                break;
              }
              currentCard.push($(this).text().match(/\d+/)[0]);
              break;
            case 5: //preço
              let tempArray = $(this).text().match(/\d+/).input.split("\n");
              let ultimoItem = null;
              for (let i = tempArray.length - 1; i >= 0; i--) {
                const item = tempArray[i].trim(); // Remove espaços em branco no início e fim
                if (item !== "") {
                  ultimoItem = item;
                  break;
                }
              }
              currentCard.push(ultimoItem);
              break;

            default:
              break;
          }
          counter++;
          if (counter > 6) {
            if (!ignore) response.cards.push(currentCard);
            counter = 0;
            currentCard = [];
          }
        });
      }
      // else {
      //   console.log("ta na busca");
      //   const tag = newLayout ? ".card-img" : ".pProdItens";
      //   $(tag, html).each(function (e) {
      //     const namePt = $(this).find(".xtitleP").find("a").attr("title");
      //     const nameEn = $(this)
      //       .find(".xtitleP")
      //       .find("div")
      //       .find("a")
      //       .attr("title");
      //     if (
      //       namePt
      //         ?.toLowerCase()
      //         .normalize("NFD")
      //         .replace(/[\u0300-\u036f]/g, "") ===
      //         card
      //           .toLowerCase()
      //           .normalize("NFD")
      //           .replace(/[\u0300-\u036f]/g, "") ||
      //       nameEn?.toLowerCase() === card.toLowerCase()
      //     ) {
      //       response.link = $(this).find("a").attr("href").substring(2);
      //       // console.log("chegou");
      //       search(store, card, $(this).find("a").attr("href").substring(2));
      //     }
      //   });
      // }
    })
    .catch((err) => console.log(err));
  return response;
};

export const getData = async (stores, cards) => {
  const final = [];
  for (let i = 0; i < stores.length; i++) {
    const temp = [];
    for (let j = 0; j < cards.length; j++) {
      let cardsInStore = await search(
        stores[i],
        cards[j],
        searchString(cards[j])
      );
      if (cardsInStore.link.includes("TRYAGAIN")) {
        cardsInStore = await search(
          stores[i],
          cards[j],
          cardsInStore.link.slice(8, 70)
        );
      }
      temp.push({
        card: cards[j],
        inStock: cardsInStore.cards,
        link: cardsInStore.link,
      });
    }
    final.push({
      store: stores[i],
      total: `${temp.filter((i) => i.inStock.length !== 0).length}/${
        cards.length
      }`,
      cards: temp,
    });
    // console.log(final);
  }
  return final;
};
