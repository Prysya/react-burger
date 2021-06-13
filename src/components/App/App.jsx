import React, { useEffect, useReducer, useState } from "react";
import styles from "./App.module.css";
import { AppHeader } from "../AppHeader";
import { BurgerConstructor } from "../BurgerConstructor";
import { BurgerIngredients } from "../BurgerIngredients";
import { INGREDIENTS_API_URL } from "../../constants";
import { Modal } from "../Modal";
import { OrderDetails } from "../OrderDetails";
import { IngredientDetails } from "../IngredientDetails";
import { Loader } from "../Loader";
import { BurgerConstructorContext } from "../../context";
import {
  fullPriceInitialState,
  fullPriceReducer,
  setFullPrice,
} from "./fullPriceReducer";
import API_URL from "../../constants/API_URL";

const App = () => {
  const [fullPrice, fullPriceDispatcher] = useReducer(
    fullPriceReducer,
    fullPriceInitialState,
    undefined
  );
  const [selectedBun, setSelectedBun] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemsCount, setSelectedItemsCount] = useState({});
  const [queryCount, setQueryCount] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState({});
  const [orderNumber, setOrderNumber] = useState(null);
  const [
    isIngredientDetailsModalIsOpen,
    setIsIngredientDetailsModalIsOpen,
  ] = useState(false);
  const [isOrderDetailsModalIsOpen, setIsOrderDetailsModalIsOpen] = useState(
    false
  );
  const [isOrderButtonDisabled, setIsOrderButtonDisabled] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch(INGREDIENTS_API_URL.INGREDIENTS)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(({ data }) => {
        if (data && Array.isArray(data)) {
          return setData(data);
        }

        return Promise.reject(
          `Ошибка: data отстуствует или не является массивом`
        );
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fullPriceDispatcher(
      setFullPrice(
        selectedItems.reduce((acc, item) => acc + item.price, 0) +
          selectedBun.price * 2
      )
    );
  }, [selectedBun, selectedItems]);

  const handleBunSelection = (obj) => {
    setSelectedBun(obj);
  };

  const handleItemAddition = (item) => {
    setSelectedItemsCount((prev) => ({
      ...prev,
      [item.name]: (prev[item.name] || 0) + 1,
    }));
    setSelectedItems((prev) => [...prev, { ...item, queryCount }]);
    setQueryCount((prev) => prev + 1);
  };

  const handleOpenIngredientDetailsModal = (current) => {
    setCurrentIngredient(current);
    setIsIngredientDetailsModalIsOpen(true);
  };

  const handleCloseIngredientDetailsModal = () => {
    setIsIngredientDetailsModalIsOpen(false);
  };

  const handleOpenOrderDetailsModal = async () => {
    try {
      setIsOrderButtonDisabled(true);
      const selectedIngredientsId = selectedItems.map(({ _id }) => _id);
      const body = {
        ingredients: [selectedBun._id, ...selectedIngredientsId],
      };

      const res = await fetch(API_URL.CREATE_ORDER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(`Ошибка: ${res.status}`);

      const json = await res.json();

      const orderNumberFromServer = json.order.number;

      if (orderNumberFromServer && typeof orderNumberFromServer === "number") {
        setOrderNumber(orderNumberFromServer);
        setIsOrderDetailsModalIsOpen(true);
        setSelectedBun({});
        setSelectedItems([]);
        setSelectedItemsCount({});
        setQueryCount(0);
      } else {
        throw new Error("Ошибка: В ответе от сервера отсутствует номер заказа");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsOrderButtonDisabled(false);
    }
  };

  const handleCloseOrderDetailsModal = () => {
    setIsOrderDetailsModalIsOpen(false);
  };

  return (
    <div className={styles.app}>
      <BurgerConstructorContext.Provider
        value={{
          selectedBun,
          handleBunSelection,
          selectedItems,
          handleItemAddition,
        }}
      >
        <AppHeader />

        <main className={styles.main}>
          {isLoading ? (
            <Loader />
          ) : (
            <BurgerIngredients
              handleItemAddition={handleItemAddition}
              handleOpenIngredientDetailsModal={
                handleOpenIngredientDetailsModal
              }
              selectedBun={selectedBun}
              handleBunSelection={handleBunSelection}
              selectedItemsCount={selectedItemsCount}
              data={data}
            />
          )}
          {Object.keys(selectedBun).length !== 0 && (
            <BurgerConstructor
              selectedItems={selectedItems}
              selectedBun={selectedBun}
              fullPrice={fullPrice}
              handleOpenOrderDetailsModal={handleOpenOrderDetailsModal}
              isOrderButtonDisabled={isOrderButtonDisabled}
            />
          )}

          {isOrderDetailsModalIsOpen && (
            <Modal onClose={handleCloseOrderDetailsModal}>
              <OrderDetails orderNumber={orderNumber} />
            </Modal>
          )}

          {isIngredientDetailsModalIsOpen && (
            <Modal
              onClose={handleCloseIngredientDetailsModal}
              header="Детали ингридиента"
            >
              <IngredientDetails currentIngredient={currentIngredient} />
            </Modal>
          )}
        </main>
      </BurgerConstructorContext.Provider>
    </div>
  );
};

export default App;
