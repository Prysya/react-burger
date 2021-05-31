import React, { memo } from "react";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";
import { NavItem } from "./";

const AppHeader = () => {
  return (
    <header className={`${styles.header} p-4`}>
      <nav className={styles.nav}>
        <div className={styles.leftTabsContainer}>
          <NavItem
            IconComponent={BurgerIcon}
            text="Конструктор"
            isActive
          />
          <NavItem IconComponent={ListIcon} text="Лента заказов" />
        </div>
        <Logo />
        <NavItem IconComponent={ProfileIcon} text="Личный кабинет" />
      </nav>
    </header>
  );
};

export default memo(AppHeader);
