import React from 'react';
import styles from "./Nutrient.module.css";

interface INutrient {
  name: string;
  unit: string;
  value: number;
}

const Nutrient = ({name, unit, value}:INutrient) => {
    return (
      <li className={styles.nutrient}>
          <p className="text text_type_main-default text_color_inactive mb-3">{`${name}, ${unit}`}</p>
          <p className="text text_type_digits-default text_color_inactive">{value}</p>
      </li>
    );
}

export default Nutrient;
