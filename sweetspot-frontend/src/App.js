import React, { useEffect, Suspense } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions';
import getRoutes from './routes/routes';
import Aux from './hoc/Auxiliary/Auxiliary';
import Layout from './hoc/Layout/Layout';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = (props) => {
  const { authenticated, grandTotal, onAuthenticateReload } = props;

  useEffect(() => {
    if (localStorage.getItem('token')) onAuthenticateReload(localStorage.getItem('token'));
  }, [onAuthenticateReload]);

  const fallback = <article style={{ textAlign: 'center' }}>... | SweetSpot | ...</article>;

  return (
    <Aux>
      <Layout>
        <Suspense fallback={fallback}>
          <Header authenticated={authenticated} grandTotal={grandTotal} />
          {getRoutes(authenticated)}
          <Footer />
        </Suspense>
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
