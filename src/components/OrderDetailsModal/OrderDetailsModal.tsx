import React from "react";
import { Modal } from "../Modal";
import { handleCloseOrderDetailsModal } from "../../services/slices";
import { OrderDetails } from "../OrderDetails";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";

const OrderDetailsModal = () => {
  const dispatch = useDispatch();

  const { isOrderDetailsModalIsOpen, orderNumber } = useAppSelector(
    (state) => state.modalWindows
  );

  if (!isOrderDetailsModalIsOpen || !orderNumber) return null;

  return (
    <Modal onClose={() => dispatch(handleCloseOrderDetailsModal())}>
      <OrderDetails orderNumber={orderNumber} />
    </Modal>
  );
};

export default OrderDetailsModal;
