import React, { Suspense } from 'react';
import { Redirect, Switch, withRouter } from 'react-router-dom';

import Aux from './hoc/Auxiliary/Auxiliary';
import Layout from './hoc/Layout/Layout';

const App = () => {
  let routes = (
    <Switch>
      <Redirect to="/" />
    </Switch>
  );

  return (
    <Aux>
      <Layout>
        <Suspense fallback={<p>SweetSpot Rendelés betöltése...</p>}>{routes}</Suspense>
      </Layout>
    </Aux>
  );
};

export default withRouter(App);
