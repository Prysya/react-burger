import React from "react";
import { Modal } from "../Modal";
import { handleCloseOrderDetailsModal } from "../../services/slices";
import { OrderDetails } from "../OrderDetails";
import { useDispatch, useSelector } from "react-redux";

const OrderDetailsModal = () => {
  const dispatch = useDispatch();

  const { isOrderDetailsModalIsOpen, orderNumber } = useSelector(
    (state) => state.modalWindows
  );

  if (!isOrderDetailsModalIsOpen) return null;

  return (
    <Modal onClose={() => dispatch(handleCloseOrderDetailsModal())}>
      <OrderDetails orderNumber={orderNumber} />
    </Modal>
  );
};

export default OrderDetailsModal;
