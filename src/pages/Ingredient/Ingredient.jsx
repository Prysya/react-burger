import React, { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import style from "./Ingredient.module.css";

import { getDataFromApi, setCurrentIngredient } from "../../services/slices";
import { IngredientDetails, Loader } from "../../components";
import { LOAD_STATUSES, ROUTES } from "../../constants";
import { FadeAnim } from "../../uikit";

const Ingredient = () => {
  const {
    params: { ingredientId },
  } = useRouteMatch();

  const history = useHistory();

  if (!ingredientId) {
    history.replace({ pathname: ROUTES.MAIN });
  }

  const dispatch = useDispatch();

  const {
    data: { dataLoading },
    items: { currentIngredient },
  } = useSelector(({ data, items }) => ({ data, items }));

  useEffect(() => {
    dispatch(getDataFromApi())
      .then(unwrapResult)
      .then((data) => {
        if (Array.isArray(data)) {
          const selectedItem = data.find((item) => {
            return item._id === ingredientId;
          });

          if (selectedItem) {
            return dispatch(setCurrentIngredient(selectedItem));
          }

          history.replace({ pathname: ROUTES.MAIN });
        }
      })
      .catch(() => {});
    //eslint-disable-next-line
  }, []);

  if (
    dataLoading === LOAD_STATUSES.PENDING ||
    Object.keys(currentIngredient).length === 0
  ) {
    return <Loader/>;
  }

  return (
    <FadeAnim className={style.container}>
      <IngredientDetails currentIngredient={currentIngredient} />
    </FadeAnim>
  );
};

export default Ingredient;
