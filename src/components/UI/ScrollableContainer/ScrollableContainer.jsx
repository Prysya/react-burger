import React from 'react';
import styles from "./ScrollableContainer.module.css"
import PropTypes from "prop-types";

const ScrollableContainer = ({children}) => {
  return (
    <div className={styles.container}>
        {children}
    </div>
  );
}

ScrollableContainer.propTypes = {
    children: PropTypes.any.isRequired
}

export default ScrollableContainer;
