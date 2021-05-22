import React, { useCallback, useEffect, useState } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from "./App.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  const [fullPrice, setFullPrice] = useState(0);
  const [selectedBun, setSelectedBun] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemsCount, setSelectedItemsCount] = useState({});
  const [queryCount, setQueryCount] = useState(0);

  useEffect(() => {
    const { price } = selectedBun;

    setFullPrice(
      selectedItems.reduce((acc, { price }) => acc + price, 0) + price
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

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <AppHeader />

        <main className={styles.main}>
          <BurgerIngredients
            addItem={addItem}
            selectedBun={selectedBun}
            selectBun={selectBun}
            selectedItemsCount={selectedItemsCount}
          />
          {Object.keys(selectedBun).length !== 0 && (
            <BurgerConstructor
              selectedItems={selectedItems}
              selectedBun={selectedBun}
              fullPrice={fullPrice}
            />
          )}
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
