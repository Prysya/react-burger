import React, { useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";

import style from "./Ingredient.module.css";

import { getDataFromApi, setCurrentIngredient } from "../../services/slices";
import { IngredientDetails, Loader } from "../../components";
import { LoadStatuses, Routes } from "../../enums";
import { FadeAnim } from "../../uikit";
import { useAppDispatch, useAppSelector } from "../../hooks";

const Ingredient = () => {
  const {
    params: { ingredientId },
  } = useRouteMatch<{ ingredientId: string }>();

  const history = useHistory();

  if (!ingredientId) {
    history.replace({ pathname: Routes.Main });
  }

  const dispatch = useAppDispatch();

  const {
    data: { dataLoading },
    items: { currentIngredient },
  } = useAppSelector(({ data, items }) => ({ data, items }));

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

          history.replace({ pathname: Routes.Main });
        }
      })
      .catch(() => {});
    //eslint-disable-next-line
  }, []);

  if (
    dataLoading === LoadStatuses.Pending ||
    !currentIngredient
  ) {
    return <Loader />;
  }

  return (
    <FadeAnim className={style.container}>
      <IngredientDetails currentIngredient={currentIngredient} />
    </FadeAnim>
  );
};

export default Ingredient;
