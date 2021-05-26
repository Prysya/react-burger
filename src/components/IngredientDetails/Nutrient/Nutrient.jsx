import React from 'react';
import styles from "./Nutrient.module.css";
import PropTypes from "prop-types";

const Nutrient = ({name, unit, value}) => {
    return (
      <li className={styles.nutrient}>
          <p className="text text_type_main-default text_color_inactive mb-3">{`${name}, ${unit}`}</p>
          <p className="text text_type_digits-default text_color_inactive">{value}</p>
      </li>
    );
}

Nutrient.propTypes = {
    name: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
}

export default Nutrient;
