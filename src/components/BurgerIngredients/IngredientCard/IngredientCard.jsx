import React, { memo } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./IngredientCard.module.css";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd";
import { ITEM_TYPES } from "../../../constants";

const MemoCurrencyIcon = memo(CurrencyIcon);
const MemoCounter = memo(Counter);

const IngredientCard = ({ count, handleIngredientClick, item }) => {
  const { name, image, price } = item;
  const [{ opacity }, drag, dragPreview] = useDrag({
    item,
    type: ITEM_TYPES.INGREDIENT,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  return (
    <li
      className={styles.card}
      onClick={() => handleIngredientClick(item)}
      ref={drag}
      style={{ opacity }}
    >
      {count > 0 && <MemoCounter count={count} size="default" />}
      <img
        className={`${styles.image} mb-1`}
        src={image}
        alt={name}
        ref={dragPreview}
      />
      <div className={`${styles.price} mb-1`}>
        <span className={`text text_type_digits-default mr-1`}>{price}</span>
        <MemoCurrencyIcon type="primary" />
      </div>

      <p className={`${styles.name} text text_type_main-default`}>{name}</p>
    </li>
  );
};

IngredientCard.propTypes = {
  count: PropTypes.number.isRequired,
  handleIngredientClick: PropTypes.func.isRequired,
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};

export default memo(IngredientCard);
