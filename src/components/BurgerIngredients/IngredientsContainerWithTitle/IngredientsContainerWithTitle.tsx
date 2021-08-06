import React, { memo } from "react";
import styles from "./IngredientsContainerWithTitle.module.css";
import { Element } from "react-scroll";

interface IIngredientsContainerWithTitle {
  title: string;
  name: string;
  containerRef: React.RefObject<any>;
  children: JSX.Element | JSX.Element[] | boolean;
}

const IngredientsContainerWithTitle: React.FC<IIngredientsContainerWithTitle> =
  ({ children, title, name, containerRef }) => (
    <Element className="mb-10" name={name} ref={containerRef}>
      <p className="text text_type_main-medium mb-6">{title}</p>
      <ul className={styles.ingredientsContainer}>{children}</ul>
    </Element>
  );

export default memo(IngredientsContainerWithTitle);
