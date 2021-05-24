import React from "react";
import PropTypes from "prop-types";

import styles from "./IngredientDetails.module.css";
import { NutrientContainer } from "./";

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
          <NutrientContainer
            unit={unit}
            name={name}
            value={value}
            key={unit + name + value}
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