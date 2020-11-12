import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

const Admin = React.lazy(() => {
  return import('../containers/Admin/Admin');
});
const Auth = React.lazy(() => {
  return import('../containers/Auth/Auth');
});
const Order = React.lazy(() => {
  return import('../containers/Order/Order');
});
const Offers = React.lazy(() => {
  return import('../containers/Offers/Offers');
});
const Logout = React.lazy(() => {
  return import('../containers/Auth/Logout/Logout');
});

const getRoutes = (authenticated) => {
  let routes = null;

  if (authenticated) {
    routes = (
      <Switch>
        <Route path="/admin" render={(props) => <Admin {...props} />} />
        <Route path="/offers" render={(props) => <Offers {...props} />} />
        <Route path="/logout" render={(props) => <Logout {...props} />} />z
        <Route path="/" exact component={Offers} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Route path="/offers" render={(props) => <Offers {...props} />} />
        <Route path="/order" render={(props) => <Order {...props} />} />
        <Route path="/" exact component={Offers} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return routes;
};

export default getRoutes;
