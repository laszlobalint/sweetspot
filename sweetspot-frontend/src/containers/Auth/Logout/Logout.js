import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

import * as actions from '../../../store/actions';

const Logout = (props) => {
  const { onLogout } = props;

  useEffect(() => {
    onLogout();
    toastr.success('SIKERES KIJELENTKEZÉS!', 'Várunk vissza hamarosan.');
  }, [onLogout]);

  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.authenticateLogout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
