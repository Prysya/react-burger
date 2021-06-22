import React, {memo, useCallback, useRef, useState} from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";
import { scroller } from "react-scroll";

import { IngredientsContainerWithTitle, IngredientCard } from "./";
import { ScrollableContainer } from "../UI";
import { useDispatch, useSelector } from "react-redux";
import {
  handleBunSelection,
  handleItemAddition,
  handleOpenIngredientDetailsModal,
  setCurrentIngredient,
} from "../../services/reducers";

const MemoTab = memo(Tab);

const BurgerIngredients = () => {
  const [current, setCurrent] = useState("buns");

  const {
    data: { data },
    items: { selectedItemsCount, selectedBun },
  } = useSelector(({ data, items }) => ({ data, items }));

  const dispatch = useDispatch();

  const containerRef = useRef(null);
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const toppingsRef = useRef(null);

  const handleIngredientClick = useCallback((item) => {
    if (item.type === "bun") {
      dispatch(handleBunSelection(item));
    } else {
      dispatch(handleItemAddition(item));
    }

    dispatch(setCurrentIngredient(item));
    dispatch(handleOpenIngredientDetailsModal());
  }, [dispatch]);

  const handleTabClick = useCallback((current) => {
    scroller.scrollTo(current, {
      duration: 800,
      delay: 10,
      smooth: true,
      containerId: "burgerIngredientsScrollableContainer",
      offset: -20,
    });
  },[]);

  const handleScroll = useCallback(() => {
    if (
      containerRef.current &&
      bunsRef.current &&
      saucesRef.current &&
      toppingsRef.current
    ) {
      const bunDistance = Math.abs(
        containerRef.current.getBoundingClientRect().top -
          bunsRef.current.childBindings.domNode.getBoundingClientRect().top
      );
      const sauceDistance = Math.abs(
        containerRef.current.getBoundingClientRect().top -
          saucesRef.current.childBindings.domNode.getBoundingClientRect().top
      );
      const toppingsDistance = Math.abs(
        containerRef.current.getBoundingClientRect().top -
          toppingsRef.current.childBindings.domNode.getBoundingClientRect().top
      );
      const min = Math.min(bunDistance, sauceDistance, toppingsDistance);
      setCurrent(
        min === bunDistance ? "buns" : min === sauceDistance ? "sauces" : "toppings"
      );
    }
  }, []);

  return (
    <section className={`${styles.section} pt-10 pb-10`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div style={{ display: "flex" }}>
        <MemoTab
          value="buns"
          active={current === "buns"}
          onClick={handleTabClick}
        >
          Булки
        </MemoTab>
        <MemoTab
          value="sauces"
          active={current === "sauces"}
          onClick={handleTabClick}
        >
          Соусы
        </MemoTab>
        <MemoTab
          value="toppings"
          active={current === "toppings"}
          onClick={handleTabClick}
        >
          Начинки
        </MemoTab>
      </div>

      <ScrollableContainer
        className="pt-10"
        id="burgerIngredientsScrollableContainer"
        containerRef={containerRef}
        onScroll={handleScroll}
      >
        <IngredientsContainerWithTitle title="Булки" name="buns" containerRef={bunsRef}>
          {Array.isArray(data) && data
            .filter((item) => item.type === "bun")
            .map((item) => {
              return (
                <IngredientCard
                  handleIngredientClick={handleIngredientClick}
                  count={selectedBun._id === item._id ? 1 : 0}
                  item={item}
                  key={item._id}
                />
              );
            })}
        </IngredientsContainerWithTitle>
        <IngredientsContainerWithTitle title="Соусы" name="sauces" containerRef={saucesRef}>
          {Array.isArray(data) && data
            .filter((item) => item.type === "sauce")
            .map((item) => (
              <IngredientCard
                handleIngredientClick={handleIngredientClick}
                count={selectedItemsCount[item.name] || 0}
                item={item}
                key={item._id}
              />
            ))}
        </IngredientsContainerWithTitle>
        <IngredientsContainerWithTitle title="Начинки" name="toppings" containerRef={toppingsRef}>
          {Array.isArray(data) && data
            .filter((item) => item.type === "main")
            .map((item) => (
              <IngredientCard
                handleIngredientClick={handleIngredientClick}
                count={selectedItemsCount[item.name] || 0}
                item={item}
                key={item._id}
              />
            ))}
        </IngredientsContainerWithTitle>
      </ScrollableContainer>
    </section>
  );
};

export default BurgerIngredients;
