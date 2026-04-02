import { useEffect, useState } from "react";
import plusIcon from "../assets/icons/plus.svg";
import linkIcon from "../assets/icons/link.svg";
import closeIcon from "../assets/icons/close.svg";
import saveIcon from "../assets/icons/save.svg";
import changeIcon from "../assets/icons/change.svg";
import editIcon from "../assets/icons/edit.svg";
import copyIcon from "../assets/icons/copy.svg";
import trashIcon from "../assets/icons/trash-thin.svg";
import checklistIcon from "../assets/icons/checklist.svg";
import arrowUp from "../assets/icons/arrow-up.svg";
import { copyToClipboard, getFromStorage, setStorage } from "../utils/utils";
import { stolen } from "./stolen";

const RecipeCard = ({ recipe, handleEdit, handleDelete, personalView }) => {
  // Função para gerar link de compartilhamento
  const getShareLink = () => {
    try {
      const data = btoa(encodeURIComponent(JSON.stringify(recipe)));
      return `${window.location.origin}${window.location.pathname}?data=${data}`;
    } catch (e) {
      alert("Erro ao gerar link de compartilhamento");
      return "";
    }
  };

  // const handleShare = async () => {
  //   const link = getShareLink();
  //   try {
  //     await navigator.clipboard.writeText(link);
  //     setQrValue(link);
  //     alert("Link copiado! Cole para compartilhar.");
  //   } catch {
  //     prompt("Copie o link:", link);
  //   }
  // };
  const [open, setOpen] = useState(false);
  // const [qrValue, setQrValue] = useState("");

  const handleCopy = async () => {
    const textToCopy = `
Receita: ${recipe.name}
Ingredientes:
${
  recipe.ingredients[0].name === undefined
    ? recipe.ingredients.join("\n")
    : recipe.ingredients.map((i) => `${i.quantity} ${i.name}`).join("\n")
}
Instruções:
${recipe.instructions}
Link: ${recipe.link}
  `.trim();

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const ta = document.createElement("textarea");
        ta.value = textToCopy;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        ta.setSelectionRange(0, ta.value.length);
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
    } catch (err) {
      alert("Deu algum erro, sei la pq, tenta de novo ai ou sei la");
    }
  };

  const saveRecipe = () => {
    const savedRecipes = getFromStorage("my-recipes") || [];
    const alreadySaved = savedRecipes.some(
      (r) => r.name === recipe.name && r.instructions === recipe.instructions,
    );
    if (alreadySaved) {
      const removed = savedRecipes.filter(
        (r) => r.name !== recipe.name || r.instructions !== recipe.instructions,
      );
      setStorage("my-recipes", removed);
      setIsSaved(false);
      return;
    }
    const newSavedRecipes = [...savedRecipes, recipe];
    setStorage("my-recipes", newSavedRecipes);
    setIsSaved(true);
  };

  const [isSaved, setIsSaved] = useState(false);
  useEffect(() => {
    const savedRecipes = getFromStorage("my-recipes") || [];
    const alreadySaved = savedRecipes.some(
      (r) => r.name === recipe.name && r.instructions === recipe.instructions,
    );
    setIsSaved(alreadySaved);
  }, [recipe]);

  return (
    <div className="recipe-card">
      <div onClick={() => setOpen(!open)} className="recipe-card-header">
        <h3>{recipe.name === "" ? "Receita sem nome" : recipe.name}</h3>
        <img
          src={arrowUp}
          className={`arrow ${open ? "open" : "closed"}`}
          alt="arrowUp"
        />
      </div>

      <div className={open ? "open details" : "details"}>
        <p style={{ marginBottom: "0px" }}>Ingredientes:</p>
        <ul style={{ marginTop: "0px" }}>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>
              {typeof ingredient === "string"
                ? ingredient
                : `${ingredient.quantity} ${ingredient.name}`}
            </li>
          ))}
        </ul>
        <p style={{ marginBottom: "0px" }}>Instruções:</p>
        <p
          style={{
            marginLeft: "24px",
            marginTop: "0px",
            whiteSpace: "pre-line",
          }}
        >
          {recipe.instructions}
        </p>
        <div className="card-buttons">
          {typeof recipe.ingredients[0].name !== "undefined" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(recipe);
              }}
            >
              <img src={editIcon} alt="editIcon" />
            </button>
          )}
          {recipe.link && (
            <button onClick={() => window.open(recipe.link, "_blank")}>
              <img className="link-icon" src={linkIcon} alt="linkIcon" />
            </button>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
          >
            <img className="copy-icon" src={copyIcon} alt="copyIcon" />
          </button>
          {/* <button
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
          >
            <img className="qr-icon" src={qrCodeIcon} alt="qrIcon" />
          </button> */}
          <button onClick={handleDelete}>
            <img className="trash-icon" src={trashIcon} alt="trashIcon" />
          </button>
          {recipe.ingredients[0].name === undefined && (
            <button onClick={saveRecipe}>
              <img
                className={"save-icon" + (isSaved ? " saved" : "")}
                src={saveIcon}
                alt="saveIcon"
              />
            </button>
          )}
        </div>
        {/* {qrValue && (
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={qrValue}
            viewBox={`0 0 256 256`}
          />
        )} */}
      </div>
    </div>
  );
};

