import React, { Suspense } from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Aux from './hoc/Auxiliary/Auxiliary';
import Layout from './hoc/Layout/Layout';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Logout from './containers/Auth/Logout/Logout';

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});
const Offers = React.lazy(() => {
  return import('./containers/Offers/Offers');
});

const App = (props) => {
  const fallback = <article style={{ textAlign: 'center' }}>SweetSpot Rendelés betöltése...</article>;
  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Route path="/offers" render={(props) => <Offers {...props} />} />
      <Route path="/" exact component={Offers} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.authenticated) {
    routes = (
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/offers" render={(props) => <Offers {...props} />} />
        <Route path="/" exact component={Offers} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Aux>
      <Layout>
        <Header authenticated={props.authenticated} />
        <Suspense fallback={fallback}>{routes}</Suspense>
        <Footer />
      </Layout>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.authReducer.token,
  };
};

export default connect(mapStateToProps)(withRouter(App));
