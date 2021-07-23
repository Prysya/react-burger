import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Modal } from "../Modal";
import { handleCloseIngredientDetailsModal } from "../../services/slices";
import { IngredientDetails } from "../IngredientDetails";

const IngredientDetailsModal = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const {
    items: { currentIngredient },
    modalWindows: { isIngredientDetailsModalIsOpen },
  } = useSelector(({ items, modalWindows }) => ({
    items,
    modalWindows,
  }));

  if (!isIngredientDetailsModalIsOpen) return null;

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
