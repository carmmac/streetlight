import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import browserHistory from "../../browser-history";
import {AppRoute} from "../../const";
import Streetlight from "../streetlight/streetlight";

const App = () => {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={`/`} render={() =>
          browserHistory.push(AppRoute.RED)
        } />
        <Route exact path={AppRoute.RED} render={(routerProps) =>
          <Streetlight {...routerProps} />
        }>
        </Route>

        <Route exact path={AppRoute.YELLOW} render={(routerProps) =>
          <Streetlight {...routerProps} />
        }>
        </Route>

        <Route exact path={AppRoute.GREEN} render={(routerProps) =>
          <Streetlight {...routerProps} />
        }>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
