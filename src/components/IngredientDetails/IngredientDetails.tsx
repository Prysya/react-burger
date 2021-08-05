import React from "react";

import styles from "./IngredientDetails.module.css";
import { Nutrient } from "./";
import { Ingredient } from "../../interfaces";

interface IIngredientDetails {
  currentIngredient: Pick<
    Ingredient,
    "image_large" | "calories" | "carbohydrates" | "fat" | "proteins" | "name"
  >;
}

const IngredientDetails: React.FC<IIngredientDetails> = ({
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
    { value: calories || 0, name: "Калории", unit: "ккал" },
    { value: proteins || 0, name: "Белки", unit: "г" },
    { value: fat || 0, name: "Жиры", unit: "г" },
    { value: carbohydrates || 0, name: "Углеводы", unit: "г" },
  ];

  return (
    <>
      <img className="mb-4" src={image_large} alt={name} />
      <h3 className={`${styles.name} text text_type_main-medium mb-8`}>
        {name}
      </h3>
      <ul className={styles.nutrientsContainer}>
        {nutrients.map(({ value, name, unit }) => (
          <Nutrient unit={unit} name={name} value={value} key={name} />
        ))}
      </ul>
    </>
  );
};

export default IngredientDetails;
