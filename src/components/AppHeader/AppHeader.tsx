import React, { memo } from "react";
import { Link } from "react-router-dom";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./AppHeader.module.css";

import { NavButton } from "../";
import { Routes } from "../../enums";
import { useAppSelector } from "../../hooks";

const AppHeader: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <header className={`${styles.header} p-4`}>
      <nav className={styles.nav}>
        <div className={styles.leftTabsContainer}>
          <NavButton
            IconComponent={BurgerIcon}
            text="Конструктор"
            to={Routes.Main}
          />
          <NavButton
            IconComponent={ListIcon}
            to={Routes.Feed}
            text="Лента заказов"
          />
        </div>

        <Link to={Routes.Main}>
          <Logo />
        </Link>

        <NavButton
          IconComponent={ProfileIcon}
          to={isAuthenticated ? Routes.Profile : Routes.Login}
          text="Личный кабинет"
        />
      </nav>
    </header>
  );
};

export default memo(AppHeader);
