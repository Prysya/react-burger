import React, { memo } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-card.module.css";
import PropTypes from "prop-types";

const MemoCurrencyIcon = memo(CurrencyIcon);
const MemoCounter = memo(Counter);

const IngredientCard = ({ count, addItem, item }) => {
  const { name, image, price } = item;

  const handleOnClick = () => {
    addItem(item);
  };

  return (
    <div className={styles.card} onClick={handleOnClick}>
      {count > 0 && <MemoCounter count={count} size="default" />}
      <img className={`${styles.image} mb-1`} src={image} alt={name} />
      <div className={`${styles.price} mb-1`}>
        <span className={`text text_type_digits-default mr-1`}>{price}</span>
        <MemoCurrencyIcon type="primary" />
      </div>

      <p className={`${styles.name} text text_type_main-default`}>{name}</p>
    </div>
  );
};

IngredientCard.propTypes = {
  count: PropTypes.number.isRequired,
  addItem: PropTypes.func.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};

export default memo(IngredientCard);
