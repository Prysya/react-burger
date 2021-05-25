import React from "react";
import PropTypes from "prop-types";

import styles from "./IngredientDetails.module.css";

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

const IngredientDetails = ({
  currentIngredient: {
    image_large,
    calories,
    carbohydrates,
    fat,
    proteins,
    name,
  },
}) => {
  const nutrients = [
    { value: calories, name: "Калории", unit: "ккал" },
    { value: proteins, name: "Белки", unit: "г" },
    { value: fat, name: "Жиры", unit: "г" },
    { value: carbohydrates, name: "Углеводы", unit: "г" },
  ];

  return (
    <>
      <img className="mb-4" src={image_large} alt={name} />
      <h3 className={`${styles.name} text text_type_main-medium mb-8`}>{name}</h3>
      <ul className={styles.nutrientsContainer}>
        {nutrients.map(({ value, name, unit }) => (
          <Nutrient
            unit={unit}
            name={name}
            value={value}
            key={name}
          />
        ))}
      </ul>
    </>
  );
};

IngredientDetails.propTypes = {
  currentIngredient: PropTypes.shape({
    image_large: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default IngredientDetails;
