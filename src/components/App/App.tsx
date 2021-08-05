import React, { useEffect } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";

import styles from "./App.module.css";

import { Routes, RouteStatuses } from "../../enums";
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
import {
  AppHeader,
  FeedInfoModal,
  IngredientDetailsModal,
  OrderDetailsModal,
} from "../";
import { checkRouteStatusAndReturnSelectedRoute } from "../../utils";
import classnames from "classnames";
import { ILocation } from "../../interfaces";

const routesAndComponents = [
  { path: Routes.Main, Component: Main, exact: true },
  { path: Routes.Feed, Component: Feed, exact: true },
  {
    path: Routes.Login,
    Component: Login,
    status: RouteStatuses.Hidden,
  },
  {
    path: Routes.Register,
    Component: Register,
    status: RouteStatuses.Hidden,
  },
  {
    path: Routes.ForgotPassword,
    Component: ForgotPassword,
    status: RouteStatuses.Hidden,
  },
  {
    path: Routes.ResetPassword,
    Component: ResetPassword,
    exact: true,
    status: RouteStatuses.Hidden,
  },
  {
    path: Routes.ResetPasswordWithToken,
    Component: ResetPassword,
    status: RouteStatuses.Hidden,
  },
  {
    path: Routes.Profile,
    Component: Profile,
    status: RouteStatuses.Protected,
    exact: true,
  },
  {
    path: Routes.Orders,
    Component: Profile,
    status: RouteStatuses.Protected,
    exact: true,
  },
  { path: Routes.Logout, Component: Logout, status: RouteStatuses.Protected },
  { path: Routes.IngredientsWithId, Component: Ingredient },
  { path: Routes.FeedWithId, Component: Order },
  {
    path: Routes.OrdersWithId,
    Component: Order,
    status: RouteStatuses.Protected,
  },
];

const routesAndModals = [
  { path: Routes.FeedWithId, Component: FeedInfoModal },
  {
    path: Routes.OrdersWithId,
    Component: FeedInfoModal,
    status: RouteStatuses.Protected,
  },
  { path: Routes.IngredientsWithId, Component: IngredientDetailsModal },
];

const App: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    history.replace({});
    //eslint-disable-next-line
  }, []);

  let location = useLocation<ILocation>();

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
