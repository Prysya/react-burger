import React, {memo} from 'react';
import styles from "./ingredients-container-with-title.module.css";
import PropTypes from "prop-types";

const IngredientsContainerWithTitle = ({ children, title }) => (
  <>
    <p className="text text_type_main-medium mb-6">{title}</p>
    <div className={`${styles.ingredientsContainer} mb-10`}>{children}</div>
  </>
);

IngredientsContainerWithTitle.propTypes = {
  children: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default memo(IngredientsContainerWithTitle);
