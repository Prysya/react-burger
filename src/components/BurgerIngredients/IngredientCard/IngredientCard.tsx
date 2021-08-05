import React, { memo } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./IngredientCard.module.css";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../../enums";
import {Ingredient} from "../../../interfaces";

const MemoCurrencyIcon = memo(CurrencyIcon);
const MemoCounter = memo(Counter);

interface IIngredientCard {
  count: number;
  handleIngredientClick: <T>(arg: T) => void;
  item: Pick<Ingredient, 'name' | 'image' | 'price'>
}

const IngredientCard:React.FC<IIngredientCard> = ({ count, handleIngredientClick, item }) => {
  const { name, image, price } = item;
  const [{ opacity }, drag, dragPreview] = useDrag({
    item,
    type: ItemTypes.Ingredient,
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



export default memo(IngredientCard);
