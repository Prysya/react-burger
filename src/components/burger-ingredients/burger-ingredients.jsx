import React, {memo, useMemo, useState} from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data";
import styles from "./burger-ingredients.module.css";

import { IngredientsContainerWithTitle, IngredientCard } from "./";
import { ScrollableContainer } from "../UI";
import PropTypes from "prop-types";

const MemoTab = memo(Tab);

const BurgerIngredients = ({
  selectBun,
  selectedBun,
  selectedItemsCount,
  addItem,
}) => {
  const [current, setCurrent] = useState("one");

  const buns = useMemo(() => data.filter((item) => item.type === "bun"), []);
  const sauces = useMemo(
    () => data.filter((item) => item.type === "sauce"),
    []
  );
  const main = useMemo(() => data.filter((item) => item.type === "main"), []);

  return (
    <section className={`${styles.section} pt-10 pb-10`}>
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div style={{ display: "flex" }} className="mb-10">
        <MemoTab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </MemoTab>
        <MemoTab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </MemoTab>
        <MemoTab
          value="three"
          active={current === "three"}
          onClick={setCurrent}
        >
          Начинки
        </MemoTab>
      </div>

      <ScrollableContainer>
        <IngredientsContainerWithTitle title="Булки">
          {buns.map((item) => {
            return(
            <IngredientCard
              addItem={selectBun}
              count={selectedBun.name === item.name ? 1 : 0}
              item={item}
              key={item._id}
            />
          )})}
        </IngredientsContainerWithTitle>
        <IngredientsContainerWithTitle title="Соусы">
          {sauces.map((item) => (
            <IngredientCard
              addItem={addItem}
              count={selectedItemsCount[item.name] || 0}
              item={item}
              key={item._id}
            />
          ))}
        </IngredientsContainerWithTitle>
        <IngredientsContainerWithTitle title="Начинки">
          {main.map((item) => (
            <IngredientCard
              addItem={addItem}
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

BurgerIngredients.propTypes = {
  selectBun: PropTypes.func.isRequired,
  selectedBun: PropTypes.object.isRequired,
  selectedItemsCount: PropTypes.object.isRequired,
  addItem: PropTypes.func.isRequired,
};

export default BurgerIngredients;
