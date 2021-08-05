import React from "react";
import { useHistory } from "react-router-dom";

import { Modal } from "../Modal";
import { handleCloseIngredientDetailsModal } from "../../services/slices";
import { IngredientDetails } from "../IngredientDetails";
import { useAppDispatch, useAppSelector } from "../../hooks";

const IngredientDetailsModal = () => {
  const dispatch = useAppDispatch();

  const history = useHistory();

  const {
    items: { currentIngredient },
    modalWindows: { isIngredientDetailsModalIsOpen },
  } = useAppSelector(({ items, modalWindows }) => ({
    items,
    modalWindows,
  }));

  if (!isIngredientDetailsModalIsOpen || !currentIngredient) return null;

  const handleClose = () => {
    dispatch(handleCloseIngredientDetailsModal());
    history.goBack();
  };

  return (
    <Modal onClose={handleClose} header="Детали ингридиента">
      <IngredientDetails currentIngredient={currentIngredient} />
    </Modal>
  );
};

export default IngredientDetailsModal;
