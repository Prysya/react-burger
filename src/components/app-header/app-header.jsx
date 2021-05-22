import React, { memo } from "react";
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { TabWithImage } from "./";

const AppHeader = () => {
  return (
    <header className={`${styles.header} p-4`}>
      <nav className={styles.nav}>
        <div className={styles.leftTabsContainer}>
          <TabWithImage
            IconComponent={BurgerIcon}
            text="Конструктор"
            isActive
          />
          <TabWithImage IconComponent={ListIcon} text="Лента заказов" />
        </div>
        <Logo />
        <TabWithImage IconComponent={ProfileIcon} text="Личный кабинет" />
      </nav>
    </header>
  );
};

export default memo(AppHeader);
