import React, { useCallback, useEffect, useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import styles from "./App.module.css";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { BrowserRouter } from "react-router-dom";
import { API_URL } from "../../constants";
import { Modal } from "../Modal";
import { OrderDetails } from "../OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { Loader } from "../Loader";

const App = () => {
  const [fullPrice, setFullPrice] = useState(0);
  const [selectedBun, setSelectedBun] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemsCount, setSelectedItemsCount] = useState({});
  const [queryCount, setQueryCount] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState({});
  const [orderNumber, setOrderNumber] = useState(1);
  const [
    ingredientDetailsModalIsOpen,
    setIngredientDetailsModalIsOpen,
  ] = useState(false);
  const [orderDetailsModalIsOpen, setOrderDetailsModalIsOpen] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (res.ok) {
          return data.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(true);
      });
  }, []);

  useEffect(() => {
    setFullPrice(
      selectedItems.reduce((acc, item) => acc + item.price, 0) +
        selectedBun.price * 2
    );
  }, [selectedBun, selectedItems]);

  const selectBun = useCallback((obj) => {
    setSelectedBun(obj);
  }, []);

  const addItem = useCallback(
    (item) => {
      setSelectedItemsCount((prev) => ({
        ...prev,
        [item.name]: (prev[item.name] || 0) + 1,
      }));
      setSelectedItems((prev) => [...prev, { ...item, queryCount }]);
      setQueryCount((prev) => prev + 1);
    },
    [queryCount]
  );

  const openIngredientDetailsModal = useCallback((current) => {
    setCurrentIngredient(current);
    setIngredientDetailsModalIsOpen(true);
  }, []);

  const closeIngredientDetailsModal = useCallback(() => {
    setIngredientDetailsModalIsOpen(false);
  }, []);

  const openOrderDetailsModal = useCallback(() => {
    setOrderNumber((prev) => prev + 1);
    setOrderDetailsModalIsOpen(true);
    setSelectedBun({});
    setSelectedItems([]);
    setSelectedItemsCount({});
    setQueryCount(0);
  }, []);

  const closeOrderDetailsModal = useCallback(() => {
    setOrderDetailsModalIsOpen(false);
  }, []);

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <AppHeader />

        <main className={styles.main}>
          {isLoading ? (
            <BurgerIngredients
              addItem={addItem}
              openIngredientDetailsModal={openIngredientDetailsModal}
              selectedBun={selectedBun}
              selectBun={selectBun}
              selectedItemsCount={selectedItemsCount}
              data={data}
            />
          ) : (
            <Loader />
          )}
          {Object.keys(selectedBun).length !== 0 && (
            <BurgerConstructor
              selectedItems={selectedItems}
              selectedBun={selectedBun}
              fullPrice={fullPrice}
              openOrderDetailsModal={openOrderDetailsModal}
            />
          )}

          {orderDetailsModalIsOpen && (
            <Modal onClose={closeOrderDetailsModal}>
              <OrderDetails orderNumber={orderNumber} />
            </Modal>
          )}

          {ingredientDetailsModalIsOpen && (
            <Modal
              onClose={closeIngredientDetailsModal}
              header="Детали ингридиента"
            >
              <IngredientDetails currentIngredient={currentIngredient} />
            </Modal>
          )}
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
