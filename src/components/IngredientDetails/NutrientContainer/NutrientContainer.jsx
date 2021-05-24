import React from 'react';
import PropTypes from "prop-types";
import style from './NutrientContainer.module.css';

const NutrientContainer = ({name, unit, value}) => {
  return (
    <li className={style.nutrientContainer}>
      <p className="text text_type_main-default text_color_inactive mb-3">{`${name}, ${unit}`}</p>
      <p className="text text_type_digits-default text_color_inactive">{value}</p>
    </li>
  );
}

NutrientContainer.propTypes = {
  name: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
}

export default NutrientContainer;
