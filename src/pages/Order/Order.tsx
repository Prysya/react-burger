import React, { useEffect } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";

import style from "./Order.module.css";

import {
  getDataFromApi,
  handleOrderSelection,
  wsAuthConnectionStart,
  wsConnectionStart,
} from "../../services/slices";
import { FeedInfo, Loader } from "../../components";
import { LoadStatuses, Routes } from "../../enums";
import { FadeAnim } from "../../uikit";
import { parseDate, parseFullPrice, parseIngredients } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../hooks";

const Order: React.FC = () => {
  const {
    params: { feedId },
  } = useRouteMatch<{ feedId: string }>();

  const location = useLocation();

  const history = useHistory();

  const checkPathnameAndRedirect = () => {
    history.replace({
      pathname: location.pathname.includes("orders")
        ? Routes.Orders
        : Routes.Feed,
    });
  };

  if (!feedId) {
    checkPathnameAndRedirect();
  }

  const dispatch = useAppDispatch();

  const {
    data: { dataLoading, dataObjectVariant, data },
    orders: { selectedOrder, orders, currentUserOrders, wsError, wsClose },
  } = useAppSelector(({ data, orders }) => ({ data, orders }));

  useEffect(() => {
    if (data.length === 0) {
      dispatch(getDataFromApi());
    }

    if (location.pathname.includes("orders")) {
      dispatch(wsAuthConnectionStart());
    } else {
      dispatch(wsConnectionStart());
    }
    //eslint-disable-next-line
  }, []);

  useEffect((): void => {
    const currentOrders = location.pathname.includes("orders")
      ? currentUserOrders
      : orders;

    if (currentOrders.length > 0) {
      if (Array.isArray(currentOrders)) {
        const selectedItem = currentOrders.find((item) => {
          return item._id === feedId;
        });

        if (selectedItem && dataObjectVariant) {
          const { ingredients, updatedAt, _id, status, name, number } =
            selectedItem;

          const ingredientsParsed = parseIngredients(
            ingredients,
            dataObjectVariant
          );
          const price = parseFullPrice(ingredients, dataObjectVariant);
          const date = parseDate(updatedAt);

          const order = {
            _id,
            ingredients: ingredientsParsed,
            orderStatus: status,
            burgerName: name,
            fullPrice: price,
            date,
            orderNumber: number,
          };

          dispatch(handleOrderSelection(order));
          return;
        }

        checkPathnameAndRedirect();
      }
    }
    //eslint-disable-next-line
  }, [orders, currentUserOrders]);

  useEffect(() => {
    if (wsError || wsClose) {
      checkPathnameAndRedirect();
    }
    //eslint-disable-next-line
  }, [wsError, wsClose]);

  if (dataLoading === LoadStatuses.Pending || !selectedOrder) {
    return <Loader />;
  }

  return (
    <FadeAnim className={style.container}>
      <FeedInfo {...selectedOrder} />
    </FadeAnim>
  );
};

export default Order;
