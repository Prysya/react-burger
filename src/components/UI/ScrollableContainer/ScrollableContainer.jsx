import React from "react";
import styles from "./ScrollableContainer.module.css";
import PropTypes from "prop-types";

const ScrollableContainer = ({ children, className, containerRef, ...props }) => {
  return <div className={`${styles.container} ${className}`} ref={containerRef} {...props}>{children}</div>;
};

ScrollableContainer.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  containerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};

export default ScrollableContainer;
