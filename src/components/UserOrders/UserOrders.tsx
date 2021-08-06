import React, { useEffect } from "react";
import { ScrollableContainer } from "../../uikit";

import styles from "./UserOrders.module.css";

import { getDataFromApi, wsAuthConnectionStart } from "../../services/slices";
import { parseDate, parseFullPrice, parseIngredients } from "../../utils";
import { CardOrder } from "../CardOrder";
import { LoadStatuses } from "../../enums";
import { Loader } from "../Loader";
import {useAppDispatch, useAppSelector} from "../../hooks";

const UserOrders = () => {
  const dispatch = useAppDispatch();

  const { currentUserOrders } = useAppSelector((state) => state.orders);
  const { data, dataObjectVariant, dataLoading } = useAppSelector(
    (state) => state.data
  );

  useEffect(() => {
    if (data.length === 0) {
      dispatch(getDataFromApi());
    }

    dispatch(wsAuthConnectionStart());
    //eslint-disable-next-line
  }, []);

  if (dataLoading === LoadStatuses.Pending) return <Loader />;

  return (
    <ScrollableContainer className={styles.container}>
      {currentUserOrders.length > 0 ? (
        currentUserOrders.map(
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
                fromProfile
              />
            );
          }
        )
      ) : (
        <p className="text text_type_main-medium">
          У вас еще нет ни одного заказа
        </p>
      )}
    </ScrollableContainer>
  );
};

export default UserOrders;
