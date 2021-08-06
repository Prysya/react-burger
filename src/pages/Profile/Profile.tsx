import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import classNames from "classnames";

import styles from "./Profile.module.css";

import { NavButton, ProfileForm } from "../../components";
import { FadeAnim } from "../../uikit";
import { UserOrders } from "../../components/UserOrders";
import { Routes } from "../../enums";

const profileLinks = [
  { path: Routes.Profile, text: "Профиль" },
  { path: Routes.Orders, text: "История заказов" },
  { path: Routes.Logout, text: "Выход" },
];

const Profile:React.FC = () => {
  const { pathname } = useLocation();

  return (
    <section className={classNames(styles.profileContainer, "p-5")}>
      <FadeAnim className={styles.linksContainer}>
        {profileLinks.map(({ path, text }) => (
          <NavButton to={path} text={text} textSize="medium" key={path} />
        ))}

        <p className="text text_type_main-default text_color_inactive mt-20 ml-5">
          {pathname.includes("orders")
            ? "В этом разделе вы можете посмотреть свою историю заказов"
            : "В этом разделе вы можете изменить свои персональные данные"}
        </p>
      </FadeAnim>

      <Switch>
        <Route path={Routes.Profile} exact>
          <ProfileForm />
        </Route>

        <Route path={Routes.Orders} exact>
          <UserOrders />
        </Route>
      </Switch>
    </section>
  );
};

export default Profile;
