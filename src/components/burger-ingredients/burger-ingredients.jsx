import React from "react";
import {
  Counter,
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import data from "../../utils/data";
import styles from "./burger-ingredients.module.css"

const IngredientCard = ({ price, name, image, count }) => {
  return (
    <div className={styles.card}>
      {count > 0 && <Counter count={count} size="default"/>}
      <img className={styles.image} src={image} alt={name} />
      <span className={styles.price}>{price}<CurrencyIcon type='primary'/></span>
      <p>{name}</p>
    </div>
  );
};

IngredientCard.propTypes = {
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  count: PropTypes.number,
}

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState("one");

  return (
    <section className="pt-10">
      <h1 className="text text_type_main-large mb-5">Соберите бургер</h1>
      <div style={{ display: "flex" }} className="mb-10">
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <div>
        {data.map(item => (
          <IngredientCard price={item.price} image={item.image} name={item.name} key={item._id}/>
        ))}
      </div>
    </section>
  );
};

export default BurgerIngredients;
