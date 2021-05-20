import React from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './app-header.module.css';
import PropTypes from "prop-types";

const TabWithImage = ({IconComponent, text, isActive}) => (
  <li className={`${styles.li} p-5`}>
    <IconComponent type={isActive ? "primary" : 'secondary'}/>
    <p className={`text text_type_main-default pl-2 ${!isActive ? 'text_color_inactive' : ""}`}>{text}</p>
  </li>
)

TabWithImage.propTypes = {
  IconComponent: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
}

const AppHeader = () => {
  return (
    <header className={`p-4`}>
      <nav>
        <ul className={styles.ul}>
          <TabWithImage IconComponent={BurgerIcon} text="Конструктор" isActive />
          <TabWithImage IconComponent={ListIcon} text="Лента заказов" />
          <Logo />
          <TabWithImage IconComponent={ProfileIcon} text="Личный кабинет" />
        </ul>
      </nav>
      {/*<BurgerIcon type="primary" />*/}
      {/*<ListIcon type="secondary" />*/}
      {/*<ProfileIcon type="secondary" />*/}
      {/*<Logo />*/}
    </header>
  );
}

export default AppHeader;
