import React, { Suspense } from 'react';
import { Redirect, Switch, withRouter } from 'react-router-dom';

import Aux from './hoc/Auxiliary/Auxiliary';
import Layout from './hoc/Layout/Layout';
import Header from './components/Header/Header';
import Offers from './containers/Offers/Offers';
import Footer from './components/Footer/Footer';

const App = () => {
  let routes = (
    <Switch>
      <Redirect to="/" />
    </Switch>
  );

  return (
    <Aux>
      <Layout>
        <Header />
        <Offers />
        <Suspense fallback={<p>SweetSpot Rendelés betöltése...</p>}>{routes}</Suspense>
        <Footer />
      </Layout>
    </Aux>
  );
};

export default withRouter(App);
