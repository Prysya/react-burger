import React, { memo, useContext, useMemo, useState } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./BurgerIngredients.module.css";

import { IngredientsContainerWithTitle, IngredientCard } from "./";
import { ScrollableContainer } from "../UI";
import PropTypes from "prop-types";
import { BurgerConstructorContext } from "../../context";

const MemoTab = memo(Tab);

const BurgerIngredients = ({
  selectedItemsCount,
  data,
  handleOpenIngredientDetailsModal,
}) => {
  const [current, setCurrent] = useState("buns");
  const { handleItemAddition, selectedBun, handleBunSelection } = useContext(
    BurgerConstructorContext
  );

  const buns = useMemo(() => data.filter((item) => item.type === "bun"), [
    data,
  ]);
  const sauces = useMemo(() => data.filter((item) => item.type === "sauce"), [
    data,
  ]);
  const main = useMemo(() => data.filter((item) => item.type === "main"), [
    data,
  ]);

  return (
    <section className={`${styles.section} pt-10 pb-10`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div style={{ display: "flex" }}>
        <MemoTab value="buns" active={current === "buns"} onClick={setCurrent}>
          Булки
        </MemoTab>
        <MemoTab
          value="sauces"
          active={current === "sauces"}
          onClick={setCurrent}
        >
          Соусы
        </MemoTab>
        <MemoTab
          value="toppings"
          active={current === "toppings"}
          onClick={setCurrent}
        >
          Начинки
        </MemoTab>
      </div>

      <ScrollableContainer className="pt-10">
        <IngredientsContainerWithTitle title="Булки">
          {buns.map((item) => {
            return (
              <IngredientCard
                handleItemAddition={handleBunSelection}
                count={selectedBun._id === item._id ? 1 : 0}
                item={item}
                key={item._id}
                handleOpenIngredientDetailsModal={
                  handleOpenIngredientDetailsModal
                }
              />
            );
          })}
        </IngredientsContainerWithTitle>
        <IngredientsContainerWithTitle title="Соусы">
          {sauces.map((item) => (
            <IngredientCard
              handleItemAddition={handleItemAddition}
              count={selectedItemsCount[item.name] || 0}
              item={item}
              key={item._id}
              handleOpenIngredientDetailsModal={
                handleOpenIngredientDetailsModal
              }
            />
          ))}
        </IngredientsContainerWithTitle>
        <IngredientsContainerWithTitle title="Начинки">
          {main.map((item) => (
            <IngredientCard
              handleItemAddition={handleItemAddition}
              count={selectedItemsCount[item.name] || 0}
              item={item}
              key={item._id}
              handleOpenIngredientDetailsModal={
                handleOpenIngredientDetailsModal
              }
            />
          ))}
        </IngredientsContainerWithTitle>
      </ScrollableContainer>
    </section>
  );
};

BurgerIngredients.propTypes = {
  selectedBun: PropTypes.object.isRequired,
  selectedItemsCount: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired,
  handleOpenIngredientDetailsModal: PropTypes.func.isRequired,
};

export default BurgerIngredients;
