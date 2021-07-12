import React, { memo, useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import styles from "./Modal.module.css";

import { ModalOverlay } from "../ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const MemoCloseIcon = memo(CloseIcon);

const modalRoot = document.getElementById("react-modals");

const Modal = ({ children, onClose, header = "", ...props }) => {
  const spacesWithHeader = "pb-15";
  const spacesWithoutHeader = "pb-30";

  const handleEscClose = (event) => event.key === "Escape" && onClose();

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose, false);
    return () => document.removeEventListener("keydown", handleEscClose, false);
    //eslint-disable-next-line
  }, []);

  return createPortal(
    <div className={styles.modal}>
      <ModalOverlay onClick={onClose} />
      <div
        className={`${styles.modalContainer} pt-15 pl-10 pr-10 ${
          header === "" ? spacesWithoutHeader : spacesWithHeader
        }`}
        {...props}
      >
        <h2 className={`${styles.header} text text_type_main-large`}>
          {header}
          <span className={styles.closeIcon}>
            <MemoCloseIcon type="primary" onClick={onClose} />
          </span>
        </h2>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
  header: PropTypes.string,
};

export default Modal;
