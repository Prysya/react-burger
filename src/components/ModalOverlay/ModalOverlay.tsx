import React from "react";
import styles from "./ModalOverlay.module.css";

interface IModalOverlay {
  className?: string;
  onClick: () => void;
}

const ModalOverlay: React.FC<IModalOverlay> = ({
  className,
  onClick,
  ...props
}) => <div className={styles.backdrop} onClick={onClick} {...props} />;

export default ModalOverlay;
