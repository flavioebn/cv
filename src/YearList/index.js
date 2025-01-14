import Modal from "../components/modal";
import plusIcon from "../assets/icons/plus.svg";
import { useEffect, useState } from "react";
import { getFromStorage, setStorage } from "../utils/utils";

const YearList = () => {
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [itemModalVisible, setItemModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newItem, setNewItem] = useState({ title: "", categoryIndex: null });
  const [items, setItems] = useState(getFromStorage("yearlist"));

  const handleCategoryModalVisible = () => {
    setCategoryModalVisible(!categoryModalVisible);
  };

  const handleItemModalVisible = (categoryIndex = null) => {
    setNewItem({ title: "", categoryIndex });
    setItemModalVisible(!itemModalVisible);
  };

  const addNewCategory = () => {
    setItems((prev) => [
      ...prev,
      {
        title: newCategory,
        data: [],
      },
    ]);
    setNewCategory("");
    handleCategoryModalVisible();
  };

  useEffect(() => {
    setStorage("yearlist", items);
  }, [items]);

  const addItem = () => {
    setItems((prev) =>
      prev.map((category, idx) =>
        idx === newItem.categoryIndex
          ? {
              ...category,
              data: [...category.data, { title: newItem.title, qty: 1 }],
            }
          : category
      )
    );
    handleItemModalVisible();
  };

  const increaseQty = (categoryIndex, itemIndex) => {
    setItems((prev) =>
      prev.map((category, idx) =>
        idx === categoryIndex
          ? {
              ...category,
              data: category.data.map((item, jdx) =>
                jdx === itemIndex ? { ...item, qty: item.qty + 1 } : item
              ),
            }
          : category
      )
    );
  };

  const decreaseQty = (categoryIndex, itemIndex) => {
    setItems((prev) =>
      prev.map((category, idx) =>
        idx === categoryIndex
          ? {
              ...category,
              data: category.data.map((item, jdx) =>
                jdx === itemIndex && item.qty > 1
                  ? { ...item, qty: item.qty - 1 }
                  : item
              ),
            }
          : category
      )
    );
  };

  const deleteItem = (categoryIndex, itemIndex) => {
    if (window.confirm("Tem certeza que deseja deletar este item?")) {
      setItems((prev) =>
        prev.map((category, idx) =>
          idx === categoryIndex
            ? {
                ...category,
                data: category.data.filter((_, jdx) => jdx !== itemIndex),
              }
            : category
        )
      );
    }
  };

  const deleteCategory = (categoryIndex) => {
    if (
      window.confirm(
        "Tem certeza que deseja deletar esta categoria e todos os seus itens?"
      )
    ) {
      setItems((prev) => prev.filter((_, idx) => idx !== categoryIndex));
    }
  };

  return (
    <div className="yearlist">
      {categoryModalVisible && (
        <Modal close={handleCategoryModalVisible}>
          <p>Nova categoria</p>
          <input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button onClick={addNewCategory}>Add</button>
        </Modal>
      )}

      {itemModalVisible && (
        <Modal close={() => handleItemModalVisible()}>
          <p>Adicionar novo item</p>
          <input
            placeholder="Nome do item"
            value={newItem.title}
            onChange={(e) =>
              setNewItem((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <button onClick={addItem}>Add</button>
        </Modal>
      )}

      {items.map((category, categoryIndex) => (
        <div key={categoryIndex}>
          <h2>
            {category.title} -
            <button onClick={() => handleItemModalVisible(categoryIndex)}>
              +
            </button>
            <button onClick={() => deleteCategory(categoryIndex)}>🗑️</button>
          </h2>
          {category.data.map((item, itemIndex) => (
            <p key={itemIndex}>
              {item.title} - {item.qty}x
              <button onClick={() => increaseQty(categoryIndex, itemIndex)}>
                +
              </button>
              <button onClick={() => decreaseQty(categoryIndex, itemIndex)}>
                -
              </button>
              <button onClick={() => deleteItem(categoryIndex, itemIndex)}>
                🗑️
              </button>
            </p>
          ))}
        </div>
      ))}

      <div className="buttons">
        <button onClick={handleCategoryModalVisible}>
          <img src={plusIcon} alt="plusIcon" />
        </button>
      </div>
    </div>
  );
};

export default YearList;
