import React, { memo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./AppHeader.module.css";

import { NavButton } from "../";
import { ROUTES } from "../../constants";

const AppHeader = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className={`${styles.header} p-4`}>
      <nav className={styles.nav}>
        <div className={styles.leftTabsContainer}>
          <NavButton
            IconComponent={BurgerIcon}
            text="Конструктор"
            to={ROUTES.MAIN}
          />
          <NavButton
            IconComponent={ListIcon}
            to={ROUTES.FEED}
            text="Лента заказов"
          />
        </div>

        <Link to={ROUTES.MAIN}>
          <Logo />
        </Link>

        <NavButton
          IconComponent={ProfileIcon}
          to={isAuthenticated ? ROUTES.PROFILE : ROUTES.LOGIN}
          text="Личный кабинет"
        />
      </nav>
    </header>
  );
};

export default memo(AppHeader);
