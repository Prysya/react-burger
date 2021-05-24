import React from "react";
import styles from "./ModalOverlay.module.css";

const ModalOverlay = ({className, ...props}) => <div className={styles.backdrop} {...props} />;

export default ModalOverlay;
