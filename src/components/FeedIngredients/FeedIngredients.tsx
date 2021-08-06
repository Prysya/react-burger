import React from "react";
import styles from "./FeedIngredients.module.css";
import { ScrollableContainer } from "../../uikit";
import { CardOrder } from "../CardOrder";
import { parseFullPrice, parseDate, parseIngredients } from "../../utils";
import {useAppSelector} from "../../hooks";

const FeedIngredients:React.FC = () => {
  const { orders } = useAppSelector((state) => state.orders);
  const { dataObjectVariant } = useAppSelector((state) => state.data);

  return (
    <div className={`${styles.section} pt-10 pb-10`}>
      <h1 className="text text_type_main-large mb-5">Лента Заказов</h1>
      <ScrollableContainer
        className="pt-10"
        id="burgerIngredientsScrollableContainer"
      >
        <div className={styles.orders}>
          {orders.map(
            ({ _id, ingredients, status, name, updatedAt, number }) => {
              if (!dataObjectVariant) return null;

              const ingredientsParsed = parseIngredients(
                ingredients,
                dataObjectVariant
              );
              const price = parseFullPrice(ingredients, dataObjectVariant);
              const date = parseDate(updatedAt);

              return (
                <CardOrder
                  key={_id}
                  _id={_id}
                  ingredients={ingredientsParsed}
                  orderStatus={status}
                  burgerName={name}
                  price={price}
                  date={date}
                  orderNumber={number}
                />
              );
            }
          )}
        </div>
      </ScrollableContainer>
    </div>
  );
};

export default FeedIngredients;
