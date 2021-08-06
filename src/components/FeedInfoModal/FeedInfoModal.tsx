import React from "react";
import { useHistory } from "react-router-dom";

import { handleCloseFeedInfoModal } from "../../services/slices";
import { Modal } from "../Modal";
import { FeedInfo } from "../FeedInfo";
import { useAppDispatch, useAppSelector } from "../../hooks";

const FeedInfoModal = () => {
  const dispatch = useAppDispatch();

  const history = useHistory();

  const {
    orders: { selectedOrder },
    modalWindows: { isFeedInfoModalIsOpen },
  } = useAppSelector(({ orders, modalWindows }) => ({
    orders,
    modalWindows,
  }));

  if (!isFeedInfoModalIsOpen || !selectedOrder) return null;

  const handleClose = () => {
    dispatch(handleCloseFeedInfoModal());
    history.goBack();
  };

  return (
    <Modal
      onClose={handleClose}
      header={`#${selectedOrder?.orderNumber}`}
      headerSize="default"
      headerType="digits"
    >
      <FeedInfo hideOrderNumber {...selectedOrder} />
    </Modal>
  );
};

export default FeedInfoModal;
