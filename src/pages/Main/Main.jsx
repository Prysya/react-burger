import React from "react";
import { useSelector } from "react-redux";

import { BurgerIngredients, BurgerConstructor } from "../../components/";

const Main = () => {
  const { selectedBun } = useSelector((state) => state.items);

  return (
    <>
      <BurgerIngredients />
      {Object.keys(selectedBun).length !== 0 && <BurgerConstructor />}
    </>
  );
};

export default Main;
