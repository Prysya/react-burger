import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { scroller } from "react-scroll";
import { useHistory, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import styles from "./BurgerIngredients.module.css";

import { IngredientCard, IngredientsContainerWithTitle } from "./";
import { ScrollableContainer } from "../../uikit";
import {
  getDataFromApi,
  handleBunSelection,
  handleItemAddition,
  handleOpenIngredientDetailsModal,
  setCurrentIngredient,
} from "../../services/slices";
import { Loader } from "../Loader";
import { LoadStatuses, Routes } from "../../enums";
import { useAppDispatch, useAppSelector } from "../../hooks";

const BurgerIngredients: React.FC = () => {
  const dispatch = useAppDispatch();

  const history = useHistory();

  const location = useLocation();

  const [current, setCurrent] = useState("buns");

  const {
    data: { data, dataLoading },
    items: { selectedItemsCount, selectedBun },
  } = useAppSelector(({ data, items }) => ({ data, items }));

  useEffect(() => {
    if (data.length === 0) {
      dispatch(getDataFromApi());
    }
    //eslint-disable-next-line
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const bunsRef = useRef<{childBindings: {domNode: HTMLDivElement}}>(null);
  const saucesRef = useRef<{childBindings: {domNode: HTMLDivElement}}>(null);
  const toppingsRef = useRef<{childBindings: {domNode: HTMLDivElement}}>(null);

  const handleIngredientClick = useCallback((item) => {
    if (item.type === "bun") {
      dispatch(handleBunSelection(item));
    } else {
      dispatch(handleItemAddition({ ...item, randomId: uuidv4() }));
    }

    dispatch(setCurrentIngredient(item));
    dispatch(handleOpenIngredientDetailsModal());

    history.push({
      pathname: `${Routes.Ingredients}/${item._id}`,
      state: {
        background: location,
      },
    });

    //eslint-disable-next-line
  }, []);

  const handleTabClick = useCallback((current) => {
    scroller.scrollTo(current, {
      duration: 800,
      delay: 10,
      smooth: true,
      containerId: "burgerIngredientsScrollableContainer",
      offset: -20,
    });
  }, []);

  const handleScroll = useCallback(() => {
    if (
      containerRef.current &&
      bunsRef.current &&
      saucesRef.current &&
      toppingsRef.current
    ) {
      const bunDistance = Math.abs(
        containerRef?.current?.getBoundingClientRect()?.top -
          bunsRef?.current?.childBindings.domNode.getBoundingClientRect()?.top
      );
      const sauceDistance = Math.abs(
        containerRef?.current?.getBoundingClientRect()?.top -
          saucesRef.current?.childBindings.domNode.getBoundingClientRect()?.top
      );
      const toppingsDistance = Math.abs(
        containerRef?.current?.getBoundingClientRect()?.top -
          toppingsRef.current?.childBindings.domNode.getBoundingClientRect()?.top
      );
      const min = Math.min(bunDistance, sauceDistance, toppingsDistance);
      setCurrent(
        min === bunDistance
          ? "buns"
          : min === sauceDistance
          ? "sauces"
          : "toppings"
      );
    }
  }, []);

  if (dataLoading === LoadStatuses.Pending) return <Loader />;

  return (
    <div className={`${styles.section} pt-10 pb-10`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div style={{ display: "flex" }}>
        <Tab value="buns" active={current === "buns"} onClick={handleTabClick}>
          Булки
        </Tab>
        <Tab
          value="sauces"
          active={current === "sauces"}
          onClick={handleTabClick}
        >
          Соусы
        </Tab>
        <Tab
          value="toppings"
          active={current === "toppings"}
          onClick={handleTabClick}
        >
          Начинки
        </Tab>
      </div>

      <ScrollableContainer
        className="pt-10"
        id="burgerIngredientsScrollableContainer"
        containerRef={containerRef}
        onScroll={handleScroll}
      >
        <IngredientsContainerWithTitle
          title="Булки"
          name="buns"
          containerRef={bunsRef}
        >
          {Array.isArray(data) &&
            data
              .filter((item) => item.type === "bun")
              .map((item) => {
                const count =
                  selectedBun && selectedBun._id === item._id ? 2 : 0;

                return (
                  <IngredientCard
                    handleIngredientClick={handleIngredientClick}
                    count={count}
                    item={item}
                    key={item._id}
                  />
                );
              })}
        </IngredientsContainerWithTitle>
        <IngredientsContainerWithTitle
          title="Соусы"
          name="sauces"
          containerRef={saucesRef}
        >
          {Array.isArray(data) &&
            data
              .filter((item) => item.type === "sauce")
              .map((item) => (
                <IngredientCard
                  handleIngredientClick={handleIngredientClick}
                  count={selectedItemsCount?.[item.name] || 0}
                  item={item}
                  key={item._id}
                />
              ))}
        </IngredientsContainerWithTitle>
        <IngredientsContainerWithTitle
          title="Начинки"
          name="toppings"
          containerRef={toppingsRef}
        >
          {Array.isArray(data) &&
            data
              .filter((item) => item.type === "main")
              .map((item) => (
                <IngredientCard
                  handleIngredientClick={handleIngredientClick}
                  count={selectedItemsCount?.[item.name] || 0}
                  item={item}
                  key={item._id}
                />
              ))}
        </IngredientsContainerWithTitle>
      </ScrollableContainer>
    </div>
  );
};

export default memo(BurgerIngredients);
