import React, { useEffect, useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import styles from "./App.module.css";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
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
    isIngredientDetailsModalIsOpen,
    setIsIngredientDetailsModalIsOpen,
  ] = useState(false);
  const [isOrderDetailsModalIsOpen, setIsOrderDetailsModalIsOpen] = useState(
    false
  );

  useEffect(() => {
    setIsLoading(true);

    fetch(API_URL)
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
    setFullPrice(
      selectedItems.reduce((acc, item) => acc + item.price, 0) +
        selectedBun.price * 2
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

  const handleOpenOrderDetailsModal = () => {
    setOrderNumber((prev) => prev + 1);
    setIsOrderDetailsModalIsOpen(true);
    setSelectedBun({});
    setSelectedItems([]);
    setSelectedItemsCount({});
    setQueryCount(0);
  };

  const handleCloseOrderDetailsModal = () => {
    setIsOrderDetailsModalIsOpen(false);
  };

  return (
    <div className={styles.app}>
      <AppHeader />

      <main className={styles.main}>
        {isLoading ? (
          <Loader />
        ) : (
          <BurgerIngredients
            handleItemAddition={handleItemAddition}
            handleOpenIngredientDetailsModal={handleOpenIngredientDetailsModal}
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
    </div>
  );
};

export default App;
