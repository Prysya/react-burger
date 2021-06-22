import React, { memo } from "react";
import styles from "./IngredientsContainerWithTitle.module.css";
import PropTypes from "prop-types";
import { Element } from "react-scroll";

const IngredientsContainerWithTitle = ({
  children,
  title,
  name,
  containerRef,
}) => (
  <Element className="mb-10" name={name} ref={containerRef}>
    <p className="text text_type_main-medium mb-6">{title}</p>
    <ul className={styles.ingredientsContainer}>{children}</ul>
  </Element>
);

IngredientsContainerWithTitle.propTypes = {
  children: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  containerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]).isRequired,
};

export default memo(IngredientsContainerWithTitle);
