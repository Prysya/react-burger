import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import styles from "./App.module.css";

import { ROUTE_STATUSES, ROUTES } from "../../constants";
import {
  Error404,
  Main,
  Register,
  Login,
  ForgotPassword,
  ResetPassword,
  Profile,
  Logout,
  Ingredient,
  Order,
  Feed,
} from "../../pages";
import { AppHeader, OrderDetailsModal, IngredientDetailsModal } from "../";
import { checkRouteStatusAndReturnSelectedRoute } from "../../utils";
import classnames from "classnames";
import FeedInfoModal from "../FeedInfoModal/FeedInfoModal";

const routesAndComponents = [
  { path: ROUTES.MAIN, Component: Main, exact: true },
  { path: ROUTES.FEED, Component: Feed, exact: true },
  {
    path: ROUTES.LOGIN,
    Component: Login,
    status: ROUTE_STATUSES.HIDDEN,
  },
  {
    path: ROUTES.REGISTER,
    Component: Register,
    status: ROUTE_STATUSES.HIDDEN,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    Component: ForgotPassword,
    status: ROUTE_STATUSES.HIDDEN,
  },
  {
    path: ROUTES.RESET_PASSWORD,
    Component: ResetPassword,
    exact: true,
    status: ROUTE_STATUSES.HIDDEN,
  },
  {
    path: ROUTES.RESET_PASSWORD_WITH_TOKEN,
    Component: ResetPassword,
    status: ROUTE_STATUSES.HIDDEN,
  },
  {
    path: ROUTES.PROFILE,
    Component: Profile,
    status: ROUTE_STATUSES.PROTECTED,
    exact: true
  },
  {
    path: ROUTES.ORDERS,
    Component: Profile,
    status: ROUTE_STATUSES.PROTECTED,
    exact: true
  },
  { path: ROUTES.LOGOUT, Component: Logout, status: ROUTE_STATUSES.PROTECTED },
  { path: ROUTES.INGREDIENTS_WITH_ID, Component: Ingredient },
  { path: ROUTES.FEED_WITH_ID, Component: Order },
  {
    path: ROUTES.ORDERS_WITH_ID,
    Component: Order,
    status: ROUTE_STATUSES.PROTECTED,
  },
];

const App = () => {
  const { isRedirectedFromMain, isRedirectedFromFeed } = useSelector(
    (state) => state.modalWindows
  );

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={classnames(styles.main, "pr-4", "pl-4")}>
        <Switch>
          {isRedirectedFromMain && (
            <Route path={ROUTES.INGREDIENTS_WITH_ID} component={Main} exact />
          )}
          {isRedirectedFromFeed && (
            <Route path={ROUTES.FEED_WITH_ID} component={Feed} exact />
          )}

          {routesAndComponents.map(({ path, Component, status, ...props }) => {
            const SelectedRoute =
              checkRouteStatusAndReturnSelectedRoute(status);

            return (
              <SelectedRoute path={path} key={path} {...props}>
                <Component />
              </SelectedRoute>
            );
          })}

          <Route path="*" component={Error404} />
        </Switch>
      </main>

      <OrderDetailsModal />
      <IngredientDetailsModal />
      <FeedInfoModal />
    </div>
  );
};

export default App;
