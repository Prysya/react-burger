import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { handleCloseFeedInfoModal } from "../../services/slices";
import { Modal } from "../Modal";
import { FeedInfo } from "../FeedInfo";

const FeedInfoModal = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const {
    orders: { selectedOrder },
    modalWindows: { isFeedInfoModalIsOpen },
  } = useSelector(({ orders, modalWindows }) => ({
    orders,
    modalWindows,
  }));

  if (!isFeedInfoModalIsOpen) return null;

  const handleClose = () => {
    dispatch(handleCloseFeedInfoModal());
    history.goBack();
  };

  return (
    <Modal
      onClose={handleClose}
      header={`#${selectedOrder.orderNumber}`}
      headerSize="default"
      headerType="digits"
    >
      <FeedInfo hideOrderNumber {...selectedOrder} />
    </Modal>
  );
};

export default FeedInfoModal;
