import React from "react";

import styles from "./Profile.module.css";
import { ROUTES } from "../../constants";
import { NavButton, ProfileForm } from "../../components";
import classNames from "classnames";
import { FadeAnim } from "../../uikit";
import { Route, Switch } from "react-router-dom";

const profileLinks = [
  { path: ROUTES.PROFILE, text: "Профиль" },
  { path: ROUTES.ORDERS, text: "История заказов" },
  { path: ROUTES.LOGOUT, text: "Выход" },
];

const Profile = () => {
  return (
    <FadeAnim
      wrapperTag="section"
      className={classNames(styles.profileContainer, "pl-5", "pr-5")}
    >
      <div className={styles.linksContainer}>
        {profileLinks.map(({ path, text }) => (
          <NavButton to={path} text={text} textSize="medium" key={path} />
        ))}

        <p className="text text_type_main-default text_color_inactive mt-20 ml-5">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <Switch>
        <Route path={ROUTES.PROFILE} exact>
          <ProfileForm />
        </Route>
      </Switch>
    </FadeAnim>
  );
};

export default Profile;
