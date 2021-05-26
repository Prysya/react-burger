import React from "react";
import styles from "./ScrollableContainer.module.css";
import PropTypes from "prop-types";

const ScrollableContainer = ({ children, className, ...props }) => {
  return <div className={`${styles.container} ${className}`} {...props}>{children}</div>;
};

ScrollableContainer.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
};

export default ScrollableContainer;
