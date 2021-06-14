import React, { useEffect } from "react";
import styles from "./App.module.css";
import { AppHeader } from "../AppHeader";
import { BurgerConstructor } from "../BurgerConstructor";
import { BurgerIngredients } from "../BurgerIngredients";
import { Modal } from "../Modal";
import { OrderDetails } from "../OrderDetails";
import { IngredientDetails } from "../IngredientDetails";
import { Loader } from "../Loader";
import { LOAD_STATUSES } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateFullPrice,
  getDataFromApi,
  handleCloseIngredientDetailsModal,
  handleCloseOrderDetailsModal,
} from "../../services/reducers";

const App = () => {
  const {
    data: { dataLoading },
    items: { selectedBun, selectedItems, currentIngredient },
    modalWindows: {
      isIngredientDetailsModalIsOpen,
      isOrderDetailsModalIsOpen,
      orderNumber,
    },
  } = useSelector(({ data, items, modalWindows }) => ({
    data,
    items,
    modalWindows,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataFromApi());
  }, [dispatch]);

  useEffect(() => {
    dispatch(calculateFullPrice());
  }, [dispatch, selectedBun, selectedItems]);

  return (
    <div className={styles.app}>
      <AppHeader />

      <main className={styles.main}>
        {dataLoading === LOAD_STATUSES.pending ? (
          <Loader />
        ) : (
          <BurgerIngredients />
        )}
        {Object.keys(selectedBun).length !== 0 && <BurgerConstructor />}

        {isOrderDetailsModalIsOpen && (
          <Modal onClose={() => dispatch(handleCloseOrderDetailsModal())}>
            <OrderDetails orderNumber={orderNumber} />
          </Modal>
        )}

        {isIngredientDetailsModalIsOpen && (
          <Modal
            onClose={() => dispatch(handleCloseIngredientDetailsModal())}
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
