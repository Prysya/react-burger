import React, {useEffect} from "react";
import {Route, Switch, useHistory, useLocation} from "react-router-dom";

import styles from "./App.module.css";

import {ROUTE_STATUSES, ROUTES} from "../../constants";
import {
  Error404,
  Feed,
  ForgotPassword,
  Ingredient,
  Login,
  Logout,
  Main,
  Order,
  Profile,
  Register,
  ResetPassword,
} from "../../pages";
import {AppHeader, IngredientDetailsModal, FeedInfoModal, OrderDetailsModal} from "../";
import {checkRouteStatusAndReturnSelectedRoute} from "../../utils";
import classnames from "classnames";

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
    exact: true,
  },
  {
    path: ROUTES.ORDERS,
    Component: Profile,
    status: ROUTE_STATUSES.PROTECTED,
    exact: true,
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

const routesAndModals = [
  { path: ROUTES.FEED_WITH_ID, Component: FeedInfoModal },
  {
    path: ROUTES.ORDERS_WITH_ID,
    Component: FeedInfoModal,
    status: ROUTE_STATUSES.PROTECTED,
  },
  { path: ROUTES.INGREDIENTS_WITH_ID, Component: IngredientDetailsModal },
];

const App = () => {
  const history = useHistory();

  useEffect(() => {
    history.replace({});
    //eslint-disable-next-line
  }, []);

  let location = useLocation();

  let background = location?.state?.background;

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={classnames(styles.main, "pr-4", "pl-4")}>
        <Switch location={background || location}>
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
      {background &&
        routesAndModals.map(({ path, Component, status, ...props }) => {
          const SelectedRoute = checkRouteStatusAndReturnSelectedRoute(status);

          return (
            <SelectedRoute path={path} key={path} {...props}>
              <Component />
            </SelectedRoute>
          );
        })}
    </div>
  );
};

export default App;
