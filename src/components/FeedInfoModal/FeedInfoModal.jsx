import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {useHistory, useLocation} from "react-router-dom";
import { handleCloseFeedInfoModal } from "../../services/slices";
import { ROUTES } from "../../constants";
import { Modal } from "../Modal";
import { FeedInfo } from "../FeedInfo";

const FeedInfoModal = () => {
  const dispatch = useDispatch();

  const history = useHistory();
  
  const location = useLocation();

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
    history.replace({ pathname: location.state?.from || ROUTES.FEED });
    delete location.state.from
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