const RecipeToBuyCard = ({ recipe, recipesToBuy, setRecipesToBuy }) => {
  const isSelected = recipesToBuy.includes(recipe);
  return (
    <div
      onClick={() => {
        if (isSelected) {
          setRecipesToBuy((prev) => prev.filter((r) => r !== recipe));
        } else {
          setRecipesToBuy((prev) => [...prev, recipe]);
        }
      }}
    >
      <input type="checkbox" checked={isSelected} />
      <span
        key={recipe.name}
        className={"select-recipe " + (isSelected ? "selected" : "")}
        onClick={() => {
          if (isSelected) {
            setRecipesToBuy((prev) => prev.filter((r) => r !== recipe));
          } else {
            setRecipesToBuy((prev) => [...prev, recipe]);
          }
        }}
      >
        {recipe.name}
      </span>
    </div>
  );
};

const Recipes = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get("data");
    if (data) {
      try {
        const json = JSON.parse(decodeURIComponent(atob(data)));
        const storedRecipes = getFromStorage("my-recipes") || [];
        const exists = storedRecipes.some(
          (r) => r.name === json.name && r.instructions === json.instructions,
        );
        if (!exists) {
          const newList = [json, ...storedRecipes];
          setStorage("my-recipes", newList);
          setRecipes(newList);
        } else {
          setRecipes(storedRecipes);
        }
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname,
        );
        alert("Receita importada!");
      } catch {
        // blablablalba
      }
    }
  }, []);
  const [recipes, setRecipes] = useState([]);
  const [personalView, setPersonalView] = useState(true);
  const [view, setView] = useState("list");
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    ingredients: [{ name: "", quantity: "" }],
    instructions: "",
    link: "",
  });
  const [editing, setEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [shoppingListOpen, setShoppingListOpen] = useState(false);
  const [shoppingList, setShoppingList] = useState({ personal: [], extra: [] });
  const [scrollPercent, setScrollPercent] = useState(0);
  const [recipesToBuy, setRecipesToBuy] = useState([]);
  const [selectRecipesToBuyView, setSelectRecipesToBuyView] = useState(false);

  const handlePageView = () => {
    setView(view === "list" ? "add" : "list");
    setNewRecipe({
      name: "",
      ingredients: [{ name: "", quantity: "" }],
      instructions: "",
      link: "",
    });
    setEditing(false);
  };

  const handleEdit = (recipe) => {
    const newRecObj = JSON.parse(JSON.stringify(recipe)); // deep clone
    setNewRecipe(newRecObj);
    setEditing(true);
    setView("add");
    setEditingIndex(recipes.indexOf(recipe));
  };

  useEffect(() => {
    const storedRecipes = getFromStorage("my-recipes") || [];
    setRecipes(storedRecipes);
    // Carregar lista de compras do storage, se existir
    const storedToBuy = getFromStorage("recipes-to-buy");
    if (storedToBuy && Array.isArray(storedToBuy) && storedToBuy.length > 0) {
      // Filtra para garantir que só pegue receitas válidas
      const validToBuy = storedToBuy
        .map((r) =>
          storedRecipes.find(
            (s) => s.name === r.name && s.instructions === r.instructions,
          ),
        )
        .filter(Boolean);
      setRecipesToBuy(validToBuy);
    } else {
      setRecipesToBuy(storedRecipes);
    }

    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollTop / docHeight) * 100;
      setScrollPercent(scrollPercentage);
      // You can use scrollPercent for something if needed
    });
  }, []);

  const handleDeleteRecipe = (idx) => {
    window.confirm("Deletar essa receituxa? :(") &&
      setRecipes((prev) => {
        const updatedRecipes = prev.filter((_, i) => i !== idx);
        setStorage("my-recipes", updatedRecipes);
        return updatedRecipes;
      });
  };

  useEffect(() => {
    getShoppingList();
    // Salva a lista de compras no storage sempre que mudar
    setStorage("recipes-to-buy", recipesToBuy);
  }, [recipesToBuy]);

  const getShoppingList = () => {
    const allIngredients = [];
    const extra = [];
    recipesToBuy.forEach((i) => {
      i.ingredients.forEach((j) => {
        if (typeof j === "string") {
          const existing = extra.find((e) => e.ingredient === j);
          if (existing) {
            if (!existing.withThis.some((w) => w.toRecipe === i.name)) {
              existing.withThis.push({ toRecipe: i.name });
            }
          } else {
            extra.push({ ingredient: j, withThis: [{ toRecipe: i.name }] });
          }
        } else {
          if (!allIngredients.includes(j.name)) allIngredients.push(j.name);
        }
      });
    });
    allIngredients.sort();
    const byRecipe = [];
    allIngredients.forEach((i) => {
      let withThis = [];
      recipesToBuy
        .filter((r) =>
          r.ingredients.some(
            (ing) => ing?.name?.toLowerCase() === i.toLowerCase(),
          ),
        )
        .forEach((r) => {
          withThis.push({
            toRecipe: r.name,
            qty: r.ingredients.find(
              (ing) => ing?.name?.toLowerCase() === i.toLowerCase(),
            ).quantity,
          });
        });
      byRecipe.push({ ingredient: i, withThis });
    });
    setShoppingList({ personal: byRecipe, extra: extra });
  };

  const copyShoppingList = async () => {
    const list = [];
    shoppingList.personal.forEach((i) =>
      list.push(
        `• ${i.ingredient} (${i.withThis
          .map((j) => `${j.qty} pra ${j.toRecipe}`)
          .join(", ")})`,
      ),
    );
    shoppingList.extra.forEach((i) =>
      list.push(`• ${i.ingredient} (${i.withThis[0].toRecipe})`),
    );
    await copyToClipboard(list.join("\n"));
  };

  const handleChangeList = () => {
    if (personalView) {
      setRecipes(stolen);
    } else {
      const storedRecipes = getFromStorage("my-recipes") || [];
      setRecipes(storedRecipes);
    }
    setPersonalView(!personalView);
  };

  const handleOrder = (e) => {
    const orderBy = e.target.value;
    let sortedRecipes = [...recipes];
    if (orderBy === "name") {
      sortedRecipes.sort((a, b) => a.name.localeCompare(b.name));
    } else if (orderBy === "ingredients") {
      sortedRecipes.sort((a, b) => a.ingredients.length - b.ingredients.length);
    } else if (orderBy === "instructions") {
      sortedRecipes.sort(
        (a, b) => a.instructions.length - b.instructions.length,
      );
    }
    setRecipes(sortedRecipes);
  };

  const ListView = () => {
    return (
      <div style={{ paddingBottom: "94px" }}>
        <>
          <div
            className={
              "shopping-list " + (shoppingListOpen ? "open" : "closed")
            }
          >
            <h1 style={{ marginTop: "0px" }}>Compruxas</h1>
            <div className="select-recipes-to-buy-container">
              <div
                onClick={() =>
                  setSelectRecipesToBuyView(!selectRecipesToBuyView)
                }
                className="select-recipes-to-buy-header"
              >
                <img
                  src={arrowUp}
                  className={`arrow ${selectRecipesToBuyView ? "open" : "closed"}`}
                  alt="arrowUp"
                />
                <span>Selecionar receitas</span>
              </div>
              {selectRecipesToBuyView && (
                <>
                  <p
                    style={{
                      margin: "0px",
                      marginBottom: "4px",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() => setRecipesToBuy([])}
                  >
                    Limpar tudo
                  </p>
                  <div className="recipes-to-buy-list">
                    {recipes.map((i) => {
                      const isSelected = recipesToBuy.includes(i);
                      return (
                        <div
                          onClick={() => {
                            if (isSelected) {
                              setRecipesToBuy((prev) =>
                                prev.filter((r) => r !== i),
                              );
                            } else {
                              setRecipesToBuy((prev) => [...prev, i]);
                            }
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            readOnly
                          />
                          <span
                            key={i.name}
                            className={
                              "select-recipe " + (isSelected ? "selected" : "")
                            }
                            onClick={() => {
                              if (isSelected) {
                                setRecipesToBuy((prev) =>
                                  prev.filter((r) => r !== i),
                                );
                              } else {
                                setRecipesToBuy((prev) => [...prev, i]);
                              }
                            }}
                          >
                            {i.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
            <p style={{ fontWeight: "bold", marginBottom: "8px" }}>
              Das minhas receitas:
            </p>
            {shoppingList.personal.map((i) => {
              return (
                <p style={{ marginTop: "4px", marginBottom: "4px" }}>
                  • {i.ingredient} (
                  {i.withThis
                    .map((j) => `${j.qty} pra ${j.toRecipe}`)
                    .join(", ")}
                  )
                </p>
              );
            })}
            {shoppingList.extra.length > 0 && (
              <>
                <p
                  style={{
                    fontWeight: "bold",
                    marginBottom: "8px",
                    marginTop: "32px",
                  }}
                >
                  De outras receitas:
                </p>
                {shoppingList.extra.map((i) => {
                  return (
                    <p style={{ marginTop: "4px", marginBottom: "4px" }}>
                      • {i.ingredient} ({i.withThis[0].toRecipe})
                    </p>
                  );
                })}
              </>
            )}
            {shoppingListOpen && (
              <button
                className="copy-list"
                onClick={(e) => {
                  e.stopPropagation();
                  copyShoppingList();
                }}
              >
                <img className="copy-icon" src={copyIcon} alt="copyIcon" />
              </button>
            )}
          </div>
          {shoppingListOpen && (
            <>
              <div
                className="shopping-list-background"
                onClick={() => setShoppingListOpen(false)}
              />
            </>
          )}
        </>
        {recipes.length > 0 ? (
          <>
            <select
              className="select-recipes-order"
              defaultValue=""
              onChange={handleOrder}
            >
              <option disabled value="">
                Ordenar por
              </option>
              <option value="name">Nome</option>
              <option value="ingredients">Número de ingredientes</option>
              <option value="instructions">Tamanho das instruções</option>
            </select>
            {recipes.map((i, idx) => {
              return (
                <RecipeCard
                  recipe={i}
                  handleEdit={handleEdit}
                  handleDelete={() => handleDeleteRecipe(idx)}
                  personalView={personalView}
                />
              );
            })}
          </>
        ) : (
          <p className="no-recipe-text">Poxa nenhuma receituxa :(</p>
        )}

        <div className="end-buttons">
          <button className="change-list" onClick={handleChangeList}>
            <img src={changeIcon} alt="changeIcon" />
          </button>

          {personalView && (
            <>
              <button
                className="check-list"
                onClick={() => setShoppingListOpen(true)}
              >
                <img src={checklistIcon} alt="checklistIcon" />
              </button>

              <button className="add-recipe" onClick={handlePageView}>
                <img src={plusIcon} alt="plusIcon" />
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  const AddView = () => {
    const handleIngredientEdit = (e, idx, field) => {
      const ingredients = [...newRecipe.ingredients];
      ingredients[idx] = { ...ingredients[idx], [field]: e.target.value };
      setNewRecipe({ ...newRecipe, ingredients });
    };

    const handleNewIngredient = () => {
      const ingredients = [
        ...newRecipe.ingredients,
        { name: "", quantity: "" },
      ];
      setNewRecipe({ ...newRecipe, ingredients });
    };

    const handleDeleteIngredient = (idx) => {
      const ingredients = newRecipe.ingredients.filter((_, i) => i !== idx);
      setNewRecipe({ ...newRecipe, ingredients });
    };

    const saveRecipe = () => {
      if (editing && editingIndex !== null) {
        setRecipes((prev) => {
          const copy = [...prev];
          copy[editingIndex] = newRecipe;
          setStorage("my-recipes", copy);
          return copy;
        });
      } else {
        setRecipes((prev) => [...prev, newRecipe]);
        setStorage("my-recipes", [...recipes, newRecipe]);
      }
      setNewRecipe({ name: "", ingredients: [], instructions: "", link: "" });
      setEditing(false);
      setEditingIndex(null);
      handlePageView();
    };

    const handleCloseWithoutSave = () => {
      setNewRecipe({ name: "", ingredients: [], instructions: "", link: "" });
      setEditing(false);
      handlePageView();
    };

    const getNextFocus = (e, className) => {
      const next = e.currentTarget
        .closest(".recipe-ingredient-item")
        ?.nextElementSibling?.querySelector(className);
      if (next) {
        next.focus();
      } else {
        setTimeout(() => {
          const items = document.querySelectorAll(
            `.recipe-ingredient-item ${className}`,
          );
          items[items.length - 1]?.focus();
        }, 0);
      }
    };

    return (
      <div className="new-recipe">
        <input
          className="recipe-name"
          placeholder="Nome da receita"
          type="text"
          value={newRecipe.name}
          onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
        />
        {newRecipe.ingredients.map((i, idx) => {
          return (
            <div className="recipe-ingredient-item">
              <input
                className="qty"
                placeholder="Qtd"
                value={i.quantity}
                onChange={(e) => handleIngredientEdit(e, idx, "quantity")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    getNextFocus(e, ".name");
                  }
                }}
              />
              <input
                className="name"
                placeholder="Ingrediente"
                value={i.name}
                onChange={(e) => handleIngredientEdit(e, idx, "name")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleNewIngredient();
                    getNextFocus(e, ".qty");
                  }
                }}
              />
              <button
                className="remove-ingredient-button small"
                onClick={() => handleDeleteIngredient(idx)}
              >
                <img src={closeIcon} alt="closeIcon" />
              </button>
            </div>
          );
        })}
        <button className="add-ingredient-button" onClick={handleNewIngredient}>
          <img src={plusIcon} alt="plusIcon" />
        </button>
        <textarea
          placeholder="Instruções"
          value={newRecipe.instructions}
          onChange={(e) =>
            setNewRecipe({ ...newRecipe, instructions: e.target.value })
          }
        />

        <input
          className="ref"
          placeholder="Link de referência"
          value={newRecipe.link}
          onChange={(e) => setNewRecipe({ ...newRecipe, link: e.target.value })}
        />
        <div className="end-buttons">
          <button onClick={handleCloseWithoutSave} className="big">
            <img src={closeIcon} alt="closeIcon" />
          </button>
          <button onClick={saveRecipe} className="big">
            <img src={saveIcon} alt="saveIcon" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="recipes">
      <h1 className="title">{personalView ? "Minhas " : ""}Receituxas</h1>
      {view === "list" ? ListView() : AddView()}
      <div
        className="gradient-test"
        style={{
          zIndex: 10,
          position: "fixed",
          top: 0,
          backgroundImage: `linear-gradient(to bottom, 
          rgb(0 0 0 / ${scrollPercent}%) 0%, 
          rgba(255, 0, 0, 0) 25%, 
          rgba(255, 0, 0, 0) 75%, 
          rgb(0 0 0 / ${100 - scrollPercent}%) 100%)`,
          height: "100vh",
          width: "100vw",
          left: 0,
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default Recipes;
