import React, { useEffect, Suspense } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions';
import Aux from './hoc/Auxiliary/Auxiliary';
import Layout from './hoc/Layout/Layout';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Logout from './containers/Auth/Logout/Logout';

const Admin = React.lazy(() => {
  return import('./containers/Admin/Admin');
});
const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});
const Order = React.lazy(() => {
  return import('./containers/Order/Order');
});
const Offers = React.lazy(() => {
  return import('./containers/Offers/Offers');
});

const App = (props) => {
  const { authenticated, grandTotal, onAuthenticateReload } = props;

  useEffect(() => {
    if (localStorage.getItem('token')) onAuthenticateReload(localStorage.getItem('token'));
  }, [onAuthenticateReload]);

  const fallback = <article style={{ textAlign: 'center' }}>SweetSpot Rendelés betöltése...</article>;

  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Route path="/offers" render={(props) => <Offers {...props} />} />
      <Route path="/order" render={(props) => <Order {...props} />} />
      <Route path="/" exact component={Offers} />
      <Redirect to="/" />
    </Switch>
  );

  if (authenticated) {
    routes = (
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/admin" render={(props) => <Admin {...props} />} />
        <Route path="/offers" render={(props) => <Offers {...props} />} />
        <Route path="/" exact component={Offers} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Aux>
      <Layout>
        <Header authenticated={authenticated} grandTotal={grandTotal} />
        <Suspense fallback={fallback}>{routes}</Suspense>
        <Footer />
      </Layout>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.authReducer.token,
    grandTotal: state.ordersReducer.grandTotal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthenticateReload: (token) => dispatch(actions.authenticateReload(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
