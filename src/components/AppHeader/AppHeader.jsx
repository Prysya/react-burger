import React, { memo } from "react";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";
import { NavButton } from "../";
import { ROUTES } from "../../constants";
import {useSelector} from "react-redux";

const AppHeader = () => {
  const {isAuthenticated} = useSelector(state => state.auth)
  
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

        <Logo />

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
